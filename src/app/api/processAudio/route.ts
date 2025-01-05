import { NextApiRequest, NextApiResponse } from "next";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const fileManager = new GoogleAIFileManager(process.env.API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { audio } = req.body;

    // Upload and process the audio file
    const uploadResult = await fileManager.uploadFile(audio.path, {
      mimeType: "audio/mp3",
      displayName: "Uploaded Audio",
    });

    // Wait for processing
    let uploadedFile = await fileManager.getFile(uploadResult.file.name);
    while (uploadedFile.state === FileState.PROCESSING) {
      await new Promise((resolve) => setTimeout(resolve, 10_000)); // Sleep for 10 seconds
      uploadedFile = await fileManager.getFile(uploadResult.file.name);
    }

    if (uploadedFile.state === FileState.FAILED) {
      throw new Error("File processing failed.");
    }

    // Process audio and return assistant response
    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "Tell me about this audio clip.",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    return res.status(200).json({ message: result.response.text });
  } catch (error) {
    console.error("Error processing audio:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
