import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import CardList from "../../components/CardList/CardList";
import styles from "./Home.module.css";

interface Card {
  id: string; // Asegurarnos de que el tipo sea string como en el backend
  name: string;
  type: string;
  hp: number;
  rarity: string;
  expansion: string;
}

interface HomeProps {
  searchParams: {
    searchName: string;
    searchExpansion: string;
    type: string;
  };
}

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [limit, setLimit] = useState(4);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const fetchCards = async (limit: number, offset: number) => {
    try {
      const response = await axiosInstance.get("/cards", {
        params: {
          limit,
          offset,
        },
      });

      setAllCards((prevCards) => [...prevCards, ...response.data.data]);
      setOffset(offset + limit);
      setHasNext(response.data.hasNext);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    setAllCards([]); // Clear the current cards
    setOffset(0); // Reset the offset
    fetchCards(limit, 0); // Fetch the first page of cards
  }, []);

  const filteredCards = allCards.filter((card) => {
    return (
      card.name.toLowerCase().includes(searchParams.searchName.toLowerCase()) &&
      card.expansion
        .toLowerCase()
        .includes(searchParams.searchExpansion.toLowerCase()) &&
      (searchParams.type
        ? card.type.toLowerCase() === searchParams.type.toLowerCase()
        : true)
    );
  });

  return (
    <div className={styles.home}>
      <CardList
        cards={filteredCards}
        onLoadMore={() => fetchCards(limit, offset)}
        hasNext={hasNext}
      />
    </div>
  );
};

export default Home;
