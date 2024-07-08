import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useNavigate: () => mockNavigate,
}));

const mockOnSearch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  // Resetear el mock de useLocation antes de cada prueba
  (useLocation as jest.Mock).mockReturnValue({ pathname: "/" });
});

test("renders Navbar component with title and filters", () => {
  render(
    <MemoryRouter>
      <Navbar onSearch={mockOnSearch} />
    </MemoryRouter>
  );

  expect(screen.getByText("Pokemon App")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Search by Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Search Expansion")).toBeInTheDocument();
  expect(screen.getByText("All Types")).toBeInTheDocument();
});

test("calls onSearch with correct params", () => {
  render(
    <MemoryRouter>
      <Navbar onSearch={mockOnSearch} />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Search by Name"), {
    target: { value: "Pikachu" },
  });
  fireEvent.change(screen.getByPlaceholderText("Search Expansion"), {
    target: { value: "Gen 1" },
  });
  fireEvent.change(screen.getByDisplayValue("All Types"), {
    target: { value: "Electric" },
  });

  const lastCall =
    mockOnSearch.mock.calls[mockOnSearch.mock.calls.length - 1][0];
  expect(lastCall).toEqual({
    searchName: "Pikachu",
    searchExpansion: "Gen 1",
    type: "Electric",
  });
});

test("navigates to home page on title click", () => {
  render(
    <MemoryRouter>
      <Navbar onSearch={mockOnSearch} />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("Pokemon App"));
  expect(mockNavigate).toHaveBeenCalledWith("/");
});

test("hides filters on detail page", () => {
  (useLocation as jest.Mock).mockReturnValue({ pathname: "/card/1" });

  render(
    <MemoryRouter>
      <Navbar onSearch={mockOnSearch} />
    </MemoryRouter>
  );

  expect(screen.getByText("Pokemon App")).toBeInTheDocument();
  expect(
    screen.queryByPlaceholderText("Search by Name")
  ).not.toBeInTheDocument();
  expect(
    screen.queryByPlaceholderText("Search Expansion")
  ).not.toBeInTheDocument();
  expect(screen.queryByText("All Types")).not.toBeInTheDocument();
});
