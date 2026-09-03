import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not configured.")

client = Groq(api_key=GROQ_API_KEY)

LLM_MODEL = os.getenv(
    "LLM_MODEL",
    "openai/gpt-oss-20b"
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

    try:
        response = client.chat.completions.create(
            model=LLM_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        raise RuntimeError(
            f"Groq request failed: {str(e)}"
        )