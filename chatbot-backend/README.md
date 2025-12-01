# Reference
https://dev.to/vipascal99/building-a-full-stack-ai-chatbot-with-fastapi-backend-and-react-frontend-51ph

python3 -m venv .venv
source .venv/bin/activate

# Install required packages
pip install fastapi "uvicorn[standard]" python-dotenv openai

When pip install new packages, remember to do `pip freeze > requirements.txt`. this allows us to know the versions used. 


1. git clone https://github.com/bobby-tan/chatbot_project
2. cd chatbot_project/chatbot-backend/
3. pip install -r requirements.txt
4. uvicorn main:app --host 0.0.0.0 --port 8000