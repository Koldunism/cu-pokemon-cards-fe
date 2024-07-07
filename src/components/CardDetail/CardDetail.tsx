import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CardDetail.module.css";

const CardDetail = () => {
  const { id } = useParams<Record<string, string>>();
  const [card, setCard] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`/api/cards/${id}`)
      .then((response) => setCard(response.data))
      .catch((error) => console.error("Error fetching card details:", error));
  }, [id]);

  if (!card) return <div>Loading...</div>;

  return (
    <div className="card-detail">
      <h2>{card.name}</h2>
      <p>{card.description}</p>
    </div>
  );
};

export default CardDetail;
