import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, describe, vi } from "vitest";
import Search from "./Search";

const mockOnSearch = vi.fn();

describe("Search Component", () => {
  it("updates the input value on change", () => {
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Find GitHub users");
    fireEvent.change(input, { target: { value: "user1" } });

    expect(input.value).toBe("user1");
  });

  it("calls onSearch when the button is clicked", () => {
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Find GitHub users");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "user1" } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith("user1");
  });

  it("calls onSearch when Enter is pressed", () => {
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Find GitHub users");

    fireEvent.change(input, { target: { value: "user1" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockOnSearch).toHaveBeenCalledWith("user1");
  });

  it("displays error message when error is passed", () => {
    render(<Search error="Error fetching users" />);

    const errorMessage = screen.getByText("Error fetching users");

    expect(errorMessage).toBeInTheDocument();
  });
});
