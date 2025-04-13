# ⚖️ LegalSetu – AI-Powered Legal Assistance Platform

LegalSetu is a multilingual, AI-driven legal assistance platform designed to bridge the legal awareness gap for citizens, especially in rural India. With voice and text input, document summarization, and a lawyer discovery system — LegalSetu aims to simplify access to justice.

---

## 📌 Presentation 

![PPT Presentation](Add_PPT_LINK_HERE)

---

## 📌 Demo

![Video Demo](https://drive.google.com/file/d/13_QMoOvxpjBakIvhycAoucIXcZ1p1m3x/view?usp=drive_link)

---

## 🚀 Features

- 🌐 **Multilingual Legal Chatbot** – Ask legal queries in regional languages via text or voice.
- 📄 **Legal Document Summarizer** – Upload documents and get simplified summaries with legal highlights.
- 👨‍⚖️ **Find Verified Lawyers** – Search lawyers by area, language, and availability.
- 🔒 **Secure Login & User Profiles** – Authentication with profile-specific features.
- 🤖 **Gemini AI Integration** – For accurate, fast, and simplified legal document understanding.
- 📱 **Mobile-First Design** – Optimized for low-bandwidth and rural usage.

---

## 💡 Problem Statement

**Millions of Indians lack access to clear, affordable, and regional-language legal help. LegalSetu makes legal guidance accessible, understandable, and human-friendly — right from your phone.**

---

## 📈 Use Cases

- **Legal Awareness**: Users ask legal questions and receive simplified answers in their language.
- **Document Understanding**: Get easy-to-read summaries of complex legal documents.
- **Lawyer Discovery**: Discover verified legal experts by location, language, and expertise.
- **Inclusive Access**: Designed for low-resource devices and limited internet.
- **24/7 AI Chatbot**: Acts as a virtual legal assistant anytime, anywhere.

---

## 🛠️ Technology Stack

| Layer              | Tech Used |
|-------------------|-----------|
| **Frontend**       | React.js, TypeScript, Tailwind CSS – for fast, responsive UI |
| **Backend**        | Node.js, Express.js – for APIs and core logic |
| **Database**       | MongoDB – storing user and lawyer data |
| **AI/NLP Services**| Gemini API – legal document summarization |
| **Document Processing** | OCR + NLP – extract and process legal text |
| **Language Support**| Google Translate API – supports Indian regional languages |

---
## 📸 Screenshots

### 🏠 Homepage

![Homepage Screenshot 1](https://github.com/nimishchug3/Legalsetu/blob/main/assets/Homepage.png)
![Homepage Screenshot 2](https://github.com/nimishchug3/Legalsetu/blob/main/assets/Homepage%20(2).png)

---

### 🤖 Chatbot

**Chatbot Interface:**
![Chatbot Screenshot](https://github.com/nimishchug3/Legalsetu/blob/main/assets/Chatbot.png)

---

### 📄 Document Summarizer

**View 1 – Upload Document:**
![Upload Document](https://github.com/nimishchug3/Legalsetu/blob/main/assets/Document-summariser.png)

**View 2 – Summary Display:**
![Summary View](https://github.com/nimishchug3/Legalsetu/blob/main/assets/document-summary.jpg)

**View 3 – Detailed Summary:**
![Detailed Summary](https://github.com/nimishchug3/Legalsetu/blob/main/assets/document-summary(1).jpg)

---

### ⚖️ Find-a-Lawyer

**Find-a-Lawyer Interface:**
![Find a Lawyer](https://github.com/nimishchug3/Legalsetu/blob/main/assets/Search-a-Lawyer.png)
![Find a Lawyer](https://github.com/nimishchug3/Legalsetu/blob/main/assets/Search-a-lawyer%20(2).png)

---

### Installation
```bash
git clone https://github.com/nimishchug3/Legalsetu.git
cd Legalsetu
npm install
cd client && npm install

# Create .env file in root directory
echo "MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_google_ai_key
TRANSLATE_API_KEY=your_translate_key" > .env

# Start servers
npm run dev & cd client && npm start

