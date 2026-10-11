from pydantic import BaseModel
from typing import Literal

class Transaction(BaseModel):
    id: int
    description: str
    amount: float
    transaction_type: Literal["inflow","outflow"]
    category: str

