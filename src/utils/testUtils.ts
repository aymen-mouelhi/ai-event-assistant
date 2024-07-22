// src/utils/testUtils.ts
export function createMockNextRequest(
  body: string,
  method = "POST",
  url = "http://localhost:3001/api/auth"
) {
  return {
    method,
    url,
    json: async () => JSON.parse(body),
    headers: {
      get: (header: string) => {
        if (header === "content-type") return "application/json";
        return null;
      },
    },
  };
}

export function createMockNextResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
}
