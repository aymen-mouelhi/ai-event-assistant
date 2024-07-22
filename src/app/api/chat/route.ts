import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  // Simulate a response from an AI model
  const responseMessage = {
    role: "assistant",
    content: `You said: ${message}`,
  };

  return NextResponse.json({ message: responseMessage }, { status: 200 });
}
