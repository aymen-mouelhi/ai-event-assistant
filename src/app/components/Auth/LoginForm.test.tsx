import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginForm", () => {
  it("renders a login form", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<LoginForm />);

    expect(screen.getByText(/continue/i)).toBeInTheDocument();
  });
});
