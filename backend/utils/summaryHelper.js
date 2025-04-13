const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdfParse = require('pdf-parse');
require('dotenv').config();

const genAI = new GoogleGenerativeAI("AIzaSyAxBXf2VQjmDOt18xZbjimkZkCHdagjwv0");

async function extractTextFromPDF(pdfBuffer) {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text;
  } catch (err) {
    console.error('PDF Parse error:', err);
    throw new Error('Text extraction failed');
  }
}

async function generateLegalSummary(text) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // Modify the generateLegalSummary prompt to enforce better structure
const prompt = `
Analyze this legal document and provide a structured summary using markdown formatting. Focus on clarity and organization:

*Document Text:*
${text.substring(0, 30000).trim()}

*Required Structure:*
## Document Type and Purpose
- [Identify document type (contract, agreement, etc.)]
- [State primary purpose]

## Key Legal Points
1. [First key point]
2. [Second key point]
...

## Important Dates
List each date with a clear title and corresponding description. Use this format:
- *[Event Name]*: [Description or note if missing]

If a date is missing, represented as "(DATE)", "N/A", or blank, indicate this with:  
⚠ *[Event Name]: *Date not specified in the document

Use event titles like "Effective Date", "Agreement End Date", "Invoice Submission Deadline", etc.
...

## Risks and Concerns
⚠ [Risk 1]: [Explanation]
⚠ [Risk 2]: [Explanation]
...

## Legal Terminology
*Term 1*: [Definition]
*Term 2*: [Definition]
...

Format requirements:
- Use proper markdown headers (##) for sections
- Use bullet points for lists
- Bold important terms
- Keep explanations concise
- Never use markdown tables
`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error('Gemini API error:', err);
    throw new Error('Summary generation failed');
  }
}

async function processPDFAndGenerateSummary(pdfBuffer) {
  const extractedText = await extractTextFromPDF(pdfBuffer);
  const summary = await generateLegalSummary(extractedText);
  return {
    summary,
    fileInfo: {
      size: Buffer.byteLength(pdfBuffer),
    },
  };
}

module.exports = {
  extractTextFromPDF,
  generateLegalSummary,
  processPDFAndGenerateSummary,
};