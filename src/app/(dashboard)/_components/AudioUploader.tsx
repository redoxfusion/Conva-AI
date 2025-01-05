import React, { useState } from "react";
import axios from "axios";

interface AudioUploaderProps {
  onResponse: (response: string) => void;
}

// Define the structure of the expected response from the API
interface AudioResponse {
  message: string;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onResponse }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("audio", file);

    try {
      // Specify the response type here to tell TypeScript about the expected response structure
      const response = await axios.post<AudioResponse>("/api/processAudio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Now response.data is typed correctly
      onResponse(response.data.message);
    } catch (error) {
      console.error("Error uploading audio:", error);
      onResponse("Error processing the audio.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/mp3" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isUploading ? "Uploading..." : "Upload and Process"}
      </button>
    </div>
  );
};

export default AudioUploader;
