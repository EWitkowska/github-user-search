import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import UserList from "./UserList";

describe("UserList Component", () => {
  it("shows loading message when loading is true", () => {
    render(<UserList users={[]} loading={true} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders a list of users", () => {
    const testUsers = [
      { id: 1, login: "user1" },
      { id: 2, login: "user2" },
    ];

    render(<UserList users={testUsers} />);

    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
  });

  it("displays the pagination when there are more than 10 users", () => {
    const testUsers = Array.from(Array(20).keys()).map((i) => ({
      id: i + 1,
      login: `user${i + 1}`,
    }));

    render(<UserList users={testUsers} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("does not render the pagination when there are 10 or less users", () => {
    const testUsers = Array.from(Array(10).keys()).map((i) => ({
      id: i + 1,
      login: `user${i + 1}`,
    }));
    render(<UserList users={testUsers} />);

    expect(screen.queryAllByRole("navigation")).toHaveLength(0);

    testUsers.pop();
    expect(screen.queryAllByRole("navigation")).toHaveLength(0);
  });
});
