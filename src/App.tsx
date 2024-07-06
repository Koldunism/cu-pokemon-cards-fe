import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CardsContainer from './containers/CardsContainer';
import CardDetailContainer from './containers/CardDetailContainer';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CardsContainer />} />
      <Route path="/cards/:id" element={<CardDetailContainer />} />
    </Routes>
  );
};

export default App;
