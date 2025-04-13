import os
from sentence_transformers import SentenceTransformer
from pdf_processor import extract_text_from_pdf, chunk_text
from vectorization import create_embeddings
from vector_store import load_faiss_index, setup_vector_db, load_and_store_embeddings, save_faiss_index
from retrieval import get_context_from_query
from llm_integration import generate_response
import pickle
import json

# Constants
EMBEDDING_MODEL = "all-MiniLM-L6-v2"

def initialize_system():
    """Initialize the system components."""
    print("Initializing legal chatbot system...")
    
    # Load embedding model
    print("Loading embedding model...")
    model = SentenceTransformer(EMBEDDING_MODEL)
    
    # Try to load existing FAISS index
    index, id_to_metadata = load_faiss_index()
    
    # If index doesn't exist, create a new one
    if index is None:
        print("Creating new FAISS index...")
        index, id_to_metadata = setup_vector_db()
        
        # Check for labour laws
        if os.path.exists("../data/embeddings/labour_laws_embeddings.pkl"):
            print("Loading labour laws embeddings...")
            index, id_to_metadata = load_and_store_embeddings(
                index, id_to_metadata, "../data/embeddings", "../data/processed", "labour_laws"
            )
        
        # Check for criminal laws
        if os.path.exists("../data/embeddings/criminal_laws_embeddings.pkl"):
            print("Loading criminal laws embeddings...")
            index, id_to_metadata = load_and_store_embeddings(
                index, id_to_metadata, "../data/embeddings", "../data/processed", "criminal_laws"
            )
        
        # Save the index
        save_faiss_index(index, id_to_metadata)
    
    print("System initialized!")
    return index, id_to_metadata, model

def answer_query(query: str, index, id_to_metadata, model, groq_api_key: str):
    """Process a user query and generate a response."""
    print(f"Processing query: {query}")
    
    # Get relevant context
    context, results = get_context_from_query(query, index, id_to_metadata, model)
    
    # Check if we found relevant information
    if not results:
        return "I couldn't find relevant information in my knowledge base. Please try a different question related to Indian labour or criminal laws."
    
    # Generate response using Groq
    if groq_api_key:
        print("Generating response with Groq...")
        response = generate_response(groq_api_key, query, context)
    else:
        # Fallback if no API key
        response = f"Found {len(results)} relevant passages in the legal documents, but I need a Groq API key to generate a detailed response."
        for i, result in enumerate(results):
            response += f"\n\n[Excerpt {i+1}] From {result['source']} (Score: {result['score']:.2f}):\n"
            response += f"{result['text'][:200]}..."
    
    return response

def chatbot_loop():
    """Run an interactive chat loop."""
    # Initialize system
    index, id_to_metadata, model = initialize_system()
    
    # Get Groq API key
    groq_api_key = "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"
    if not groq_api_key:
        print("Warning: GROQ_API_KEY environment variable not set.")
        print("You'll only get raw search results without AI-generated responses.")
        print("Set your API key with: $env:GROQ_API_KEY='your_key_here' (Windows)")
        print("or: export GROQ_API_KEY=your_key_here (Linux/Mac)")
    
    print("\n=== Indian Legal Chatbot ===")
    print("Ask questions about Indian labour or criminal laws.")
    print("Type 'exit' to quit.\n")
    
    while True:
        query = input("Your question: ")
        if query.lower() in ["exit", "quit"]:
            break
        
        response = answer_query(query, index, id_to_metadata, model, groq_api_key)
        print("\nResponse:")
        print(response)
        print("\n" + "-"*50 + "\n")

# if __name__ == "__main__":
#     chatbot_loop()