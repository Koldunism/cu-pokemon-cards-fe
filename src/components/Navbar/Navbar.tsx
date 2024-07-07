import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onSearch: (params: {
    searchName: string;
    searchExpansion: string;
    type: string;
  }) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchName, setSearchName] = useState("");
  const [searchExpansion, setSearchExpansion] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    onSearch({ searchName, searchExpansion, type });
  }, [searchName, searchExpansion, type]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__title}>Pokemon App</div>
      <div className={styles.navbar__filters}>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className={styles.navbar__input}
        />
        <input
          type="text"
          placeholder="Search Expansion"
          value={searchExpansion}
          onChange={(e) => setSearchExpansion(e.target.value)}
          className={styles.navbar__input}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={styles.navbar__select}
        >
          <option value="">All Types</option>
          <option value="Normal">Normal</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Electric">Electric</option>
          <option value="Grass">Grass</option>
          <option value="Ice">Ice</option>
          <option value="Fighting">Fighting</option>
          <option value="Poison">Poison</option>
          <option value="Ground">Ground</option>
          <option value="Flying">Flying</option>
          <option value="Psychic">Psychic</option>
          <option value="Bug">Bug</option>
          <option value="Rock">Rock</option>
          <option value="Ghost">Ghost</option>
          <option value="Dragon">Dragon</option>
          <option value="Dark">Dark</option>
          <option value="Steel">Steel</option>
          <option value="Fairy">Fairy</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
