"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import ReactMarkdown from "react-markdown";

export default function DocumentAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setSummary('');

    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Document analysis failed');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      console.error('Error during analysis:', err);
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Document Analyzer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="w-full p-2 border rounded"
        />
        <button 
          type="submit" 
          disabled={loading || !file}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? 'Analyzing...' : 'Analyze Document'}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Analysis Summary:</h2>
          <div><ReactMarkdown>{summary}</ReactMarkdown></div>
        </div>
      )}
    </div>
  );
}