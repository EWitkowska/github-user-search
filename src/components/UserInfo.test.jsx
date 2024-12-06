import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, describe, vi } from "vitest";
import UserInfo from "./UserInfo";

const testUser = {
  login: "test-user",
  avatar_url: "https://test.com/avatar.png",
  html_url: "https://test.com/test-user",
};

describe("UserList Component", () => {
  it("renders the user info correctly", () => {
    render(<UserInfo user={testUser} />);

    expect(screen.getByText("test-user")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /test-user/i })).toHaveAttribute(
      "src",
      testUser.avatar_url
    );
    expect(screen.getByRole("link", { name: /view profile/i })).toHaveAttribute(
      "href",
      testUser.html_url
    );
  });

  it("toggles show repos button and fetches repositories when clicked", async () => {
    const mockOnLoadRepos = vi.fn().mockResolvedValueOnce([
      { id: 1, name: "repo1" },
      { id: 2, name: "repo2" },
    ]);

    render(<UserInfo user={testUser} onLoadRepos={mockOnLoadRepos} />);

    const toggleButton = screen.getByRole("button", {
      name: /Show Repositories/i,
    });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent("Show Repositories");

    fireEvent.click(toggleButton);

    const repo1 = await screen.findByText("repo1");
    const repo2 = await screen.findByText("repo2");

    expect(repo1).toBeInTheDocument();
    expect(repo2).toBeInTheDocument();

    expect(mockOnLoadRepos).toHaveBeenCalledWith("test-user");

    expect(toggleButton).toHaveTextContent("Hide Repositories");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Show Repositories");

    screen.debug();

    expect(screen.queryByText("repo1")).not.toBeInTheDocument();
    expect(screen.queryByText("repo2")).not.toBeInTheDocument();
  });
});
