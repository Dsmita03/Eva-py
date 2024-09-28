# app.py
from fastapi import FastAPI, WebSocket
import pyttsx3
import speech_recognition as sr
import google.generativeai as genai

app = FastAPI()

# Initialize components for TTS, Speech Recognition, and Generative AI
engine = pyttsx3.init()
recognizer = sr.Recognizer()
genai.configure(api_key='AIzaSyD4_wR2A0eqXvamQHlqC8IQHTlqeh_SLJo')
model = genai.GenerativeModel('gemini-1.5-flash')

@app.get("/")
async def root():
    return {"message": "Hello, FastAPI is running!"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    while True:
        # Receive the question from the frontend via WebSocket
        question = await websocket.receive_text()
        
        # Use text-to-speech to ask the question aloud
        engine.say(question)
        engine.runAndWait()

        # Record the answer using speech recognition
        with sr.Microphone() as source:
            audio = recognizer.listen(source)
        try:
            answer = recognizer.recognize_google(audio)
        except:
            answer = "Could not understand audio"

        # Generate relevancy check using the Gemini API
        relevancy = check_relevancy(question, answer)

        # Send the answer and relevancy back to the frontend via WebSocket
        await websocket.send_text(f"Answer: {answer}")
        await websocket.send_text(f"Feedback: {relevancy}")

# Relevancy checking function
def check_relevancy(question, answer):
    prompt = f"Question: {question}\nAnswer: {answer}\nIs the answer relevant?"
    response = model.generate_content(prompt)
    
    return response.text
