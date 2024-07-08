import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

test("renders Card component with correct props", () => {
  const { getByText, getByAltText } = render(
    <Card
      id="1"
      name="Pikachu"
      hp={50}
      type="Electric"
      expansion="Base Set"
      rarity="Common"
    />
  );

  expect(getByText("Pikachu")).toBeInTheDocument();
  expect(getByText("HP: 50")).toBeInTheDocument();
  expect(getByText("Type: Electric")).toBeInTheDocument();
  expect(getByText("Expansion: Base Set")).toBeInTheDocument();
  expect(getByText("Rarity: Common")).toBeInTheDocument();
  expect(getByAltText("Pikachu")).toBeInTheDocument();
});
