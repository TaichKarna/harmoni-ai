import os
from moviepy.editor import VideoFileClip

def extract_audio(video_path, output_directory):
    """Extract audio from a video file and save it in the specified directory."""
    # Create output directory if it doesn't exist
    os.makedirs(output_directory, exist_ok=True)

    # Load the video file
    video = VideoFileClip(video_path)
    
    # Extract the audio
    audio = video.audio
    
    # Define the output audio file path
    base_name = os.path.basename(video_path)
    audio_file_name = os.path.splitext(base_name)[0] + ".wav"
    audio_output_path = os.path.join(output_directory, audio_file_name)
    
    # Write the audio to a WAV file
    audio.write_audiofile(audio_output_path)

    # Close the video and audio clips
    audio.close()
    video.close()

    return audio_output_path  # Return the path of the saved audio file

# Example usage
if __name__ == "__main__":
    video_file_path = "your_video_file.mp4"  # Replace with your video file path
    output_dir = "audio_output"  # Define the output directory
    extract_audio(video_file_path, output_dir)
