from fastapi import FastAPI

#explica isso de middleware
from fastapi.middleware.cors import CORSMiddleware
#explica
from app.routes.financial_routes import router as financial_router

app = FastAPI(title="API Financial Controller")

app.include_router(financial_router)
#explica esse cors
#FREE CORS - tests and development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://myfinancialcontroler.com",
                   "https://meu-app-contorole-financeiro.com",
                   "http://localhost:8000/financial",
                   "http://127.0.0.1:5500"
                   
                   ],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"]
)



@app.get("/")
def home():
    return {"message": "Financial controller back end with FastApi"}