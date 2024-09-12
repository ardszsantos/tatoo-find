import './App.css';
import { useState } from 'react';
import GridContainer from './components/grid';
import SearchInput from './components/input';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Função de pesquisa
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      {/* A função handleSearch é passada como prop */}
      <SearchInput onSearch={handleSearch} />
      <GridContainer searchQuery={searchQuery} />
    </div>
  );
}

export default App;
