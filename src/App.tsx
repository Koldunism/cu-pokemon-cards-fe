import React from 'react';
import CardsContainer from './containers/CardsContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon Cards</h1>
      </header>
      <main>
        <CardsContainer />
      </main>
    </div>
  );
};

export default App;
