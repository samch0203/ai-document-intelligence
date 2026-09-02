import fitz
from pathlib import Path


def extract_text(file_path: str) -> str:
    """
    Extract text from a PDF or TXT document.
    """

    path = Path(file_path)

    if path.suffix.lower() == ".pdf":
        return extract_pdf_text(path)

    elif path.suffix.lower() == ".txt":
        return extract_txt_text(path)

    else:
        raise ValueError("Unsupported file type")


def extract_pdf_text(path: Path) -> str:
    """
    Extract text from all pages of a PDF.
    """

    document = fitz.open(path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

    return clean_text(text)


def extract_txt_text(path: Path) -> str:
    """
    Read text from a TXT file.
    """

    with open(path, "r", encoding="utf-8") as file:
        text = file.read()

    return clean_text(text)


def clean_text(text: str) -> str:
    """
    Clean unnecessary whitespace from extracted text.
    """

    lines = [line.strip() for line in text.splitlines()]

    cleaned_lines = [
        line
        for line in lines
        if line
    ]

    return "\n".join(cleaned_lines)


def chunk_text(
    text: str,
    chunk_size: int = 1000,
    overlap: int = 200
) -> list[str]:
    """
    Split text into overlapping chunks.

    chunk_size:
        Maximum number of characters in each chunk.

    overlap:
        Number of characters shared between consecutive chunks.
    """

    if not text:
        return []

    if overlap >= chunk_size:
        raise ValueError(
            "Overlap must be smaller than chunk size."
        )

    chunks = []

    start = 0
    text_length = len(text)

    while start < text_length:

        end = start + chunk_size

        chunk = text[start:end].strip()

        if chunk:
            chunks.append(chunk)

        start += chunk_size - overlap

    return chunks