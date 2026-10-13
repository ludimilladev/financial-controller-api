from app.database.mogodb import transactions_collection
from app.models.transaction_model import Transaction


def format_transaction(transaction):
    transaction["_id"] = str(transaction["_id"])
    return transaction




def list_transactions():
    transactions = list(transactions_collection.find())
    return [format_transaction(t) for t in transactions]



def create_transaction(transaction: Transaction):

    data = transaction.model_dump()

    result = transactions_collection.insert_one(data)

    new_transaction = transactions_collection.find_one(
        {"_id": result.inserted_id}
    )

    return format_transaction(new_transaction)

#UPDATE TRANSACTION FUNCTION GOES HERE

def balance_calculation():
    transactions = list(transactions_collection.find())

    balance = 0

    for t in transactions:
        if t["transaction_type"] == "inflow":
            balance += t["amount"]
        else:
            balance -= t["amount"]

    return {"balance" : balance}