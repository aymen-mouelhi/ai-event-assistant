/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import { createMockNextRequest } from "../../../utils/testUtils";
import { POST } from "./route";

jest.mock("../../../utils/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithOtp: jest.fn().mockResolvedValue({ error: null }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
    },
  },
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("POST /api/auth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle login requests", async () => {
    const req = createMockNextRequest(
      JSON.stringify({ email: "test@example.com" })
    );

    await POST(req as any);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: "Check your email for the login link!" },
      { status: 200 }
    );
  });

  it("should handle logout requests", async () => {
    const req = createMockNextRequest(JSON.stringify({ type: "logout" }));
    await POST(req as any);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: "Logged out successfully!" },
      { status: 200 }
    );
  });

  it("should handle invalid requests", async () => {
    const req = createMockNextRequest(JSON.stringify({}));
    await POST(req as any);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Email is required" },
      { status: 400 }
    );
  });
});
