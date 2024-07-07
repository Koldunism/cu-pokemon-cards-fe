import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import CardList from "../../components/CardList/CardList";
import styles from "./Home.module.css";

interface Card {
  id: string;
  name: string;
  hp: number;
  type: string;
  expansion: string;
  rarity: string;
}

interface HomeProps {
  searchParams: {
    searchName: string;
    searchExpansion: string;
    type: string;
  };
}

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/cards")
      .then((response) => {
        setCards(response.data.data);
        setFilteredCards(response.data.data);
      })
      .catch((error) => console.error("Error fetching cards:", error));
  }, []);

  useEffect(() => {
    const filtered = cards.filter(
      (card) =>
        (searchParams.searchName
          ? card.name
              .toLowerCase()
              .includes(searchParams.searchName.toLowerCase())
          : true) &&
        (searchParams.searchExpansion
          ? card.expansion
              .toLowerCase()
              .includes(searchParams.searchExpansion.toLowerCase())
          : true) &&
        (searchParams.type
          ? card.type.toLowerCase() === searchParams.type.toLowerCase()
          : true)
    );
    setFilteredCards(filtered);
  }, [searchParams, cards]);

  return (
    <div className={styles.home}>
      <CardList cards={filteredCards} />
    </div>
  );
};

export default Home;
