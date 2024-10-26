import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useStore from '../../store/store'
import { useState } from 'react';


const Brainstorming: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [prompts, setPrompts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const generatePrompts = async () => {
    if (!inputValue) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // or another model of your choice
          messages: [{ role: 'user', content: `Generate brainstorming prompts based on: ${inputValue}` }],
          max_tokens: 100,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const generatedPrompts = data.choices[0].message.content.split('\n');
      setPrompts(generatedPrompts);
    } catch (err) {
      console.log(error)
      setError('Failed to generate prompts. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Brainstorming" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
        <div>
      <h1>Brainstorming Page</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your idea"
      />
      <button onClick={generatePrompts} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Prompts'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {prompts.length > 0 && (
          <ul>
            {prompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
        </div>
      </div>
    </>
  );
};

export default Brainstorming;
