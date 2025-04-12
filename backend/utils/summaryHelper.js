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

    const prompt = `
You are a legal expert. Please summarize the following document:

${text.substring(0, 30000)}

Provide:
1. Document type and purpose
2. Key legal points
3. Important dates
4. Risks or concerns
5. Explanation of terminology
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
