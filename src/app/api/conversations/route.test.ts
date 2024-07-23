import prisma from "../../../../lib/prisma";
import { GET, POST, PUT } from "./route";

jest.mock("../../../../lib/prisma", () => ({
  conversation: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
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

describe("Conversations API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("should return conversations for a user", async () => {
      const mockConversations = [{ id: "1", name: "Conversation 1" }];

      (prisma.conversation.findMany as jest.Mock).mockResolvedValue(
        mockConversations
      );

      const url = new URL("http://localhost/api/conversations?userId=user1");
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json).toEqual(mockConversations);
    });

    it("should return 400 if userId is missing", async () => {
      const url = new URL("http://localhost/api/conversations");
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json).toEqual({ error: "User ID is required" });
    });

    it("should return 500 on error", async () => {
      (prisma.conversation.findMany as jest.Mock).mockRejectedValue(
        new Error("Test Error")
      );

      const url = new URL("http://localhost/api/conversations?userId=user1");
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("POST", () => {
    it("should create a new conversation", async () => {
      const mockConversation = {
        id: "1",
        userId: "user1",
        name: "New Conversation",
      };

      (prisma.conversation.create as jest.Mock).mockResolvedValue(
        mockConversation
      );

      const url = new URL("http://localhost/api/conversations");
      const req = new Request(url.toString(), {
        method: "POST",
        body: JSON.stringify({ userId: "user1", name: "New Conversation" }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST(req);

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json).toEqual(mockConversation);
    });

    it("should return 500 on error", async () => {
      (prisma.conversation.create as jest.Mock).mockRejectedValue(
        new Error("Test Error")
      );

      const url = new URL("http://localhost/api/conversations");
      const req = new Request(url.toString(), {
        method: "POST",
        body: JSON.stringify({ userId: "user1", name: "New Conversation" }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST(req);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("PUT", () => {
    it("should update a conversation name", async () => {
      const mockConversation = { id: "1", name: "Updated Conversation" };

      (prisma.conversation.update as jest.Mock).mockResolvedValue(
        mockConversation
      );

      const url = new URL("http://localhost/api/conversations");
      const req = new Request(url.toString(), {
        method: "PUT",
        body: JSON.stringify({
          conversationId: "1",
          name: "Updated Conversation",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await PUT(req);

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json).toEqual(mockConversation);
    });

    it("should return 500 on error", async () => {
      (prisma.conversation.update as jest.Mock).mockRejectedValue(
        new Error("Test Error")
      );

      const url = new URL("http://localhost/api/conversations");
      const req = new Request(url.toString(), {
        method: "PUT",
        body: JSON.stringify({
          conversationId: "1",
          name: "Updated Conversation",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await PUT(req);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: "Internal Server Error" });
    });
  });
});
