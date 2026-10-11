from app.database.database_teste import transactions
from app.models.transaction_model import Transaction


def list_transactions():
    return transactions

def create_transaction(transaction: Transaction):
    transactions.append(transaction.model_dump())
    return transaction

def balance_calculation():

    balance = 0;
    for t in transactions:
        if(t["transaction_type"] == "inflow"):
            balance += t["amount"]
        else:
            balance -= t["amount"]

    return {"balance": balance}