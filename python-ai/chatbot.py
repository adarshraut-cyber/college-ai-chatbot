from sentence_transformers import SentenceTransformer, util
from database import faq_collection

# Load AI model
model = SentenceTransformer("all-MiniLM-L6-v2")

def get_response(user_question):

    # Fetch latest FAQs from MongoDB
    faqs = list(faq_collection.find())

    if not faqs:
        return "No FAQs available."

    questions = [faq["question"] for faq in faqs]

    question_embeddings = model.encode(
        questions,
        convert_to_tensor=True
    )

    user_embedding = model.encode(
        user_question,
        convert_to_tensor=True
    )

    similarities = util.cos_sim(
        user_embedding,
        question_embeddings
    )

    best_match = similarities.argmax().item()

    score = similarities[0][best_match].item()

    print("Similarity Score:", score)
    

    if score < 0.30:
        return "Sorry, I couldn't find a relevant answer."

    return faqs[best_match]["answer"]



