from fastapi import APIRouter
from app.controllers.financial_controller import (list_transactions,
create_transaction,
balance_calculation 
)


from app.models.transaction_model import Transaction


router = APIRouter(prefix="/financial", tags=["Financial"])

@router.get("/transactions")
def get_transactions():
    return list_transactions()

@router.post("/transactions")
def create_a_new_transaction(transaction: Transaction):
    return create_transaction(transaction)

@router.get("/balance")
def get_amount():
    return balance_calculation()

@router.put("transaction/{transaction_id}")
def update_transaction(transaction: Transaction):
    return

    