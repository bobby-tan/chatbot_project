# main.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# --- 1. Initialize FastAPI and OpenAI Client ---
app = FastAPI()

# --- 2. Configure CORS ---
# This is crucial for allowing your React frontend to communicate with this backend.
# It's a security feature that browsers enforce.
# origins = [
#     "http://localhost:5173",  # Default Vite React dev server
#     "http://localhost:3000",  # Common Create React App dev server
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"(https://.*\.proxy\.runpod\.net)|(http://localhost:(3000|5173))",
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)

# --- 3. Define the Request Data Structure ---
# Pydantic model ensures the incoming data has the correct format.
class ChatInput(BaseModel):
    user_message: str

# --- 4. Create API Endpoints ---
@app.get("/")
async def health_check():
    """A simple endpoint to confirm the server is running."""
    return {"status": "health check API"}

@app.post("/chat")
async def chat_with_ai(input_data: ChatInput):
    """The main endpoint to handle chat interactions."""
    try:
        # Forward the user's message to LLM
        # TODO
        # Extract and return the AI's response
        bot_response = "chat_with_ai_response"
        return {"bot_response": input_data.user_message + " " + bot_response}

    except Exception as e:
        # Properly handle potential API errors
        raise HTTPException(status_code=500, detail=str(e))
