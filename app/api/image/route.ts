// Code API

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, amount, resolution } = body;
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authorized", { status: 401 });

    if (!prompt) return new NextResponse("Prompt is required.");
    if (!amount) return new NextResponse("Amount is required.");
    if (!resolution) return new NextResponse("Resolution is required.");

    if (!configuration.apiKey)
      return new NextResponse("OpenAI key is invalid.");

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
