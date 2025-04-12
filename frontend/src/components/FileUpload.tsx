import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setSummary('');
      setError('');

      const response = await axios.post('http://localhost:8000/api/v1/summary/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSummary(response.data.summary);
    } catch (err) {
      setError('Failed to get summary. Make sure backend is running and accepts PDF files.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h2>Upload a Legal PDF for Summary</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginTop: '1rem' }}>
        {loading ? 'Processing...' : 'Upload & Summarize'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {summary && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: '1rem' }}>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
