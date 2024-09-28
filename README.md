## Setup

## Requirements:

Python 3.12 recommended.
Node.js LTS

### Install dependencies:

## Backend:

```
pip install fastapi[all] uvicorn setuptools pyttsx3 SpeechRecognition google-generativeai pyaudio

OR

pip3 install fastapi[all] uvicorn setuptools pyttsx3 SpeechRecognition google-generativeai pyaudio

```

## Frontend

```
cd ./frontend
npm install
```

## Start the development server

### Backend

```
cd ./web/v01/backend
```

```

python -m uvicorn app:app --reload

OR

python3 -m uvicorn app:app --reload
```

### Frontend

```
cd ./frontend
npm run dev
```
