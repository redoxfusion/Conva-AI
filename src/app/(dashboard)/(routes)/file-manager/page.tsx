'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';

interface UserBlobResult {
  id: string;
  userId: string;
  blobUrl: string;
  pathname: string;
}

export default function UploadPage() {
  const router = useRouter();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [blobs, setBlobs] = useState<UserBlobResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      if (!inputFileRef.current?.files) {
        throw new Error("No files selected");
      }

      const files = Array.from(inputFileRef.current.files);
      const newBlobs: UserBlobResult[] = [];

      for (const file of files) {
        const response = await fetch(`/api/user-blobs?filename=${file.name}`, {
          method: 'POST',
          body: file,
        });

        const newBlob = (await response.json()) as UserBlobResult;
        newBlobs.push(newBlob);
      }
      console.log(newBlobs)

      setLoading(false);

      setBlobs(newBlobs);

      router.refresh()
    } catch (error) {
      console.log("file creation error: ", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Upload Your Files</h1>

      <form
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
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
          className="w-full bg-blue-500 disabled:bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          disabled={loading}
        >
          Upload
        </button>
      </form>
      <Link href={'/all-Files'} className="w-full max-w-sm mt-5 text-center bg-[#191919] text-[#EEEEEE] font-bold py-2 px-4 rounded-md hover:bg-[#5e5e5e] transition-colors duration-300">View Files</Link>

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
