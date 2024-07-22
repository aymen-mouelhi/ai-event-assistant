import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LogoutButton from "./LogoutButton";

describe("LogoutButton", () => {
  it("renders a logout button", () => {
    render(<LogoutButton />);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});
