'use client'

import React from 'react'
import { useRouter } from "next/navigation"
type props = {
    url: string;
}

function Delete({url}: props) {
    const router = useRouter();
  return (
    <div>
      <button onClick={async () => {
        await fetch(`/api/files`,{
            method: "DELETE",
            body: JSON.stringify({url,
            }),
        });
        router.refresh();
      }}
      className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
      >
        DELETE
      </button>
    </div>
  );
}

export default Delete
