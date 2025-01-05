import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not defined" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("document") as File;
    const annotationType = formData.get("annotationType") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No document uploaded" },
        { status: 400 }
      );
    }

    if (!annotationType) {
      return NextResponse.json(
        { error: "Annotation type is not specified" },
        { status: 400 }
      );
    }

    // Read file as base64
    const arrayBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(arrayBuffer).toString("base64");

    // Initialize Google AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate annotation based on type
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: file.type,
          data: base64File,
        },
      },
      {
        text: `Generate a ${annotationType} for this document.`,
      },
    ]);

    return NextResponse.json({
      annotation: result.response.text(),
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        error: "Annotation generation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
