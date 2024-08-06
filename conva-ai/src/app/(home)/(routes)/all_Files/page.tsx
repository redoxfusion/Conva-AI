import React from 'react';
import { list } from '@vercel/blob';
import Delete from '../../_components/Delete';
import DownloadButton from '../../_components/Download';

export default async function AllFilePage() {
  const { blobs } = await list();
  console.log({ blobs });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Files</h1>
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        {blobs.map((blob) => (
          <div
            key={blob.url}
            className="mb-4 p-4 border-b border-gray-200"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-700 break-all">{blob.pathname}</span>
              <div className="flex space-x-4">
                <DownloadButton url={blob.url} />
                <Delete url={blob.url} />
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              <p>Upload Date: {new Date(blob.uploadedAt).toLocaleString()}</p>
              <p>Size: {(blob.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
