import { GET } from "./route";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      json: async () => data,
    })),
  },
}));

describe("Health API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status ok", async () => {
    const url = new URL("http://localhost/api/health");
    const req = new Request(url.toString());
    const res = await GET(req as any);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ status: "ok", message: "Server is healthy" });
  });
});
