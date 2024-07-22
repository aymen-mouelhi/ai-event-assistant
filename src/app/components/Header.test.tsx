import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders the header", () => {
    render(<Header />);
    expect(screen.getByText(/ai event assistant/i)).toBeInTheDocument();
  });
});
