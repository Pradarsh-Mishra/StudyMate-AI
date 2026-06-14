# StudyMate-AI 🚀

> An AI-powered personalized learning platform leveraging Retrieval-Augmented Generation (RAG), vector databases, and Large Language Models (LLMs) to transform static study materials into an interactive educational experience.

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![LangChain](https://img.shields.io/badge/LangChain-RAG-orange)
![ChromaDB](https://img.shields.io/badge/ChromaDB-VectorDB-purple)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

---

## 📖 Overview

StudyMate-AI is an intelligent educational assistant designed to enhance learning through AI-driven interactions. The platform enables students to upload study materials, ask context-aware questions, generate summaries, create quizzes, receive personalized study plans, and interact with an AI tutor.

The system combines semantic search, vector embeddings, and generative AI to provide accurate, context-aware responses grounded in uploaded educational content.

---

## ✨ Key Features

### 📄 Intelligent Document Processing
- Upload and process PDF-based study materials
- Automatic text extraction and chunking
- Semantic indexing using vector embeddings

### 🔍 Retrieval-Augmented Question Answering
- Context-aware responses based on uploaded content
- Reduces hallucinations through document-grounded retrieval
- Fast semantic search powered by ChromaDB

### 📝 AI-Generated Study Notes
- Automatic summary generation
- Condensed learning material for revision
- Topic-focused note creation

### 🎯 Dynamic Quiz Generation
- Generate MCQ-based assessments
- Adjustable difficulty levels
- Automated answer generation

### 🎙️ Voice Tutor
- Natural language interaction with study materials
- Conversational AI tutoring experience
- Contextual explanations for complex topics

### 📅 Personalized Study Planning
- Exam-oriented study schedules
- Subject prioritization
- Time allocation based on available study hours

### 📊 Progress Analytics
- Performance evaluation
- Weak-topic identification
- Learning recommendations

---

## 🏗️ System Architecture

```text
PDF Upload
     │
     ▼
Text Extraction (PyPDF)
     │
     ▼
Text Chunking
     │
     ▼
Embedding Generation
(OpenAI Embeddings)
     │
     ▼
ChromaDB Vector Store
     │
     ▼
Semantic Retrieval
     │
     ▼
LLM Inference
(Gemini 2.5 Flash)
     │
     ▼
Context-Aware Response
```

---

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript (ES6+)

### Backend
- FastAPI
- Python
- Uvicorn

### AI & Machine Learning
- LangChain
- ChromaDB
- OpenAI Embeddings
- Gemini 2.5 Flash

### Document Processing
- PyPDF
- EasyOCR
- Pillow

---

## 📂 Project Structure

```text
StudyMate-AI/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/Pradarsh-Mishra/StudyMate-AI.git
cd StudyMate-AI
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

set OPENAI_API_KEY=your_api_key
python main.py
```

### Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend

```env
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=your_provider_url
```

### Frontend

```env
VITE_API_URL=http://localhost:8000
```

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/upload_study_material/` | POST | Upload study PDF |
| `/ask` | POST | Context-aware Q&A |
| `/summary` | POST | Generate study notes |
| `/quiz` | POST | Generate MCQs |
| `/voice_tutor` | POST | AI tutoring assistance |
| `/study_plan` | POST | Personalized study planning |
| `/analyze_progress` | POST | Performance analytics |

---

## 🎯 Future Enhancements

- User Authentication & Authorization
- Multi-user Knowledge Base
- Persistent Chat History
- Advanced Learning Analytics
- Mobile Application Support
- Real-Time Voice Interaction
- Multi-Document Knowledge Retrieval

---

## 👥 Contributors

| Contributor | Role |
|------------|------|
| **Pradarsh Kumar Mishra** | Full Stack Development, AI Integration |
| **Shubham Rajput** | Full Stack Development, System Design |

---

## 📜 Academic Context

This project was developed as a capstone project demonstrating the practical application of:

- Retrieval-Augmented Generation (RAG)
- Vector Databases
- Large Language Models (LLMs)
- Semantic Search
- AI-Assisted Learning Systems
- Full-Stack Web Development

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
