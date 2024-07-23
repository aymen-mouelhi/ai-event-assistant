import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const conversations = await prisma.conversation.findMany({
      where: { userId },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { userId, name } = data;

    console.log("Received data in POST request:", data);
    console.log("userId:", userId);
    console.log("name:", name);

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        name,
      },
    });

    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { conversationId, name } = data;

    const conversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: { name },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
