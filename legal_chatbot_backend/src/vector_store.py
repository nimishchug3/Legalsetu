import faiss
import numpy as np
import os
import pickle
import json
from typing import List, Dict, Any

def setup_vector_db(vector_size: int = 384):
    """Initialize FAISS vector database."""
    print("Setting up FAISS vector index")
    # Create a flat L2 index (cosine similarity can be computed after normalization)
    index = faiss.IndexFlatL2(vector_size)
    
    # We'll need to keep track of the mapping between FAISS IDs and our documents
    id_to_metadata = {}
    
    return index, id_to_metadata

def normalize_vectors(vectors):
    """Normalize vectors for cosine similarity in L2 space."""
    faiss.normalize_L2(vectors)
    return vectors

def load_and_store_embeddings(index, id_to_metadata, embeddings_dir: str, 
                              processed_dir: str, category: str):
    """Load embeddings and store them in the FAISS index."""
    embeddings_file = os.path.join(embeddings_dir, f"{category}_embeddings.pkl")
    chunks_file = os.path.join(processed_dir, f"{category}_chunks.json")
    
    if not os.path.exists(embeddings_file) or not os.path.exists(chunks_file):
        print(f"Files not found for category {category}")
        return
    
    # Load embeddings and chunks
    with open(embeddings_file, 'rb') as f:
        embeddings = pickle.load(f)
    
    with open(chunks_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        chunks = data["chunks"]
        metadata = data["metadata"]
    
    # Convert embeddings to float32 numpy array (required by FAISS)
    embeddings_np = np.array(embeddings).astype('float32')
    
    # Normalize vectors for cosine similarity
    embeddings_np = normalize_vectors(embeddings_np)
    
    # Get the next available ID
    start_id = len(id_to_metadata)
    
    # Store mapping between FAISS IDs and document metadata
    for i, (chunk, meta) in enumerate(zip(chunks, metadata)):
        id_to_metadata[start_id + i] = {
            "text": chunk,
            "source": meta["source"],
            "category": meta["category"],
            "chunk_index": meta["chunk_index"]
        }
    
    # Add vectors to the index
    index.add(embeddings_np)
    print(f"Added {len(embeddings_np)} vectors to FAISS index for {category}")
    
    # Save the index and metadata
    output_dir = os.path.join(embeddings_dir, "faiss")
    os.makedirs(output_dir, exist_ok=True)
    
    return index, id_to_metadata

def save_faiss_index(index, id_to_metadata, output_dir="../data/embeddings/faiss"):
    """Save FAISS index and metadata to disk."""
    os.makedirs(output_dir, exist_ok=True)
    
    # Save FAISS index
    faiss.write_index(index, os.path.join(output_dir, "legal_docs.index"))
    
    # Save metadata mapping
    with open(os.path.join(output_dir, "id_to_metadata.pkl"), "wb") as f:
        pickle.dump(id_to_metadata, f)
    
    print(f"Saved FAISS index and metadata to {output_dir}")

def load_faiss_index(input_dir="../data/embeddings/faiss"):
    """Load FAISS index and metadata from disk."""
    index_path = os.path.join(input_dir, "legal_docs.index")
    metadata_path = os.path.join(input_dir, "id_to_metadata.pkl")
    
    if not os.path.exists(index_path) or not os.path.exists(metadata_path):
        print("FAISS index or metadata file not found")
        return None, None
    
    # Load FAISS index
    index = faiss.read_index(index_path)
    
    # Load metadata mapping
    with open(metadata_path, "rb") as f:
        id_to_metadata = pickle.load(f)
    
    print(f"Loaded FAISS index with {index.ntotal} vectors and metadata")
    return index, id_to_metadata

if __name__ == "__main__":
    # Setup FAISS index
    index, id_to_metadata = setup_vector_db()
    
    # Load and store embeddings
    index, id_to_metadata = load_and_store_embeddings(
        index, 
        id_to_metadata,
        "../data/embeddings", 
        "../data/processed", 
        "labour_laws"
    )
    
    # Add criminal laws if available
    if os.path.exists("../data/embeddings/criminal_laws_embeddings.pkl"):
        index, id_to_metadata = load_and_store_embeddings(
            index, 
            id_to_metadata,
            "../data/embeddings", 
            "../data/processed", 
            "criminal_laws"
        )
    if os.path.exists("../data/embeddings/coi_embeddings.pkl"):
        index, id_to_metadata = load_and_store_embeddings(
            index, 
            id_to_metadata,
            "../data/embeddings", 
            "../data/processed", 
            "coi_laws"
        )
    
    if os.path.exists("../data/embeddings/ipc_embeddings.pkl"):
        index, id_to_metadata = load_and_store_embeddings(
            index, 
            id_to_metadata,
            "../data/embeddings", 
            "../data/processed", 
            "ipc_laws"
        )
    
    
    
    # Save the index and metadata for later use
    save_faiss_index(index, id_to_metadata)