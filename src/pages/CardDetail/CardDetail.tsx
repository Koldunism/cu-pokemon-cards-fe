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

interface BattleResult {
  attackerWins: boolean;
  attackerDamage: number;
  defenderHP: number;
}

const CardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<Card | null>(null);
  const [opponentId, setOpponentId] = useState<string>("");
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [availablePokemon, setAvailablePokemon] = useState<Card[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`/cards/${id}`)
      .then((response) => {
        setCard(response.data.data);
      })
      .catch((error) => console.error("Error fetching card details:", error));
  }, [id]);

  useEffect(() => {
    axiosInstance
      .get("/cards")
      .then((response) => {
        setAvailablePokemon(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching available Pokémon:", error)
      );
  }, []);

  const handleBattle = () => {
    console.log(`ATTACKER : ${id}, DEFENDER: ${opponentId}`);
    axiosInstance
      .get(`/cards/battle`, {
        params: {
          attackerId: id,
          defenderId: opponentId,
        },
      })
      .then((response) => {
        console.log("response: ", response);
        setBattleResult(response.data);
      })
      .catch((error) => console.error("Error simulating battle:", error));
  };

  if (!card) return <div></div>;

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
          <select
            className={styles.battleSelect}
            value={opponentId}
            onChange={(e) => setOpponentId(e.target.value)}
          >
            <option value="">Select a Pokémon</option>
            {availablePokemon.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.name}
              </option>
            ))}
          </select>
          <button className={styles.battleButton} onClick={handleBattle}>
            BATTLE!
          </button>
          {battleResult && (
            <div className={styles.battleResult}>
              <p>
                {battleResult.attackerWins
                  ? "Attacker Wins!"
                  : "Defender Wins!"}
              </p>
              <p>Attacker Damage: {battleResult.attackerDamage}</p>
              <p>Defender remaining HP: {battleResult.defenderHP}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
