from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.upload import router as upload_router
from api.chat import router as chat_router


app = FastAPI(
    title="AI Document Intelligence API",
    description="Backend API for an AI-powered document assistant",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-document-intelligence-beta.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(upload_router)
app.include_router(chat_router)


@app.get("/")
def root():
    return {
        "message": "AI Document Intelligence API is running",
        "status": "success"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }