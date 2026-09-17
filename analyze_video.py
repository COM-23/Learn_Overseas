import os
from google import genai
from google.genai import types

def analyze_video():
    client = genai.Client()
    video_path = "/Users/dishik/Downloads/Internship /Learn Overseas/ScreenRecording_09-02-2026 18-47-59_1.MP4"
    
    print("Uploading video...")
    video_file = client.files.upload(file=video_path)
    print(f"Completed upload: {video_file.uri}")
    
    prompt = "Please watch this screen recording of a website. Specifically, look for the part where a 'team member' photo is clicked. Describe in high detail what happens next. Is there a popup or modal? What does the design look like? What animations happen? What is the layout of the modal (where is the photo, text, etc)? Does it blur the background? Does it slide in from somewhere? Be as descriptive as possible so a developer can recreate it."
    
    print("Generating content...")
    response = client.models.generate_content(
        model='gemini-2.5-pro',
        contents=[video_file, prompt]
    )
    
    print("\n--- Analysis Result ---")
    print(response.text)

if __name__ == "__main__":
    analyze_video()
