import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import RepoList from "./RepoList";

describe("RepoList Component", () => {
  it("renders an array of repos when they are available", () => {
    const testRepos = [
      { id: 1, name: "repo1" },
      { id: 2, name: "repo2" },
      { id: 3, name: "repo3" },
    ];

    render(<RepoList repos={testRepos} />);

    expect(screen.getByText("repo1")).toBeInTheDocument();
    expect(screen.getByText("repo2")).toBeInTheDocument();
    expect(screen.getByText("repo3")).toBeInTheDocument();
  });

  it("displays a message when repo list is empty", () => {
    render(<RepoList repos={[]} />);

    expect(screen.getByText("No repositories found")).toBeInTheDocument();
  });

  it("renders the pagination when there are more than 10 repos", () => {
    const testRepos = Array.from(Array(20).keys()).map((i) => ({
      id: i + 1,
      name: `repo${i + 1}`,
    }));

    render(<RepoList repos={testRepos} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("does not render the pagination when there are 10 or less repos", () => {
    const testRepos = Array.from(Array(10).keys()).map((i) => ({
      id: i + 1,
      name: `repo${i + 1}`,
    }));

    render(<RepoList repos={testRepos} />);

    expect(screen.queryAllByRole("navigation")).toHaveLength(0);

    testRepos.pop();
    expect(screen.queryAllByRole("navigation")).toHaveLength(0);
  });
});
