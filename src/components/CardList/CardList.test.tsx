import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CardList from "./CardList";
import { act } from "react"; // Importar act desde react

const cards = [
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
];

// Configurar el mock de useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders CardList component with cards", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <CardList cards={cards} onLoadMore={() => {}} hasNext={true} />
      </MemoryRouter>
    );
  });

  expect(screen.getByText("Pikachu")).toBeInTheDocument();
  expect(screen.getByText("Charmander")).toBeInTheDocument();
  expect(screen.getByText("Load More")).toBeInTheDocument();
});

test("calls onLoadMore when Load More button is clicked", async () => {
  const onLoadMore = jest.fn();
  await act(async () => {
    render(
      <MemoryRouter>
        <CardList cards={cards} onLoadMore={onLoadMore} hasNext={true} />
      </MemoryRouter>
    );
  });

  fireEvent.click(screen.getByText("Load More"));
  expect(onLoadMore).toHaveBeenCalledTimes(1);
});

test("disables Load More button when hasNext is false", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <CardList cards={[]} onLoadMore={() => {}} hasNext={false} />
      </MemoryRouter>
    );
  });

  expect(screen.getByText("Load More")).toBeDisabled();
});

test("navigates to card detail page on card click", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <CardList cards={cards} onLoadMore={() => {}} hasNext={true} />
      </MemoryRouter>
    );
  });

  fireEvent.click(screen.getByText("Pikachu"));
  expect(mockNavigate).toHaveBeenCalledWith("/card/1");
});
