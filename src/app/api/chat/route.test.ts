import { NextResponse } from "next/server";
import { createMockNextRequest } from "../../../utils/testUtils";
import { POST } from "./route";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("POST /api/chat", () => {
  it("should return a response from AI model", async () => {
    const req = createMockNextRequest(JSON.stringify({ message: "Hello" }));

    const result = await POST(req as any);

    console.log(`result: ${result}`);

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        message: {
          role: "assistant",
          content: "You said: Hello",
        },
      },
      { status: 200 }
    );
  });
});
