from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import os
from typing import List, Dict, Any

def normalize_vector(vector):
    """Normalize a single vector for cosine similarity in L2 space."""
    norm = np.linalg.norm(vector)
    if norm > 0:
        return vector / norm
    return vector

def semantic_search(index, id_to_metadata, query: str, 
                    model: SentenceTransformer, top_k: int = 5):
    """Search the FAISS index for relevant legal information."""
    # Encode the query
    query_embedding = model.encode(query)
    
    # Convert to float32 and reshape for FAISS
    query_embedding = np.array(query_embedding).astype('float32').reshape(1, -1)
    
    # Normalize query vector for cosine similarity
    query_embedding = normalize_vector(query_embedding)
    
    # Search the index
    distances, indices = index.search(query_embedding, top_k)
    
    # Extract results
    relevant_chunks = []
    for i, idx in enumerate(indices[0]):
        # Convert L2 distance to similarity score (1 - normalized_distance)
        # Since vectors are normalized, L2 distance of 2 means completely different
        # and 0 means identical, so we convert to a 0-1 similarity score
        similarity = 1 - (distances[0][i] / 2.0)
        
        # Ensure the index is valid
        if idx < 0 or idx >= len(id_to_metadata):
            continue
            
        metadata = id_to_metadata[idx]
        relevant_chunks.append({
            "text": metadata["text"],
            "score": float(similarity),  # Convert numpy float to Python float
            "source": metadata["source"],
            "category": metadata["category"]
        })
    
    return relevant_chunks

def get_context_from_query(query: str, index, id_to_metadata, model, top_k: int = 5):
    """Get relevant context based on a user query."""
    # Search for relevant chunks
    results = semantic_search(
        index=index,
        id_to_metadata=id_to_metadata,
        query=query,
        model=model,
        top_k=top_k
    )
    
    # Format context text
    context = ""
    for i, result in enumerate(results):
        context += f"[Excerpt {i+1}] From {result['source']} (Category: {result['category']}, Relevance: {result['score']:.2f}):\n"
        context += f"{result['text']}\n\n"
    
    return context, results

if __name__ == "__main__":
    # Load model
    model = SentenceTransformer("all-MiniLM-L6-v2")
    
    # Import faiss_index loading function
    from vector_store import load_faiss_index
    
    # Load index
    index, id_to_metadata = load_faiss_index()
    
    if index is not None and id_to_metadata is not None:
        # Test query - change to something related to your documents
        test_query = "What are the main provisions of labour laws in India?"
        
        context, results = get_context_from_query(test_query, index, id_to_metadata, model)
        print(f"Found {len(results)} relevant chunks for query: {test_query}")
        print(context)
    else:
        print("Failed to load FAISS index. Run vector_store.py first to create the index.")