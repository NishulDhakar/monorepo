from pydantic import BaseModel
from typing import List, Dict

class ChatRequest(BaseModel):
    question: str
    history: List[Dict] = []