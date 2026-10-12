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
    allow_origins=["*"],
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"]
)



@app.get("/")
def home():
    return {"message": "Financial controller back end with FastApi"}