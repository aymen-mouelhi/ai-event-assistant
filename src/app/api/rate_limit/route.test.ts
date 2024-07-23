import prisma from "../../../../lib/prisma";
import { GET, POST, PUT } from "./route";

jest.mock("../../../../lib/prisma", () => ({
  rateLimit: {
    findUnique: jest.fn(),
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

describe("Rate Limit API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("should return rate limit for a user", async () => {
      const mockRateLimit = {
        userId: "user1",
        messageCount: 10,
        resetTime: new Date(),
      };

      (prisma.rateLimit.findUnique as jest.Mock).mockResolvedValue(
        mockRateLimit
      );

      const url = new URL("http://localhost/api/rate_limit?userId=user1");
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json).toEqual(mockRateLimit);
    });

    it("should return 400 if userId is missing", async () => {
      const url = new URL("http://localhost/api/rate_limit");
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json).toEqual({ error: "User ID is required" });
    });

    it("should return 500 on error", async () => {
      (prisma.rateLimit.findUnique as jest.Mock).mockRejectedValue(
        new Error("Test Error")
      );

      const url = new URL("http://localhost/api/rate_limit?userId=user1");
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("POST", () => {
    it("should create a new rate limit", async () => {
      const mockRateLimit = {
        userId: "user1",
        messageCount: 10,
        resetTime: new Date(),
      };

      (prisma.rateLimit.create as jest.Mock).mockResolvedValue(mockRateLimit);

      const url = new URL("http://localhost/api/rate_limit");
      const req = new Request(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          userId: "user1",
          messageCount: 10,
          resetTime: new Date().toISOString(),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST(req);

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json).toEqual(mockRateLimit);
    });

    it("should return 500 on error", async () => {
      (prisma.rateLimit.create as jest.Mock).mockRejectedValue(
        new Error("Test Error")
      );

      const url = new URL("http://localhost/api/rate_limit");
      const req = new Request(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          userId: "user1",
          messageCount: 10,
          resetTime: new Date().toISOString(),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST(req);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("PUT", () => {
    it("should update a rate limit", async () => {
      const mockRateLimit = {
        userId: "user1",
        messageCount: 20,
        resetTime: new Date(),
      };

      (prisma.rateLimit.update as jest.Mock).mockResolvedValue(mockRateLimit);

      const url = new URL("http://localhost/api/rate_limit");
      const req = new Request(url.toString(), {
        method: "PUT",
        body: JSON.stringify({
          userId: "user1",
          messageCount: 20,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await PUT(req);

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json).toEqual(mockRateLimit);
    });

    it("should return 500 on error", async () => {
      (prisma.rateLimit.update as jest.Mock).mockRejectedValue(
        new Error("Test Error")
      );

      const url = new URL("http://localhost/api/rate_limit");
      const req = new Request(url.toString(), {
        method: "PUT",
        body: JSON.stringify({
          userId: "user1",
          messageCount: 20,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await PUT(req);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: "Internal Server Error" });
    });

    it("should return 400 if userId or messageCount is missing", async () => {
      const url = new URL("http://localhost/api/rate_limit");
      const req = new Request(url.toString(), {
        method: "PUT",
        body: JSON.stringify({
          userId: "",
          messageCount: null,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await PUT(req);

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json).toEqual({ error: "User ID and message count are required" });
    });
  });
});
