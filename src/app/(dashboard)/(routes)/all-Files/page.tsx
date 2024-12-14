import React from "react";
import Delete from "../../_components/Delete";
import DownloadButton from "../../_components/Download";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface Blob {
  id: string;
  pathname: string; // adjust this type according to your blob structure
  blobUrl: string; // adjust this type according to your blob structure
  updatedAt: Date; // adjust this type according to your blob structure
}

export default async function AllFilePage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const blobs = await db.userBlob.findMany({
    where: {
      userId
    }
  });

  console.log(blobs);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Files</h1>
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        {blobs.length ?
          (blobs.map((blob: Blob, index: number) => (
            <div key={index} className="mb-4 p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 break-all">{blob.pathname}</span>
                <div className="flex space-x-4">
                  <DownloadButton url={blob.blobUrl} />
                  <Delete id={blob.id} url={blob.blobUrl} />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                <p>Upload Date: {new Date(blob.updatedAt).toLocaleString()}</p>
                {/* <p>Size: {(blob.size / 1024).toFixed(2)} KB</p> */}
              </div>
            </div>
          ))) : (<div className="text-center">No files are uploaded yet!</div>)}
      </div>
    </div>
  );
}
