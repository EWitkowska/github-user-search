import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import Header from "./Header";

describe("Header Component", () => {
  it("renders component correctly", () => {
    render(<Header />);

    const text = screen.getByText("GitHub User Search");
    expect(text).toBeInTheDocument();
  });
});
