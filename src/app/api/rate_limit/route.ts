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

    const rateLimit = await prisma.rateLimit.findUnique({
      where: { userId },
    });

    return NextResponse.json(rateLimit);
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
    const { userId, messageCount, resetTime } = data;

    const rateLimit = await prisma.rateLimit.create({
      data: {
        userId,
        messageCount,
        resetTime,
      },
    });

    return NextResponse.json(rateLimit, { status: 201 });
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
    const { userId, messageCount } = data;

    if (!userId || messageCount === undefined) {
      return NextResponse.json(
        { error: "User ID and message count are required" },
        { status: 400 }
      );
    }

    const rateLimit = await prisma.rateLimit.update({
      where: { userId },
      data: {
        messageCount,
      },
    });

    return NextResponse.json(rateLimit);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
