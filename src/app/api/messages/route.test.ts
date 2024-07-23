/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../../../../lib/prisma";
import { GET, POST } from "./route";

jest.mock("../../../../lib/prisma", () => ({
  message: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      json: async () => data,
    })),
  },
}));

describe("Messages API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("should return messages for a conversation", async () => {
      const mockMessages = [
        { id: "1", content: "Message 1", conversationId: "conversation1" },
        { id: "2", content: "Message 2", conversationId: "conversation1" },
      ];

      (prisma.message.findMany as jest.Mock).mockResolvedValue(mockMessages);

      const url = new URL(
        "http://localhost/api/messages?conversationId=conversation1"
      );
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json).toEqual(mockMessages);
    });

    it("should return 400 if conversationId is missing", async () => {
      const url = new URL("http://localhost/api/messages");
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json).toEqual({ error: "Conversation ID is required" });
    });

    it("should return 500 on error", async () => {
      (prisma.message.findMany as jest.Mock).mockRejectedValue(
        new Error("Test Error")
      );

      const url = new URL(
        "http://localhost/api/messages?conversationId=conversation1"
      );
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("POST", () => {
    it("should create a new message", async () => {
      const mockMessage = {
        id: "1",
        content: "New Message",
        conversationId: "conversation1",
        userId: "user1",
      };

      (prisma.message.create as jest.Mock).mockResolvedValue(mockMessage);

      const url = new URL("http://localhost/api/messages");
      const req = new Request(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          id: "1",
          content: "New Message",
          role: "user",
          conversation_id: "conversation1",
          user_id: "user1",
          created_at: new Date().toISOString(),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST(req as any);

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json).toEqual(mockMessage);
    });

    it("should return 500 on error", async () => {
      (prisma.message.create as jest.Mock).mockRejectedValue(
        new Error("Test Error")
      );

      const url = new URL("http://localhost/api/messages");
      const req = new Request(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          id: "1",
          content: "New Message",
          role: "user",
          conversation_id: "conversation1",
          user_id: "user1",
          created_at: new Date().toISOString(),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST(req as any);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: "Error creating message" });
    });
  });
});
