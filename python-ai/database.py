from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017/")

db = client["college_chatbot"]

faq_collection = db["faqs"]