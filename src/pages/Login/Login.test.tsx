import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axiosInstance from "../../services/api";
import Login from "./Login";

jest.mock("../../services/api", () => {
  return {
    post: jest.fn(),
  };
});

const mockSetToken = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders Login component with input fields and button", () => {
  render(
    <MemoryRouter>
      <Login setToken={mockSetToken} />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

test("calls setToken and navigates to home on successful login", async () => {
  (axiosInstance.post as jest.Mock).mockResolvedValueOnce({
    data: { token: "test-token" },
  });

  render(
    <MemoryRouter>
      <Login setToken={mockSetToken} />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "testpassword" },
  });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(mockSetToken).toHaveBeenCalledWith("test-token");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

test("shows error message on failed login", async () => {
  (axiosInstance.post as jest.Mock).mockRejectedValueOnce(
    new Error("Login failed")
  );

  render(
    <MemoryRouter>
      <Login setToken={mockSetToken} />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "testpassword" },
  });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(
      screen.getByText("Login failed. Please check your username and password.")
    ).toBeInTheDocument();
  });
});
