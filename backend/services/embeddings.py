from sentence_transformers import SentenceTransformer


# Load the embedding model once
model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(texts: list[str]) -> list[list[float]]:
    """
    Convert text chunks into numerical embeddings.
    """

    if not texts:
        return []

    embeddings = model.encode(
        texts,
        convert_to_numpy=True
    )

    return embeddings.tolist()