import chromadb


# Create persistent ChromaDB client
client = chromadb.PersistentClient(
    path="data/chroma"
)


# Create or retrieve our document collection
collection = client.get_or_create_collection(
    name="documents"
)


def add_documents(
    document_id: str,
    chunks: list[str],
    embeddings: list[list[float]]
):
    """
    Store document chunks and their embeddings in ChromaDB.
    """

    if not chunks:
        return

    ids = [
        f"{document_id}_{index}"
        for index in range(len(chunks))
    ]

    metadatas = [
        {
            "document_id": document_id,
            "chunk_index": index
        }
        for index in range(len(chunks))
    ]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadatas
    )


def search_documents(
    query_embedding: list[float],
    top_k: int = 5
):
    """
    Search ChromaDB for the most relevant document chunks.
    """

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    return results