import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axiosInstance from "../../services/api";
import CardDetail from "./CardDetail";

jest.mock("../../services/api", () => ({
  get: jest.fn(),
}));

const mockAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

const mockCard = {
  id: "1",
  name: "Pikachu",
  hp: 50,
  type: "Electric",
  expansion: "Base Set",
  rarity: "Common",
};

const mockAvailablePokemon = [
  {
    id: "1",
    name: "Pikachu",
    hp: 50,
    type: "Electric",
    expansion: "Base Set",
    rarity: "Common",
  },
  {
    id: "2",
    name: "Charmander",
    hp: 40,
    type: "Fire",
    expansion: "Base Set",
    rarity: "Common",
  },
];

const mockWinBattleResult = {
  attackerWins: true,
  attackerDamage: 20,
  defenderHP: -20,
};
const mockLossBattleResult = {
  attackerWins: false,
  attackerDamage: 20,
  defenderHP: 20,
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {}); // Mockear console.error
});

afterEach(() => {
  jest.restoreAllMocks(); // Restaurar mocks después de cada prueba
});

test("renders CardDetail component with card details", async () => {
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockCard } });
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockAvailablePokemon } });

  render(
    <MemoryRouter initialEntries={["/card/1"]}>
      <Routes>
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: /Pikachu/i })
    ).toBeInTheDocument();
  });
});

test("loads available Pokemon for battle", async () => {
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockCard } });
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockAvailablePokemon } });

  render(
    <MemoryRouter initialEntries={["/card/1"]}>
      <Routes>
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Select a Pokémon")).toBeInTheDocument();
    expect(
      screen.getByText("Pikachu", { selector: "option" })
    ).toBeInTheDocument();
    expect(screen.getByText("Charmander")).toBeInTheDocument();
  });
});

test("simulates battle win correctly", async () => {
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockCard } });
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockAvailablePokemon } });
  mockAxios.get.mockResolvedValueOnce({ data: mockWinBattleResult });

  render(
    <MemoryRouter initialEntries={["/card/1"]}>
      <Routes>
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: /Pikachu/i })
    ).toBeInTheDocument();
  });

  fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });
  fireEvent.click(screen.getByText("BATTLE!"));

  await waitFor(() => {
    expect(screen.getByText("Attacker Wins!")).toBeInTheDocument();
    expect(screen.getByText("Attacker Damage: 20")).toBeInTheDocument();
    expect(screen.getByText("Defender remaining HP: -20")).toBeInTheDocument();
  });
});
test("simulates battle loss correctly", async () => {
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockCard } });
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockAvailablePokemon } });
  mockAxios.get.mockResolvedValueOnce({ data: mockLossBattleResult });

  render(
    <MemoryRouter initialEntries={["/card/1"]}>
      <Routes>
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: /Pikachu/i })
    ).toBeInTheDocument();
  });

  fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });
  fireEvent.click(screen.getByText("BATTLE!"));

  await waitFor(() => {
    expect(screen.getByText("Defender Wins!")).toBeInTheDocument();
    expect(screen.getByText("Attacker Damage: 20")).toBeInTheDocument();
    expect(screen.getByText("Defender remaining HP: 20")).toBeInTheDocument();
  });
});

test("handles error in fetchCardDetails", async () => {
  mockAxios.get.mockRejectedValueOnce(new Error("Network error"));
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockAvailablePokemon } });

  render(
    <MemoryRouter initialEntries={["/card/1"]}>
      <Routes>
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching card details:",
      expect.any(Error)
    );
  });
});

test("handles error in fetchAvailablePokemon", async () => {
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockCard } });
  mockAxios.get.mockRejectedValueOnce(new Error("Network error"));

  render(
    <MemoryRouter initialEntries={["/card/1"]}>
      <Routes>
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching available Pokémon:",
      expect.any(Error)
    );
  });
});

test("handles error in handleBattle", async () => {
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockCard } });
  mockAxios.get.mockResolvedValueOnce({ data: { data: mockAvailablePokemon } });
  mockAxios.get.mockRejectedValueOnce(new Error("Network error"));

  render(
    <MemoryRouter initialEntries={["/card/1"]}>
      <Routes>
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: /Pikachu/i })
    ).toBeInTheDocument();
  });

  fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });
  fireEvent.click(screen.getByText("BATTLE!"));

  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith(
      "Error simulating battle:",
      expect.any(Error)
    );
  });
});
