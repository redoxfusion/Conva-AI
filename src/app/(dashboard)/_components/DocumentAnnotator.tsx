import React, { useState } from 'react';

interface Annotation {
  text: string;
  notes: string;
}

const DocumentAnnotator: React.FC = () => {
  const [document, setDocument] = useState<string | undefined>();
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setDocument(e.target.result);
        }
      };
      reader.readAsText(event.target.files[0]);
    }
  };

  const handleHighlight = (text: string) => {
    // Implementation for highlighting the selected text
    // This might involve using a library like react-highlight-words
  };

  const handleAddNote = (text: string, notes: string) => {
    setAnnotations([...annotations, { text, notes }]);
  };

  return (
    <div>
      <input type="file" onChange={handleDocumentUpload} />

      <div>
        {/* Display the document with highlighted text only if document is defined */}
        {document && (
          <div dangerouslySetInnerHTML={{ __html: document }} />
        )}
      </div>

      <div>
        {/* Display annotations */}
        <ul>
          {annotations.map((annotation) => (
            <li key={annotation.text}>
              {annotation.text} - {annotation.notes}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentAnnotator;