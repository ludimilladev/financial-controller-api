from app.database.mogodb import transactions_collection
from app.models.transaction_model import Transaction
from bson import ObjectId
from fastapi import HTTPException, status


def format_transaction(transaction):
    transaction["_id"] = str(transaction["_id"])
    return transaction




def list_transactions():
    transactions = list(transactions_collection.find())
    return [format_transaction(t) for t in transactions]



def create_a_transaction(transaction):
    data = transaction.model_dump()
    result = transactions_collection.insert_one(data)
    created = transactions_collection.find_one({"_id": result.inserted_id})
    return format_transaction(created)

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


def update_a_transaction(transaction_id,transaction):

    #VALIDATE TRANSACTION ID
    if not ObjectId.is_valid(transaction_id):
            raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Invalid transaction ID"
                    )

    #TRANSFORM TRANSACTION ID FROM STR TO OBJECTID
    object_id = ObjectId(transaction_id)

    #FIND TRANSACTION BY ID
    find_transaction = transactions_collection.find_one({"_id": object_id})

    #CHECK IF THE TRANSACTION EXIST IN DB
    if find_transaction is None:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )

    

    #RECEIVE DATA AS A DICT 
    data = transaction.model_dump()

    #UPDATE TRANSACTION
    transactions_collection.update_one(
        {"_id": object_id},
        {"$set": data}
    )

    updated_transaction = transactions_collection.find_one(
        {"_id": object_id}
    )

    return format_transaction(updated_transaction)

def delete_a_transaction(transaction_id):

    #VALIDATE TRANSACTION ID
    if not ObjectId.is_valid(transaction_id):
            raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Invalid transaction ID"
                    )

    #DELETE A TRANSACTION
    result = transactions_collection.delete_one(
         {"_id": ObjectId(transaction_id)}
    )


    if result.deleted_count == 0:
         raise HTTPException(
              status_code=status.HTTP_404_NOT_FOUND,
              detail="Transaction not found"
         )



    return {"message": "Transaction deleted"}