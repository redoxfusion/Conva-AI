'use client'

import React, { useState } from 'react'
import { useRouter } from "next/navigation";

interface DeleteProps {
  id: string;
  url: string;
}

function Delete({ id, url }: DeleteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await fetch(`/api/user-blobs/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          url,
        }),
      });

      router.refresh();
    } catch (error) {
      console.log("UserBlob delete error: ", error)
      setLoading(false);
    } finally {
      setLoading(true);
    }
  }

  return (
    <div>
      <button onClick={handleDelete}
        className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 curser-pointer disabled:bg-slate-500 transition-colors duration-300"
        disabled={loading}
      >
        DELETE
      </button>
    </div>
  );
}

export default Delete
