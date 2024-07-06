export interface CardProps {
  id: number;
  name: string;
  hp: number;
  type: string;
  expansion: string;
  rarity: string;
  onCardClick: (id: number) => void;
}
