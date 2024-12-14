"use client";

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

interface Message {
  text: string;
  role: "user" | "bot";
  timestamp: Date;
}

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
}

export default function Home() {
  const [message, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [chat, setChat] = useState<any>(null);
  const [theme, setTheme] = useState<string>("light");
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "AIzaSyDqsE7uncV-kb8G4ZfHrp38d0_xU_bSkcg";
  const MODEL_NAME = "gemini-1.5-flash";

  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  // realplayer.me
  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = genAI.getGenerativeModel({ model: MODEL_NAME }).startChat({
          generationConfig,
          safetySettings,
          history: message.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
          })),
        });
        setChat(newChat);
      } catch (error) {
        setError("Failed to initialize chat. Please try again.");
      }
    };

    initChat();
  }, []);


  const handleSendMessage = async () => {
    try {
      const userMessage: Message = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      if (chat) {
        const result = await chat.sendMessage(userInput); // error
        console.log("result", result.response.text());

        const botMessage: Message = {
          text: result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };


        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");
      console.log("error: ", error)
    }
  };

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const getThemeColors = (): ThemeColors => {
    switch (theme) {
      case "light":
        return {
          primary: "bg-white",
          secondary: "bg-gray-100",
          accent: "bg-blue-500",
          text: "text-gray-800",
        };
      case "dark":
        return {
          primary: "bg-gray-900",
          secondary: "bg-gray-800",
          accent: "bg-yellow-500",
          text: "text-gray-100",
        };
      default:
        return {
          primary: "bg-white",
          secondary: "bg-gray-100",
          accent: "bg-blue-500",
          text: "text-gray-800",
        };
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const { primary, secondary, accent, text } = getThemeColors();

  return (
    <div className={`flex flex-col h-screen p-4 ${primary}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-2xl font-bold ${text}`}>Conva AI</h1>
        <div className="flex space-x-2">
          <label htmlFor="theme" className={`text-sm ${text}`}>
            Theme:
          </label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className={`p-1 rounded-md border ${text}`}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div className={`flex-1 overflow-y-auto ${secondary} rounded-md p-2`}>
        {message.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`rounded-lg ${msg.role === "user" ? `${accent} text-white p-2` : `${primary} ${text}`
                }`}
            >
              {msg.role === "bot" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </span>
            <p className={`text-xs ${text} mt-1`}>
              {msg.role === "bot" ? "Bot" : "You"} - {msg.timestamp.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className={`flex-1 p-2 rounded-l-md border-t border-b border-l focus:outline-none focus:border-${accent}`}
        />
        <button
          onClick={handleSendMessage}
          className={`p-2 ${accent} text-white rounded-r-md hover:bg-opacity-80 focus:outline-none`}
        >
          Send
        </button>
      </div>
    </div>
  );
}
