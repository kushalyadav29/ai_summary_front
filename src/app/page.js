'use client';

import { useState, useEffect } from 'react';
import { getSummarizedArticle, extractArticle, summarizeText } from './utils/api.js';

const fetchCredits = async () => {
  try {
    const ip = 'user_ip_here'; // You can use an IP library or fetch the IP dynamically
    const response = await fetch('nodejs-production-5af0.up.railway.app/get-credits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip }),
    });
    const data = await response.json();
    return data.credits;
  } catch (error) {
    console.error('Error fetching credits:', error);
    return 10; // Fallback to 10 if there's an error
  }
};

export default function HomePage() {
  const [credits, setCredits] = useState(null); // Initially set to null to avoid hydration mismatch
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState('url'); // 'url' or 'text'

  // Fetch initial credits on mount
  useEffect(() => {
    const loadCredits = async () => {
      const initialCredits = await fetchCredits();
      setCredits(initialCredits); // Set credits after fetching
    };
    loadCredits();
  }, []);

  const handleSummarize = async () => {
    if (credits === null) {
      alert('Loading credits... Please wait.');
      return;
    }
    if (credits <= 0) {
      alert('Out of credits! Please buy more.');
      return;
    }

    if (!input.trim()) {
      alert(`Please provide a valid ${inputType}.`);
      return;
    }

    setLoading(true);
    try {
      let result;
      if (inputType === 'url') {
        result = await getSummarizedArticle(input); // Summarize URL
      } else {
        result = await summarizeText(input); // Summarize Text
      }
      setSummary(result);
      setCredits((prev) => prev - 1); // Deduct credits

      // Update credits in the database after each summarize action
      const ip = 'user_ip_here'; // Same IP logic as earlier
      await fetch('nodejs-production-5af0.up.railway.app/update-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip, credits: credits - 1 }),
      });
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (credits === null) {
    // You can show a loading spinner or a message while credits are being fetched
    return <div>Loading credits...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">AI Article Summarizer</h1>
      <div className="mb-4">
        <button
          onClick={() => setInputType('url')}
          className={`px-4 py-2 mr-2 rounded ${inputType === 'url' ? 'bg-gold text-black' : 'bg-gray-500 text-white'}`}
        >
          Summarize by URL
        </button>
        <button
          onClick={() => setInputType('text')}
          className={`px-4 py-2 rounded ${inputType === 'text' ? 'bg-gold text-black' : 'bg-gray-500 text-white'}`}
        >
          Summarize by Text
        </button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Paste your ${inputType} here...`}
        className="w-full max-w-lg p-4 mb-4 border border-gold rounded bg-black text-gold"
        rows={inputType === 'text' ? 8 : 2}
      />
      <button
        onClick={handleSummarize}
        disabled={loading}
        className={`${
          loading ? 'bg-gray-500' : 'bg-gold'
        } text-black px-6 py-2 rounded mb-4`}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      {summary && (
        <div className="mt-4 p-4 border border-gold bg-black text-gold rounded max-w-lg">
          <h2 className="font-bold text-lg">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
      <p className="mt-4">Remaining credits: {credits}</p>
    </div>
  );
}
