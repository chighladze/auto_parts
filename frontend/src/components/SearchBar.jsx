import React, { useState } from 'react';
import partService from '../services/partService';

const SearchBar = ({ onResultFound }) => {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setSearching(true);
      setError('');
      const result = await partService.getPartByQRCode(query) || 
                    await partService.getPartByBarcode(query);
      
      if (result) {
        onResultFound(result);
        setQuery('');
      } else {
        setError('Запчасть не найдена');
      }
    } catch (err) {
      setError('Ошибка при поиске');
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите код, артикул или название запчасти"
          disabled={searching}
        />
        <button type="submit" disabled={searching || !query.trim()}>
          {searching ? 'Поиск...' : 'Найти'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SearchBar;