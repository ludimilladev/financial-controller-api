from fastapi import FastAPI
from app.routes.financial_routes import router as financial_router

app = FastAPI(title="API Financial Controller")

app.include_router(financial_router)

@app.get("/")
def home():
    return {"message": "Financial controller back end with FastApi"}