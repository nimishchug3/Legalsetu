from sentence_transformers import SentenceTransformer
import numpy as np
import os
import pickle
import json
from typing import List, Dict, Any
from pdf_processor import extract_text_from_pdf, chunk_text

def create_embeddings(chunks: List[str], model_name: str = "all-MiniLM-L6-v2") -> np.ndarray:
    """Create embeddings for text chunks using Sentence Transformers."""
    print(f"Loading embedding model: {model_name}")
    model = SentenceTransformer(model_name)
    print(f"Creating embeddings for {len(chunks)} chunks...")
    embeddings = model.encode(chunks)
    print(f"Created embeddings with shape: {embeddings.shape}")
    return embeddings

def process_pdf_directory(pdf_dir: str, output_dir: str = "../data/processed", 
                          embeddings_dir: str = "../data/embeddings"):
    """Process all PDFs in a directory, create chunks and embeddings."""
    # Create output directories if they don't exist
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(embeddings_dir, exist_ok=True)
    
    pdf_files = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]
    if not pdf_files:
        print(f"No PDF files found in {pdf_dir}")
        return
    
    all_chunks = []
    metadata = []
    
    # Process each PDF
    for pdf_file in pdf_files:
        pdf_path = os.path.join(pdf_dir, pdf_file)
        print(f"Processing {pdf_path}")
        
        # Extract text
        text = extract_text_from_pdf(pdf_path)
        if not text:
            print(f"No text extracted from {pdf_path}")
            continue
            
        # Chunk text
        chunks = chunk_text(text)
        
        # Create metadata for each chunk
        for i, chunk in enumerate(chunks):
            all_chunks.append(chunk)
            metadata.append({
                "source": pdf_file,
                "chunk_index": i,
                "category": os.path.basename(pdf_dir),
                "text_preview": chunk[:100].replace('\n', ' ') + "..."
            })
    
    if not all_chunks:
        print("No chunks created from any PDFs")
        return
        
    # Create embeddings for all chunks
    embeddings = create_embeddings(all_chunks)
    
    # Save chunks and metadata
    chunks_file = os.path.join(output_dir, f"{os.path.basename(pdf_dir)}_chunks.json")
    with open(chunks_file, 'w', encoding='utf-8') as f:
        json.dump({"chunks": all_chunks, "metadata": metadata}, f)
    
    # Save embeddings
    embeddings_file = os.path.join(embeddings_dir, f"{os.path.basename(pdf_dir)}_embeddings.pkl")
    with open(embeddings_file, 'wb') as f:
        pickle.dump(embeddings, f)
    
    print(f"Saved {len(all_chunks)} chunks and embeddings")
    return all_chunks, metadata, embeddings

if __name__ == "__main__":
    # Process labour laws directory
    process_pdf_directory("../data/pdfs/labour_laws")
    
    # Process criminal laws directory if it has PDFs
    if os.path.exists("../data/pdfs/criminal_laws"):
        process_pdf_directory("../data/pdfs/criminal_laws")