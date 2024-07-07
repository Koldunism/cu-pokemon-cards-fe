import React from "react";
import Card from "../Card/Card";
import styles from "./CardList.module.css";

interface Card {
  id: string;
  name: string;
  hp: number;
  type: string;
  expansion: string;
  rarity: string;
}

interface CardListProps {
  cards: Card[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <Card
          key={card.id}
          name={card.name}
          hp={card.hp}
          type={card.type}
          expansion={card.expansion}
          rarity={card.rarity}
        />
      ))}
    </div>
  );
};

export default CardList;
