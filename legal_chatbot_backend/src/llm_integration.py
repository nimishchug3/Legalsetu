import os
import requests
import json
from typing import List, Dict

def generate_response(api_key: str, query: str, context: str) -> str:
    """Generate a response using Groq API and retrieved context."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # Create prompt with context and query
    system_prompt = """You are a helpful and conversational legal assistant specializing in Indian law. 
                       Your goal is to provide clear, natural, and human-like answers based on the given legal context. 

                       Follow these guidelines:
 
                       1. Respond in a conversational and professional tone.
                       2. Use paragraphs and bullet points **only when helpful**, not excessively.
                       3. Summarize information naturally instead of listing raw excerpts.
                       4. When referencing laws or sections, include them inline (e.g., "as per Section 4(k) of the Trade Unions Act, 1926").
                       5. If the context doesn’t contain enough information, politely say so.
                       6. Do **not** mention metadata like "Excerpt", "Category", or document names like 'Labour Act.pdf'.
                       7. Always aim for clarity and relevance in your response."""
    
    data = {
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Context information from Indian legal documents:\n\n{context}\n\nUser Question: {query}"}
        ],
        "model": "llama3-70b-8192",  # You can change to another model Groq supports
        "temperature": 0.2,  # Lower temperature for more factual responses
        "max_tokens": 1024
    }
    
    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            data=json.dumps(data)
        )
        
        response_data = response.json()
        
        if response.status_code == 200:
            return response_data["choices"][0]["message"]["content"]
        else:
            error_message = f"Error {response.status_code}: {response_data.get('error', {}).get('message', 'Unknown error')}"
            print(error_message)
            return f"I encountered an error while generating a response: {error_message}"
            
    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        return f"I encountered an error while generating a response: {str(e)}"

if __name__ == "__main__":
    # Get Groq API key from environment
    api_key = "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"
    
    if not api_key:
        print("GROQ_API_KEY environment variable not set. Please set it before running this script.")
    else:
        # Test with a simple query and context
        test_query = "What are working hours according to Indian labour laws?"
        test_context = "The Factories Act, 1948 states that no adult worker shall be required or allowed to work in a factory for more than 48 hours in any week. The period of work of an adult worker in a factory shall be so arranged that inclusive of his intervals for rest, it shall not spread over more than ten and a half hours in any day."
        
        response = generate_response(api_key, test_query, test_context)
        print(response)