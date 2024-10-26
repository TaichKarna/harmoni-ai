import whisper
import json
import os

def asr(file_name):

    model = whisper.load_model("base")

    output_data = {}

    directory = f"audio\static"
    json_output_path = f"audio\{file_name}\json"

    # Check if the JSON output path exists; if not, create it
    if not os.path.exists(json_output_path):
        os.makedirs(json_output_path)
        
    try:
        with os.scandir(directory) as entries:
            for entry in entries:
                if entry.is_file() and entry.name.endswith('.wav'):  # Check for audio files
                    audio_path = os.path.join(directory, entry.name)
                    print(f"Processing audio file: {audio_path}")
                    
                    # Perform ASR
                    result = model.transcribe(audio_path)
                    
                    # Remove the file extension for the key
                    file_name_without_extension = os.path.splitext(entry.name)[0]
                    output_data[file_name_without_extension] = result["text"]
        
        output_json_file = os.path.join(json_output_path, "asr.json")
        with open(output_json_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=4)
        print(f"ASR results saved to {output_json_file}")

    except FileNotFoundError:
        print(f"The directory '{directory}' does not exist.")
    except PermissionError:
        print(f"Permission denied to access the directory '{directory}'.")
    except Exception as e:
        print(f"Error during ASR processing: {str(e)}")

    return output_data
