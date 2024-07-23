import prisma from "../../../../lib/prisma";
import { GET, POST } from "./route";

jest.mock("../../../../lib/prisma", () => ({
  user: {
    findUnique: jest.fn(),
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

describe("Users API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("should return user for a given email", async () => {
      const mockUser = { id: "1", email: "test@example.com" };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const url = new URL("http://localhost/api/users?email=test@example.com");
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json).toEqual(mockUser);
    });

    it("should return 400 if email is missing", async () => {
      const url = new URL("http://localhost/api/users");
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json).toEqual({ error: "Email is required" });
    });

    it("should return 500 on error", async () => {
      (prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new Error("Test Error")
      );

      const url = new URL("http://localhost/api/users?email=test@example.com");
      const req = new Request(url.toString());
      const res = await GET(req);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: "Internal Server Error" });
    });
  });

  describe("POST", () => {
    it("should create a new user", async () => {
      const mockUser = { id: "1", email: "test@example.com" };

      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const url = new URL("http://localhost/api/users");
      const req = new Request(url.toString(), {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com", id: "1" }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST(req);

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json).toEqual(mockUser);
    });

    it("should return 500 on error", async () => {
      (prisma.user.create as jest.Mock).mockRejectedValue(
        new Error("Test Error")
      );

      const url = new URL("http://localhost/api/users");
      const req = new Request(url.toString(), {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com", id: "1" }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST(req);

      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json).toEqual({ error: "Internal Server Error" });
    });
  });
});
