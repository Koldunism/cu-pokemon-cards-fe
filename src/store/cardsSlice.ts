import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Attack {
  name: string;
  power: number;
}

interface Card {
  id: number;
  name: string;
  type: string;
  hp: number;
  rarity: string;
  expansion: string;
  attacks: Attack[];
  weakness?: string;
  resistance?: string;
  defense?: number;
}

interface CardsState {
  cards: Card[];
}

const initialState: CardsState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<Card[]>) {
      state.cards = action.payload;
    },
  },
});

export const { setCards } = cardsSlice.actions;
export default cardsSlice.reducer;
