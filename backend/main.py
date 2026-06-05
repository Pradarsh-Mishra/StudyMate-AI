import uvicorn
import openai
import numpy as np

from io import BytesIO
from PIL import Image

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from pypdf import PdfReader

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

client=openai.OpenAI(
api_key="sk-EF5sUlx6Li_oUp0N5E6R5Q",
base_url="https://apidev.navigatelabsai.com"
)




splitter=RecursiveCharacterTextSplitter(
chunk_size=1000,
chunk_overlap=200
)


embeddings=OpenAIEmbeddings(
model="text-embedding-3-small",
api_key="sk-EF5sUlx6Li_oUp0N5E6R5Q",
base_url="https://apidev.navigatelabsai.com"
)


vector_db=None
retriever=None

class PromptRequest(BaseModel):
    question:str


class QuizRequest(BaseModel):
    topic:str
    difficulty:str="medium"
    questions:int=10


class StudyPlanRequest(BaseModel):
    subjects:list
    exam_days:int
    hours_per_day:int


class ProgressRequest(BaseModel):
    scores:dict


class VoiceRequest(BaseModel):
    transcript:str

@app.post("/upload_study_material/")
async def upload_study_material(
    file: UploadFile = File(...)
):

    global vector_db
    global retriever

    try:

        print("UPLOAD STARTED")

        reader = PdfReader(file.file)

        text = ""

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"


        if not text.strip():
            return {
                "error":"No text found in PDF"
            }


        chunks = text_splitter.split_text(text)


        vector_db = Chroma.from_texts(
            chunks,
            embeddings
        )


        retriever = vector_db.as_retriever(
            search_kwargs={"k":5}
        )


        print("UPLOAD SUCCESS")


        return {
            "status":"success",
            "chunks":len(chunks)
        }


    except Exception as e:

        print("UPLOAD ERROR:",e)

        return {
            "error":str(e)
        }

@app.post("/ask")
async def ask(req:PromptRequest):

    if retriever is None:
        return {"error":"Upload PDF first"}


    docs=retriever.invoke(req.question)


    context="\n".join(
    [d.page_content for d in docs]
    )


    response=client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
    {
    "role":"user",
    "content":
    f"Context:{context}\nQuestion:{req.question}"
    }
    ])

    return {
    "answer":
    response.choices[0].message.content
    }

@app.post("/voice_tutor")
async def voice_tutor(
    req: VoiceRequest
):

    global retriever

    try:

        if retriever is None:
            return {
                "error": "Please upload study material first"
            }


        docs = retriever.invoke(
            req.transcript
        )


        context = "\n".join(
            [doc.page_content for doc in docs]
        )


        prompt = f"""
You are an AI Tutor.

Use this context:
{context}

Student question:
{req.transcript}

Explain in simple language.
"""


        response = client.chat.completions.create(
            model="gemini-2.5-flash",
            messages=[
                {
                    "role":"user",
                    "content":prompt
                }
            ]
        )


        return {
            "answer":
            response.choices[0].message.content
        }


    except Exception as e:

        print("VOICE ERROR:", e)

        return {
            "error":str(e)
        }

@app.post("/summary")
async def generate_summary():
    global retriever

    try:
        if retriever is None:
            return {"error": "Please upload study material first"}

        docs = retriever.get_relevant_documents("important topics")

        if not docs:
            return {"error": "No documents found in uploaded material"}

        context = "\n\n".join(
            doc.page_content for doc in docs if doc.page_content
        )

        if not context.strip():
            return {"error": "Uploaded material contained no readable text"}

        response = client.chat.completions.create(
            model="gemini-2.5-flash",
            messages=[
                {
                    "role": "user",
                    "content": f"""
Generate detailed study notes.

Context:
{context}
"""
                }
            ]
        )

        return {
            "summary": response.choices[0].message.content
        }

    except Exception as e:
        print("SUMMARY ERROR:", e)
        return {"error": str(e)}

@app.post("/quiz")
async def generate_quiz(
    req: QuizRequest
):

    prompt = f"""
Create {req.questions} MCQs.

Topic:
{req.topic}

Difficulty:
{req.difficulty}

Include answers.
"""

    response = client.chat.completions.create(
        model="gemini-2.5-flash",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
    )

    return {
        "quiz":
        response.choices[0].message.content
    }

@app.post("/study_plan")
async def study_plan(
    req: StudyPlanRequest
):

    prompt = f"""
Create study plan.

Subjects:
{req.subjects}

Days:
{req.exam_days}

Hours:
{req.hours_per_day}
"""

    response = client.chat.completions.create(
        model="gemini-2.5-flash",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
    )

    return {
        "plan":
        response.choices[0].message.content
    }

@app.post("/analyze_progress")
async def analyze_progress(
    req: ProgressRequest
):

    prompt = f"""
Analyze student scores.

Scores:

{req.scores}

Recommend weak topics.
"""

    response = client.chat.completions.create(
        model="gemini-2.5-flash",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
    )

    return {
        "analysis":
        response.choices[0].message.content
    }

@app.get("/")
def root():

    return {
        "message":"AI Study Assistant Running"
    }

if __name__ == "__main__":
    # Start the FastAPI app with uvicorn when run as a script
    uvicorn.run(app, host="0.0.0.0", port=8000)
