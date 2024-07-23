import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const conversationId = url.searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json(
        { error: "Conversation ID is required" },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, content, role, conversation_id, user_id, created_at } = body;

    if (!conversation_id || !user_id || !created_at) {
      return NextResponse.json(
        { error: "conversationId, userId, and createdAt are required" },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        id,
        content,
        role,
        conversationId: conversation_id,
        userId: user_id,
        createdAt: created_at,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error creating message: ", error);
    return NextResponse.json(
      { error: "Error creating message" },
      { status: 500 }
    );
  }
}
