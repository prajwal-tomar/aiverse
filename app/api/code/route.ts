// Code API

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. Youre name is Nebula. You must answer only in markdown code snippets. Use code comments for elaborating what you're doing.",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authorized", { status: 401 });

    if (!messages) return new NextResponse("Messages are required.");

    if (!configuration.apiKey)
      return new NextResponse("OpenAI key is invalid.");

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
