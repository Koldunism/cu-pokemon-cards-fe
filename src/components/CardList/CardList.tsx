import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/card/${id}`);
  };

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <div key={card.id} onClick={() => handleCardClick(card.id)}>
          <Card
            id={card.id}
            name={card.name}
            hp={card.hp}
            type={card.type}
            expansion={card.expansion}
            rarity={card.rarity}
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
