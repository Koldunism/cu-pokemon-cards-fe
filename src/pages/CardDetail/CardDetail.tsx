import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/api";
import Card from "../../components/Card/Card";
import styles from "./CardDetail.module.css";

interface Card {
  id: string;
  name: string;
  hp: number;
  type: string;
  expansion: string;
  rarity: string;
  description?: string;
}

const CardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`/cards/${id}`)
      .then((response) => {
        setCard(response.data.data);
      })
      .catch((error) => console.error("Error fetching card details:", error));
  }, [id]);

  if (!card) return <div>Loading...</div>;

  return (
    <div className={styles.cardDetail}>
      <h1>{card.name}</h1>
      <div className={styles.cardContainer}>
        <Card
          id={card.id}
          name={card.name}
          hp={card.hp}
          type={card.type}
          expansion={card.expansion}
          rarity={card.rarity}
        />
        <div className={styles.vsCircle}>VS</div>
        <div className={styles.battleSection}>
          <h2>Battle with:</h2>
          <select className={styles.battleSelect}>
            <option value="pokemon1">Pokemon 1</option>
            <option value="pokemon2">Pokemon 2</option>
          </select>
          <button className={styles.battleButton}>BATTLE!</button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
