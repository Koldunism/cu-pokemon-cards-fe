import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axiosInstance from "../../services/api";
import Home from "./Home";

jest.mock("../../services/api", () => {
  return {
    get: jest.fn(),
  };
});

const mockAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

const searchParams = {
  searchName: "",
  searchExpansion: "",
  type: "",
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {}); // Mockear console.error
});

afterEach(() => {
  jest.restoreAllMocks(); // Restaurar mocks después de cada prueba
});

test("renders Home component with CardList", async () => {
  mockAxios.get.mockResolvedValueOnce({
    data: {
      data: [
        {
          id: "1",
          name: "Pikachu",
          type: "Electric",
          hp: 50,
          rarity: "Common",
          expansion: "Base Set",
        },
        {
          id: "2",
          name: "Charmander",
          type: "Fire",
          hp: 40,
          rarity: "Common",
          expansion: "Base Set",
        },
      ],
      hasNext: true,
    },
  });

  render(
    <MemoryRouter>
      <Home searchParams={searchParams} />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("Charmander")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });
});

test("fetches and displays more cards when Load More is clicked", async () => {
  mockAxios.get.mockResolvedValueOnce({
    data: {
      data: [
        {
          id: "1",
          name: "Pikachu",
          type: "Electric",
          hp: 50,
          rarity: "Common",
          expansion: "Base Set",
        },
      ],
      hasNext: true,
    },
  });

  render(
    <MemoryRouter>
      <Home searchParams={searchParams} />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
  });

  mockAxios.get.mockResolvedValueOnce({
    data: {
      data: [
        {
          id: "2",
          name: "Charmander",
          type: "Fire",
          hp: 40,
          rarity: "Common",
          expansion: "Base Set",
        },
      ],
      hasNext: false,
    },
  });

  fireEvent.click(screen.getByText("Load More"));

  await waitFor(() => {
    expect(screen.getByText("Charmander")).toBeInTheDocument();
  });
});

test("applies search filters correctly", async () => {
  mockAxios.get.mockResolvedValueOnce({
    data: {
      data: [
        {
          id: "1",
          name: "Pikachu",
          type: "Electric",
          hp: 50,
          rarity: "Common",
          expansion: "Base Set",
        },
        {
          id: "2",
          name: "Charmander",
          type: "Fire",
          hp: 40,
          rarity: "Common",
          expansion: "Base Set",
        },
        {
          id: "3",
          name: "Squirtle",
          type: "Water",
          hp: 45,
          rarity: "Common",
          expansion: "Base Set",
        },
      ],
      hasNext: false,
    },
  });

  const searchParamsWithFilters = {
    searchName: "Char",
    searchExpansion: "Base Set",
    type: "Fire",
  };

  render(
    <MemoryRouter>
      <Home searchParams={searchParamsWithFilters} />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.queryByText("Pikachu")).not.toBeInTheDocument();
    expect(screen.getByText("Charmander")).toBeInTheDocument();
    expect(screen.queryByText("Squirtle")).not.toBeInTheDocument();
  });
});

test("handles error in fetchCards", async () => {
  mockAxios.get.mockRejectedValueOnce(new Error("Network error"));

  render(
    <MemoryRouter>
      <Home searchParams={searchParams} />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching cards:",
      expect.any(Error)
    );
  });
});
