from fastapi import APIRouter
from app.controllers.financial_controller import (list_transactions,
create_a_transaction,
balance_calculation,
delete_a_transaction,
update_a_transaction 
)


from app.models.transaction_model import Transaction


router = APIRouter(prefix="/financial", tags=["Financial"])

@router.get("/transactions")
def get_transactions():
    return list_transactions()

@router.post("/transactions")
def create_a_new_transaction(transaction: Transaction):
    return create_a_transaction(transaction)

@router.get("/balance")
def get_amount():
    return balance_calculation()

@router.put("/transactions/{transaction_id}")
def update_transaction(transaction_id:str, transaction: Transaction):
    return update_a_transaction(transaction_id,transaction)

@router.delete("/transactions/{transaction_id}")
def del_a_transaction(transaction_id: str):
    return delete_a_transaction(transaction_id)

    