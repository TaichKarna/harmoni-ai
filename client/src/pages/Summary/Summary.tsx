import React, { useState } from 'react';

const Summary: React.FC = () => {
  const [userFeeling, setUserFeeling] = useState('');
  const [inputType, setInputType] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('Your summarized content will appear here.');

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

  return (
    <>
      <div className="mt-8 py-6">
          {/* <!-- Textarea Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Enter text to summarise
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Disabled textarea
                </label>
                <textarea
                  rows={6}
                  disabled={false}
                  placeholder="Disabled textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                ></textarea>
              </div>
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
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
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
        <h4 className="text-lg font-semibold text-black dark:text-white mb-4">Summary</h4>
        <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-gray-700 dark:text-gray-300">
          {summary}
        </div>
      </div>
    </>
  );
};

export default Summary;
