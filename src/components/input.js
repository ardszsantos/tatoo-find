import './styles/input.css'

import { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);  // Passa a consulta de busca para o componente pai
    }
  };

  return (
    <div className="main-container">
      <h1>Tattoo Find</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Descreva a tatuagem desejada"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  );
}

export default SearchInput;
