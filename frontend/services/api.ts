const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface UploadResponse {
  message: string;
  document_id: string;
  filename: string;
  file_type: string;
  text_length: number;
  chunk_count: number;
}

export interface Source {
  source: number;
  document_id: string;
  chunk_index: number;
  text: string;
}

export interface ChatResponse {
  question: string;
  answer: string;
  sources: Source[];
}

export async function uploadDocument(
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_URL}/documents/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to upload document."
    );
  }

  return data;
}

export async function askQuestion(
  question: string
): Promise<ChatResponse> {
  const response = await fetch(
    `${API_URL}/chat/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        top_k: 5,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to process question."
    );
  }

  return data;
}