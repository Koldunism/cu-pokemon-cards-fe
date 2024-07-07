import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  name: string;
  hp: number;
  type: string;
  expansion: string;
  rarity: string;
}

const Card: React.FC<CardProps> = ({ name, hp, type, expansion, rarity }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardName}>{name}</span>
        <span className={styles.cardHP}>HP: {hp}</span>
      </div>
      <div className={styles.cardImage}>
        <img
          src={`https://img.pokemondb.net/artwork/${name.toLowerCase()}.jpg`}
          alt={name}
        />
      </div>
      <div className={styles.cardDetails}>
        <p>Type: {type}</p>
        <p>Expansion: {expansion}</p>
        <p>Rarity: {rarity}</p>
      </div>
    </div>
  );
};

export default Card;
