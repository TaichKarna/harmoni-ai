import React, { useState } from 'react';

const Summary: React.FC = () => {
  const [userFeeling, setUserFeeling] = useState('');
  const [inputType, setInputType] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<boolean | null>(null);
  const [meanConfidence, setMeanConfidence] = useState<number | null>(null);
  const [summary, setSummary] = useState<string>('Your summarized content will appear here.');
  const [textInput, setTextInput] = useState<string>('');

  const handleFeelingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFeeling(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setInputType(selectedFile.type.startsWith('audio') ? 'audio' : selectedFile.type.startsWith('video') ? 'video' : 'text');
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) {
      alert('Please enter some text for summarization.');
      return;
    }
    setSubmitState(true);

    try {
      const response = await fetch('http://192.168.246.180:8000/summarize-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput })
      });

      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
      }
      setSubmitState(false);
    } catch (error) {
      console.error('Error summarizing text:', error);
      setSubmitState(false);
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a video file.');
      return;
    }

    const url = URL.createObjectURL(file);
    setVideoURL(url);
    setSubmitState(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://192.168.246.180:8000/summarize', {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if(response.ok){
        setSummary(data.summary)
      }
      setSubmitState(false);
    } catch (error) {
      console.error('Error uploading video:', error);
      setSubmitState(false);
    }
  };

  return (
    <>
      <div className="mt-8 py-6">
        {/* Textarea Fields */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Enter text to summarize
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            
            <div>
     
              <textarea
                rows={6}
                value={textInput}
                onChange={handleTextInputChange}
                placeholder="Enter text to summarize here..."
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <button
              onClick={handleTextSubmit}
              disabled={submitState}
              className="mt-4 w-full rounded-lg bg-blue-500 p-2 text-white"
            >
              {submitState ? 'Summarizing...' : 'Summarize Text'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-black dark:text-white mb-4">Upload Your Input</h4>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              File upload
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Attach file
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary dark:border-form-strokedark dark:bg-form-input"
              />
            </div>
          </div>
        </div>
        {file && (
          <div className="mt-3 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Uploaded {inputType}: <span className="font-medium">{file.name}</span>
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <form onSubmit={handleSubmit}>
          <h4 className="text-lg font-semibold text-black dark:text-white mb-4">Video Preview</h4>
          {videoURL && (
            <video controls className="w-full rounded-lg">
              <source src={videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <button type="submit" disabled={submitState} className="mt-4 w-full rounded-lg bg-blue-500 p-2 text-white">
            {submitState ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-black dark:text-white mb-4">Summary</h4>
        <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-gray-700 dark:text-gray-300">
          {meanConfidence !== null && (
            <>
              <p>Result: {meanConfidence > 0.5 ? "Real" : "Fake"}</p>
              <p>Confidence: {meanConfidence}</p>
            </>
          )}
          {summary}
        </div>
      </div>
    </>
  );
};

export default Summary;
