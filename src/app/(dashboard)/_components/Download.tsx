'use client'

import React from 'react';

interface DownloadButtonProps {
  url: string;
};

function DownloadButton({ url }: DownloadButtonProps) {
  return (
    <div>
      <button
        onClick={() => {
          const link = document.createElement('a');
          link.href = url;
          link.download = '';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
      >
        VIEW
      </button>
    </div>
  );
}

export default DownloadButton;
