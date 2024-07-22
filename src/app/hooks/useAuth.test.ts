import { useAuth } from "../hooks/useAuth";

jest.mock("../../utils/supabaseClient", () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  },
}));

describe("useAuth", () => {
  it("should be defined", () => {
    expect(useAuth).toBeDefined();
  });
});
