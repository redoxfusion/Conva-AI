"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

const AnnotationGenerator = () => {
  const [annotation, setAnnotation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await fetch("/api/document-annotator", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setAnnotation(result.annotation);
        setError(null);
      } else {
        setAnnotation(null);
        setError(result.error || "An error occurred");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <h1>Annotation Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Document:</label>
          <input type="file" name="document" required />
        </div>
        <div>
          <label>Annotation Type:</label>
          <select name="annotationType" required>
            <option value="highlight">Highlights</option>
            <option value="key-points">Key Points</option>
          </select>
        </div>
        <button type="submit">Generate Annotation</button>
      </form>
      {annotation && (
        <div>
          <h2>Generated Annotation:</h2>
          <div className="text-left"><ReactMarkdown>{annotation}</ReactMarkdown></div>
        </div>
      )}
      {error && (
        <div style={{ color: "red" }}>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default AnnotationGenerator;
