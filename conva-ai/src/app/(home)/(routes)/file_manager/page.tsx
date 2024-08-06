'use client';

import type { PutBlobResult } from '@vercel/blob';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function UploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blobs, setBlobs] = useState<PutBlobResult[]>([]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Upload Your Files</h1>

      <form
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No files selected");
          }

          const files = Array.from(inputFileRef.current.files);
          const newBlobs: PutBlobResult[] = [];

          for (const file of files) {
            const response = await fetch(`/api/files?filename=${file.name}`, {
              method: 'POST',
              body: file,
            });

            const newBlob = (await response.json()) as PutBlobResult;
            newBlobs.push(newBlob);
          }

          setBlobs(newBlobs);
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-gray-700 font-bold mb-2"
          >
            Choose files
          </label>
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            multiple
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Upload
        </button>
      </form>
        <Link href={'/all_Files'} className="w-full max-w-sm mt-5 text-center bg-[#191919] text-[#EEEEEE] font-bold py-2 px-4 rounded-md hover:bg-[#5e5e5e] transition-colors duration-300">View Files</Link>

      {blobs.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-full max-w-md">
          <p className="text-gray-700">Upload Successful</p>
          <ul>
            {blobs.map((blob, index) => (
              <div key={index} className="mb-4 p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 break-all">{blob.pathname}</span>
              </div>
            </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
