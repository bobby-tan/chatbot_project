import { useState, useEffect } from 'react';
import './App.css';

type Message = {
    type: string, text: string
};

function App() {
    const [userInput, setUserInput] = useState('');
    const [chatLog, setChatLog] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    // Effect to load chat history from local storage when the app starts
    useEffect(() => {
        const storedChatLog = localStorage.getItem('chatLog');
        if (storedChatLog) {
            setChatLog(JSON.parse(storedChatLog));
        }
    }, []);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!userInput.trim()) return; // Don't send empty messages

        const userMessage: Message = { type: 'user', text: userInput };
        const newChatLog: Message[] = [...chatLog, userMessage];
        setChatLog(newChatLog);
        setUserInput('');
        setLoading(true);

        try {
            const res = await fetch("/config.json");
            const config = await res.json();
            const backendUrl = config.CHATBOT_BACKEND_URL;
            // The API call to our FastAPI backend
            const response = await fetch(backendUrl + '/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_message: userInput }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const botMessage = { type: 'bot', text: data.bot_response };

            // Update the chat log with the bot's response
            const finalChatLog = [...newChatLog, botMessage];
            setChatLog(finalChatLog);

            // Save the updated chat log to local storage for persistence
            localStorage.setItem('chatLog', JSON.stringify(finalChatLog));

        } catch (error) {
            console.error('Error fetching chat response:', error);
            const errorMessage = { type: 'error', text: 'Sorry, something went wrong. Please try again.' };
            setChatLog(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>AI Chatbot</h1>
            <div className="chat-window">
                {chatLog.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                        {message.text}
                    </div>
                ))}
                {loading && <div className="message bot">Loading...</div>}
            </div>
            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>Send</button>
            </form>
        </div>
    );
}

export default App;