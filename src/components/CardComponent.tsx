import React from 'react';
import { CardProps } from '../types';
import './CardComponent.css';

const CardComponent: React.FC<CardProps> = ({ id, name, hp, type, expansion, rarity, onCardClick }) => {
  return (
    <div className="card" onClick={() => onCardClick(id)}>
      <div className="card-header">
        <span className="card-name">{name}</span>
        <span className="card-hp">{hp} HP</span>
      </div>
      <div className="card-image">
        <img src={`https://img.pokemondb.net/artwork/${name.toLowerCase()}.jpg`} alt={name} />
      </div>
      <div className="card-info">
        <div className="card-info-item">Type: {type}</div>
        <div className="card-info-item">Expansion: {expansion}</div>
        <div className="card-info-item">Rarity: {rarity}</div>
      </div>
    </div>
  );
};

export default CardComponent;
