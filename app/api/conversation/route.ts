import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User not authorized", { status: 401 });

    if (!messages) return new NextResponse("Messages are required.");

    const freeTrial = await checkApiLimit();

    if (!freeTrial)
      return new NextResponse("Free trial has expired", { status: 403 });

    if (!configuration.apiKey)
      return new NextResponse("OpenAI key is invalid.");

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    await incrementApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
