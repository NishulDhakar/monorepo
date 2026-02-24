from langchain_groq import ChatGroq
from app.prompts import SYSTEM_PROMPT
from app.config import settings

from typing import List, Dict

# Initialize model once
llm = ChatGroq(
    model="openai/gpt-oss-20b",
    api_key=settings.GROQ_API_KEY,
)

MAX_HISTORY_MESSAGES = 8  # Prevent token explosion


def trim_history(history: List[Dict]) -> List[Dict]:
    """
    Keep only last N messages.
    Prevents context window overflow.
    """
    if len(history) > MAX_HISTORY_MESSAGES:
        return history[-MAX_HISTORY_MESSAGES:]
    return history


async def generate_response(
    question: str,
    history: List[Dict] | None = None,
) -> Dict:
    """
    Generate AI response using:
    - System prompt
    - Controlled memory
    """

    if history is None:
        history = []

    # Trim memory
    history = trim_history(history)

    # Build message stack
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *history,
        {"role": "user", "content": question},
    ]

    try:
        response = llm.invoke(messages)
        answer = response.content

        return {
            "answer": answer,
            "updated_history": history + [
                {"role": "user", "content": question},
                {"role": "assistant", "content": answer},
            ],
        }

    except Exception as e:
        return {
            "error": str(e)
        }