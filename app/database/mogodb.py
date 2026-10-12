from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017")

#DATA BASE
db = client["financial_controller"]

#COLLECTION
transactions_collection = db["transactions"]