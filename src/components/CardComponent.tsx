import React from 'react';
import './CardComponent.css';

interface Attack {
  name: string;
  power: number;
}

interface CardProps {
  name: string;
  type: string;
  hp: number;
  rarity: string;
  expansion: string;
  attacks: Attack[];
  weakness?: string;
  resistance?: string;
}

const CardComponent: React.FC<CardProps> = ({
  name,
  type,
  hp,
  rarity,
  expansion,
  attacks,
  weakness,
  resistance
}) => {
  return (
    <div className="card">
      <div className="card-header">
        {name} - {type}
      </div>
      <div className="card-body">
        <p>HP: {hp}</p>
        <p>Rarity: {rarity}</p>
        <p>Expansion: {expansion}</p>
        {weakness && <p>Weakness: {weakness}</p>}
        {resistance && <p>Resistance: {resistance}</p>}
        <div className="card-attacks">
          <h4>Attacks:</h4>
          {attacks.map((attack, index) => (
            <div key={index} className="card-attack">
              <p>{attack.name} - Power: {attack.power}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
