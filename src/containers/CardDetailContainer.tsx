import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import CardComponent from '../components/CardComponent';
import { setCards } from '../store/cardsSlice';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './CardsContainer.css'; // Importar los estilos

const CardsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardsState = useSelector((state: RootState) => state.cards);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [filters, setFilters] = useState<{ name?: string; expansion?: string; type?: string }>({});

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const params: { [key: string]: any } = { limit, offset };

        // Add filters to params if they exist
        if (filters.name) params.name = `%${filters.name}%`; // Using % for partial match
        if (filters.expansion) params.expansion = filters.expansion;
        if (filters.type) params.type = filters.type;

        const response = await axiosInstance.get('/cards', { params });
        dispatch(setCards(response.data.data));
        setHasNext(response.data.hasNext);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCards();
  }, [offset, dispatch, limit, filters]);

  const loadMore = () => {
    setOffset(offset + limit);
  };

  const handleCardClick = (id: number) => {
    navigate(`/cards/${id}`);
  };

  const handleFilterChange = (newFilters: { name?: string; expansion?: string; type?: string }) => {
    setFilters(newFilters);
    setOffset(0); // reset offset when filters change
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar onFilterChange={handleFilterChange} />
      <div className="card-grid">
        {cardsState.cards.map((card) => (
          <CardComponent key={card.id} {...card} onCardClick={() => handleCardClick(card.id)} />
        ))}
      </div>
      {hasNext && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default CardsContainer;
