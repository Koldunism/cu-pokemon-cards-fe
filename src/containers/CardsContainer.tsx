import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import CardComponent from '../components/CardComponent';
import { setCards } from '../store/cardsSlice';
import axiosInstance from '../api/axiosInstance';

const CardsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const cardsState = useSelector((state: RootState) => state.cards);
  const [limit] = useState(10); // Define el límite de cartas por página
  const [offset, setOffset] = useState(0); // Define el offset para la paginación
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axiosInstance.get('/cards', {
          params: { limit, offset },
        });
        dispatch(setCards(response.data.data));
        setHasNext(response.data.hasNext);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCards();
  }, [offset, dispatch, limit]);

  const loadMore = () => {
    setOffset(offset + limit);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {cardsState.cards.map((card, index) => (
        <CardComponent key={index} {...card} />
      ))}
      {hasNext && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default CardsContainer;
