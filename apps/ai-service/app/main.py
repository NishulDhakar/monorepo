from fastapi import FastAPI
from app.schemas import ChatRequest
from app.services.chat_service import generate_response
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: ChatRequest):
    result = await generate_response(
        question=request.question,
        history=request.history
    )
    return result