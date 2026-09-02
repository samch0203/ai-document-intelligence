from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import shutil
import uuid

from services.document_processor import extract_text, chunk_text
from services.embeddings import generate_embeddings
from services.vector_store import add_documents


router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


UPLOAD_DIR = Path("data/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    allowed_extensions = {".pdf", ".txt"}

    file_extension = Path(file.filename).suffix.lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and TXT files are supported."
        )

    document_id = str(uuid.uuid4())

    safe_filename = f"{document_id}{file_extension}"
    file_path = UPLOAD_DIR / safe_filename

    # Step 1: Save uploaded file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save document: {str(e)}"
        )

    # Step 2: Extract text
    try:
        extracted_text = extract_text(str(file_path))

    except Exception as e:
        file_path.unlink(missing_ok=True)

        raise HTTPException(
            status_code=500,
            detail=f"Failed to extract text: {str(e)}"
        )

    if not extracted_text.strip():
        file_path.unlink(missing_ok=True)

        raise HTTPException(
            status_code=400,
            detail="The document does not contain readable text."
        )

    # Step 3: Split text into chunks
    try:
        chunks = chunk_text(extracted_text)

    except Exception as e:
        file_path.unlink(missing_ok=True)

        raise HTTPException(
            status_code=500,
            detail=f"Failed to create document chunks: {str(e)}"
        )

    # Step 4: Generate embeddings
    try:
        embeddings = generate_embeddings(chunks)

    except Exception as e:
        file_path.unlink(missing_ok=True)

        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate embeddings: {str(e)}"
        )

    # Step 5: Store chunks and embeddings in ChromaDB
    try:
        add_documents(
            document_id=document_id,
            chunks=chunks,
            embeddings=embeddings
        )

    except Exception as e:
        file_path.unlink(missing_ok=True)

        raise HTTPException(
            status_code=500,
            detail=f"Failed to store document in vector database: {str(e)}"
        )

    return {
        "message": "Document uploaded and indexed successfully",
        "document_id": document_id,
        "filename": file.filename,
        "file_type": file_extension,
        "text_length": len(extracted_text),
        "chunk_count": len(chunks)
    }