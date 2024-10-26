import os
import json
import shutil
import cohere
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from audio_extract import extract_audio
from asr import asr
from pathlib import Path
from pydantic import BaseModel


# Initialize FastAPI app and Cohere client
app = FastAPI()
COHERE_API_KEY = ""  # Replace with your actual Cohere API key
cohere_client = cohere.Client(COHERE_API_KEY)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; restrict to specific domains for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory paths
TEMP_DIR = "temp_videos"
AUDIO_DIR = "audio"
Path(TEMP_DIR).mkdir(exist_ok=True)
Path(AUDIO_DIR).mkdir(exist_ok=True)

def summarize_meeting_transcript(asr_data):
    """Summarize ASR data using Cohere's API."""
    transcript_text = " ".join(asr_data.values())
    print(transcript_text)
    prompt = f"Summarize the following meeting transcript:\n{transcript_text}"
    
    response = cohere_client.summarize(
        text=prompt,
        model='summarize-xlarge',  # Replace with the correct model ID
        length='medium'  # Adjust length as needed ('short', 'medium', 'long')
    )
    return response.summary

@app.post("/summarize")
async def summarize_video(file: UploadFile = File(...)):
    try:
        # Save uploaded video to temporary directory
        video_path = os.path.join(TEMP_DIR, file.filename)
        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract audio from video
        output_directory = os.path.join(AUDIO_DIR, os.path.splitext(file.filename)[0])
        os.makedirs(output_directory, exist_ok=True)
        wav_path = extract_audio(video_path, output_directory)
        
        # Perform ASR on audio and summarize
        asr_output = asr(os.path.splitext(file.filename)[0])
        summary = summarize_meeting_transcript(asr_output)

        # Clean up the temp files
        os.remove(video_path)
        shutil.rmtree(output_directory)
        
        # Return JSON summary
        return JSONResponse(content={"summary": summary})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Ensure cleanup in case of error
        if os.path.exists(video_path):
            os.remove(video_path)
        if os.path.exists(output_directory):
            shutil.rmtree(output_directory)


def summarize_text(text):
    """Summarize provided text using Cohere's API."""
    prompt = f"Summarize the following meeting transcript:\n{text}"
    
    # Call Cohere API to summarize the text
    response = cohere_client.summarize(
        text=prompt,
        model='summarize-xlarge',  # Adjust as needed
        length='medium'  # Adjust length as needed ('short', 'medium', 'long')
    )
    return response.summary

class SummarizeRequest(BaseModel):
    text: str

@app.post("/summarize-text")
async def get_summarize_text(request: SummarizeRequest):
    # Check if the input is empty (optional, Pydantic handles empty values)
    if not request.text.strip():
        raise HTTPException(status_code=422, detail="Text field cannot be empty")

    try:
        print(request.text)
        # Summarize the provided text
        summary = summarize_text(request.text)

        # Return JSON summary
        return JSONResponse(content={"summary": summary})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)  # Make accessible on the network
