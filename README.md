 AI Document Intelligence Assistant

A full-stack application for asking questions about uploaded documents through a conversational interface. The project uses Retrieval-Augmented Generation (RAG) to retrieve relevant document context and help a language model generate context-aware responses.

- **Repository:** https://github.com/samch0203/ai-document-intelligence
- **Live frontend:** https://ai-document-intelligence-beta.vercel.app

## Features

- Conversational question answering over uploaded documents
- Retrieval-Augmented Generation (RAG) workflow
- ChromaDB vector storage for semantic retrieval
- FastAPI backend and Next.js frontend
- Ollama local-model integration; Groq may be used if enabled in the current configuration
- Separate frontend and backend components

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js |
| Backend | Python, FastAPI |
| Retrieval | RAG |
| Vector store | ChromaDB |
| Language model | Ollama; Groq if configured |
| Deployment | Vercel frontend |

## Architecture

```text
User
 │
 ▼
Next.js Frontend
 │ HTTP requests
 ▼
FastAPI Backend
 ├── Document processing
 ├── Retrieval workflow ── ChromaDB
 └── Language model ────── Ollama / configured provider
 │
 ▼
Context-aware answer returned to the frontend
```

## Repository Structure

```text
ai-document-intelligence/
├── backend/       # API and document/AI processing
├── frontend/      # Next.js user interface
├── .gitignore
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites

- Git
- Python compatible with the backend dependencies
- Node.js LTS and npm
- Ollama and the configured model, if using local inference
- Provider credentials, if using an external model API

### 1. Clone

```bash
git clone https://github.com/samch0203/ai-document-intelligence.git
cd ai-document-intelligence
```

### 2. Backend

```bash
cd backend
python -m venv .venv
```

Activate on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Activate on macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies using the dependency file present in `backend/`. If the repository contains `requirements.txt`, run:

```bash
pip install -r requirements.txt
```

Start the API using the actual entry point defined in the repository. For example, if the entry point is `main.py` and the FastAPI object is named `app`:

```bash
uvicorn main:app --reload
```

The typical FastAPI documentation page is `/docs` on the backend host.

### 3. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Set the backend API URL in the frontend's expected environment file and variable name. Open the local URL printed by the Next.js development server (commonly `http://localhost:3000`).

### 4. Model configuration

For local inference, start Ollama and download the model expected by the backend configuration. If using Groq or another external provider, set the API key using the exact environment variable referenced by the code.

## How It Works

1. A user uploads a document through the frontend.
2. The backend processes the document for retrieval.
3. Relevant content is stored in or indexed through ChromaDB.
4. The user submits a question.
5. The retrieval pipeline finds relevant context.
6. The configured language model generates a response using the question and retrieved context.
7. The backend returns the response to the frontend.

Supported file formats, endpoint names, chunking strategy, and model names depend on the current source implementation.

## Configuration and Security

- Check the source code and any `.env.example` files for exact environment-variable names.
- Never commit `.env` files, API keys, passwords, or Supabase service-role keys.
- Confirm CORS origins and authentication settings before production deployment.
- Avoid uploading confidential documents unless you are authorized to process them.

## Troubleshooting

- **Frontend cannot reach backend:** Check the backend URL and ensure the API is running.
- **Model errors:** Verify Ollama is running and the configured model exists, or check external API credentials.
- **Dependency errors:** Install backend dependencies in the virtual environment and run `npm install` in `frontend/`.
- **CORS errors:** Confirm the backend allows the local frontend origin.
- **Vector-store errors:** Check ChromaDB configuration and write permissions.

## Future Improvements

Potential improvements include automated tests, more detailed API documentation, document-source references, upload validation, and verified deployment instructions.

> **Maintainer note:** Before publishing this README as final, verify the exact dependency files, backend entry point, environment-variable names, model names, supported file formats, and commands against the repository source.
