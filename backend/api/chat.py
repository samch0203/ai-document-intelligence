from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.embeddings import generate_embeddings
from services.vector_store import search_documents
from services.llm import generate_answer


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    question: str
    top_k: int = 5


@router.post("/query")
async def query_documents(request: ChatRequest):
    """
    Ask a question about uploaded documents.
    """

    question = request.question.strip()

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty."
        )

    if request.top_k < 1 or request.top_k > 10:
        raise HTTPException(
            status_code=400,
            detail="top_k must be between 1 and 10."
        )

    try:
        # 1. Convert question into an embedding
        query_embedding = generate_embeddings(
            [question]
        )[0]

        # 2. Search ChromaDB
        results = search_documents(
            query_embedding=query_embedding,
            top_k=request.top_k
        )

        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]

        if not documents:
            return {
                "question": question,
                "answer": "I could not find relevant information in the uploaded documents.",
                "sources": []
            }

        # 3. Build context for the LLM
        context_parts = []

        sources = []

        for index, (document, metadata) in enumerate(
            zip(documents, metadatas),
            start=1
        ):
            context_parts.append(
                f"[Source {index}]\n{document}"
            )

            sources.append({
                "source": index,
                "document_id": metadata.get("document_id"),
                "chunk_index": metadata.get("chunk_index"),
                "text": document
            })

        context = "\n\n".join(context_parts)

        # 4. Generate AI answer
        answer = generate_answer(
            question=question,
            context=context
        )

        # 5. Return answer + sources
        return {
            "question": question,
            "answer": answer,
            "sources": sources
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process question: {str(e)}"
        )