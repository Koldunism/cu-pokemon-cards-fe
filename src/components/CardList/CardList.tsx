import React from "react";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import styles from "./CardList.module.css";

interface Card {
  id: string;
  name: string;
  type: string;
  hp: number;
  rarity: string;
  expansion: string;
}

interface CardListProps {
  cards: Card[];
  onLoadMore: () => void;
  hasNext: boolean;
}

const CardList: React.FC<CardListProps> = ({ cards, onLoadMore, hasNext }) => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/card/${id}`);
  };

  return (
    <div className={styles.cardList}>
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
      <button
        className={styles.loadMoreButton}
        onClick={onLoadMore}
        disabled={!hasNext}
      >
        Load More
      </button>
    </div>
  );
};

export default CardList;
