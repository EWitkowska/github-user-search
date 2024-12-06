import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import RepoInfo from "./RepoInfo";

describe("RepoList Component", () => {
  it("renders all repo details", () => {
    const testRepo = {
      id: 1,
      name: "repo1",
      description: "test-repo",
      stargazers_count: 10,
      forks_count: 5,
      language: "Ruby",
    };

    render(<RepoInfo repo={testRepo} />);

    expect(screen.getByText(testRepo.name)).toBeInTheDocument();
    expect(screen.getByText(testRepo.description)).toBeInTheDocument();
    expect(
      screen.getByText(testRepo.stargazers_count.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(testRepo.forks_count.toString())
    ).toBeInTheDocument();
    expect(screen.getByText(testRepo.language)).toBeInTheDocument();
  });

  it("renders repo details when some values are missing", () => {
    const testRepo = {
      id: 2,
      name: "repo2",
      description: null,
      stargazers_count: 10,
      forks_count: 15,
      language: null,
    };

    render(<RepoInfo repo={testRepo} />);

    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
    expect(screen.getByText("No Data")).toBeInTheDocument();
  });
});
