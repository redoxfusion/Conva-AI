import React, { useState } from 'react';

interface FileUploaderProps {
  onUpload: (analysis: any) => void; // Replace `any` with the actual result type if known
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    setFile(uploadedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed.');
      }

      const result = await response.json();
      onUpload(result.analysis);
    } catch (err) {
      console.error(err);
      setError('Failed to upload the file.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt" // Adjust as needed
      />
      <button
        onClick={handleUpload}
        disabled={isUploading || !file}
        className="upload-button"
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default FileUploader;
