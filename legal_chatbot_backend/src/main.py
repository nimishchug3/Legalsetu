from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from chatbot_backend import initialize_system, answer_query  # assuming your existing logic is in this file

# Initialize FastAPI app
app = FastAPI()

# Allow CORS (so React frontend can talk to this API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize system only once
index, id_to_metadata, model = initialize_system()
groq_api_key = "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"  # Ideally from environment variable

# Define input model
class QueryRequest(BaseModel):
    query: str

@app.post("/ask")
async def ask_question(request: QueryRequest):
    response = answer_query(request.query, index, id_to_metadata, model, groq_api_key)
    return {"response": response}
