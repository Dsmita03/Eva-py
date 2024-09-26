import pyttsx3
import speech_recognition as sr
import google.generativeai as genai

# Initialize text-to-speech engine
engine = pyttsx3.init()

# Initialize speech recognizer
recognizer = sr.Recognizer()

# Initialize Gemini API (replace with your actual API key)
genai.configure(api_key='AIzaSyD4_wR2A0eqXvamQHlqC8IQHTlqeh_SLJo')
model = genai.GenerativeModel('gemini-1.5-flash')

def ask_question(question):
    print(f"Asking: {question}") 
    engine.say(question)
    engine.runAndWait()

def record_answer():
    with sr.Microphone() as source:
        print("Listening for answer...")
        audio = recognizer.listen(source)
    
    try:
        text = recognizer.recognize_google(audio)
        print(f"Recognized: {text}")
        return text
    except sr.UnknownValueError:
        print("Could not understand audio")
        return None
    except sr.RequestError as e:
        print(f"Could not request results; {e}")
        return None

def check_relevancy(question, answer):
    prompt = f"""
    Question: {question}
    Answer: {answer}
    
    Is the answer relevant to the question? Please respond with 'Relevant' or 'Not Relevant', 
    followed by a brief explanation.
    """
    
    response = model.generate_content(prompt)
    return response.text

def main():
    question = "What is the capital of France?"
    
    ask_question(question)
    answer = record_answer()
    
    if answer:
        relevancy = check_relevancy(question, answer)
        print(f"\nRelevancy check:\n{relevancy}")
    else:
        print("No answer recorded.")

if __name__ == "__main__":
    main()