import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onFilterChange: (filters: { name: string; expansion: string; type: string }) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFilterChange }) => {
  const [name, setName] = useState('');
  const [expansion, setExpansion] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({ name, expansion, type });
    }, 300); // debounce delay
    return () => clearTimeout(timeoutId);
  }, [name, expansion, type]);

  return (
    <nav className="navbar">
      <h1 className="navbar-title">PokemonApp</h1>
      <input
        type="text"
        placeholder="Search by Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search Expansion"
        value={expansion}
        onChange={(e) => setExpansion(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value='Normal'>Normal</option>
        <option value='Fire'>Fire</option>
        <option value='Water'>Water</option>
        <option value='Electric'>Electric</option>
        <option value='Grass'>Grass</option>
        <option value='Ice'>Ice</option>
        <option value='Fighting'>Fighting</option>
        <option value='Poison'>Poison</option>
        <option value='Ground'>Ground</option>
        <option value='Flying'>Flying</option>
        <option value='Psychic'>Psychic</option>
        <option value='Bug'>Bug</option>
        <option value='Rock'>Rock</option>
        <option value='Ghost'>Ghost</option>
        <option value='Dragon'>Dragon</option>
        <option value='Dark'>Dark</option>
        <option value='Steel'>Steel</option>
        <option value='Fairy'>Fairy</option>
      </select>
    </nav>
  );
};

export default Navbar;
