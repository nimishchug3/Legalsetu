import fitz  # PyMuPDF
import os
from typing import List, Dict

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from a PDF file."""
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}")
        return ""

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
    """Split text into overlapping chunks."""
    chunks = []
    start = 0
    text_length = len(text)
    
    while start < text_length:
        end = min(start + chunk_size, text_length)
        # Find a good breaking point
        if end < text_length and end - start == chunk_size:
            last_period = text.rfind(".", start, end)
            if last_period > start + chunk_size - overlap:
                end = last_period + 1
        
        chunks.append(text[start:end])
        if end == text_length:
            break
        # Move start position for next chunk
        start = end - overlap
    
    return chunks

if __name__ == "__main__":
    # Test with a single PDF
    pdf_dir = "../data/pdfs/labour_laws"  # Change as needed
    pdfs = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]
    
    if pdfs:
        test_pdf = os.path.join(pdf_dir, pdfs[0])
        print(f"Processing {test_pdf}")
        
        # Extract text
        text = extract_text_from_pdf(test_pdf)
        print(f"Extracted {len(text)} characters")
        
        # Chunk text
        chunks = chunk_text(text)
        print(f"Created {len(chunks)} chunks")
        print(f"First chunk sample: {chunks[0][:200]}...")
    else:
        print(f"No PDFs found in {pdf_dir}")