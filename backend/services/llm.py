import os
import httpx
from dotenv import load_dotenv


load_dotenv()


OLLAMA_URL = os.getenv(
    "OLLAMA_URL",
    "http://localhost:11434/api/generate"
)

LLM_MODEL = os.getenv(
    "LLM_MODEL",
    "llama3.2:3b"
)


def generate_answer(question: str, context: str) -> str:
    """
    Generate an answer using the LLM based only on the provided context.
    """

    prompt = f"""
You are an AI document assistant.

Answer the user's question using only the information provided
in the document context below.

If the answer cannot be found in the context, clearly say:
"I could not find this information in the uploaded documents."

Do not invent or assume information.

Document Context:
----------------
{context}
----------------

User Question:
{question}

Answer:
"""

    payload = {
        "model": LLM_MODEL,
        "prompt": prompt,
        "stream": False
    }

    try:
        response = httpx.post(
            OLLAMA_URL,
            json=payload,
            timeout=120
        )

        response.raise_for_status()

        data = response.json()

        return data.get(
            "response",
            "The AI could not generate an answer."
        ).strip()

    except httpx.HTTPError as e:
        raise RuntimeError(
            f"LLM request failed: {str(e)}"
        )