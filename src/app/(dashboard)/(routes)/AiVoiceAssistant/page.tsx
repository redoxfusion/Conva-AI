"use client";

import Spline from '@splinetool/react-spline/next';
import { useState } from 'react';
import AudioUploader from '/React Project/conva-ai/src/app/(dashboard)/_components/AudioUploader'; // Existing voice assistant component
import axios from 'axios';
import { Client } from '@clerk/nextjs/server';
import { User } from 'lucide-react';

export default function Home() {
  const [assistantResponse, setAssistantResponse] = useState<string>('');
  const [avatarEmotion, setAvatarEmotion] = useState<string>('neutral'); // Emotion state for avatar

  // Handle the assistant response and update avatar's emotion
  const handleResponse = (response: string) => {
    setAssistantResponse(response);

    // Update avatar emotion based on the assistant's response
    if (response.toLowerCase().includes('happy')) {
      setAvatarEmotion('happy');
    } else if (response.toLowerCase().includes('sad')) {
      setAvatarEmotion('sad');
    } else if (response.toLowerCase().includes('surprised')) {
      setAvatarEmotion('surprised');
    } else {
      setAvatarEmotion('neutral');
    }
  };

  // Determine which scene (emotion) to load for the avatar
  const handleAvatarScene = (emotion: string) => {
    switch (emotion) {
      case 'happy':
        return "https://prod.spline.design/epakEcRhRXjpKDWj/happy.splinecode";
      case 'sad':
        return "https://prod.spline.design/epakEcRhRXjpKDWj/sad.splinecode";
      case 'surprised':
        return "https://prod.spline.design/epakEcRhRXjpKDWj/surprised.splinecode";
      default:
        return "https://prod.spline.design/epakEcRhRXjpKDWj/neutral.splinecode";
    }
  };

  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Interactive 3D Avatar Voice Assistant</h1>

      {/* Display the Spline Avatar */}
      <div className="mb-4 w-full h-[500px]">
        <Spline scene={handleAvatarScene(avatarEmotion)} />
      </div>

      {/* Voice Assistant Component */}
      <AudioUploader onResponse={handleResponse} />

      {/* Display Assistant's Response */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Assistant Response:</h2>
        <p>{assistantResponse}</p>
      </div>
    </main>
  );
}
