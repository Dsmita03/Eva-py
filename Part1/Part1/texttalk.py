 # texttalk.py

from gtts import gTTS
import os
from playsound import playsound

def text_to_speech(text, lang='en', save_as='output.mp3'):
    """
    Convert text to speech and save the output as an audio file.
    
    Parameters:
    text (str): Text to convert to speech.
    lang (str): Language of the speech (default is 'en' for English).
    save_as (str): Filename to save the output audio (default is 'output.mp3').
    """
    try:
        # Create speech object using gTTS
        tts = gTTS(text=text, lang=lang)
        
        # Save the output to an mp3 file
        tts.save(save_as)
        print(f"Speech saved as {save_as}")
        
        # Play the sound
        playsound(save_as)
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Get text input from the user
    text = input("Enter the text you want to convert to speech: ")
    
    # Convert the text to speech
    text_to_speech(text)
