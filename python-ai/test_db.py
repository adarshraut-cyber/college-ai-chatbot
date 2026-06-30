from database import faq_collection

faqs = faq_collection.find()

for faq in faqs:
    print(faq)