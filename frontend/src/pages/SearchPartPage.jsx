import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCodeGenerator from '../components/QRCodeGenerator';
import SearchBar from '../components/SearchBar';
import '../components/styles/Parts.css';

const SearchPartPage = () => {
  const navigate = useNavigate();
  const [foundPart, setFoundPart] = useState(null);

  const handlePartFound = (part) => {
    setFoundPart(part);
  };

  return (
    <div className="search-page">
      <h1>Поиск запчастей</h1>
      
      <SearchBar onResultFound={handlePartFound} />

      {foundPart && (
        <div className="found-part-details">
          <h2>Найденная запчасть</h2>
          <div className="part-details">
            <p><strong>Название:</strong> {foundPart.name}</p>
            <p><strong>Артикул:</strong> {foundPart.article_number}</p>
            {foundPart.barcode && (
              <p><strong>Штрих-код:</strong> {foundPart.barcode}</p>
            )}
            {foundPart.qr_code && (
              <p><strong>QR-код:</strong> {foundPart.qr_code}</p>
            )}
            {foundPart.text_identifier && (
              <p><strong>Текстовый идентификатор:</strong> {foundPart.text_identifier}</p>
            )}

            <div className="qr-section">
              <h3>QR-код для запчасти</h3>
              <QRCodeGenerator 
                value={JSON.stringify({
                  id: foundPart.id,
                  name: foundPart.name,
                  article: foundPart.article_number
                })} 
                size={200}
              />
            </div>

            <div className="button-group">
              <button 
                onClick={() => navigate(`/parts/${foundPart.id}`)}
                className="details-button"
              >
                Подробнее
              </button>
              <button 
                onClick={() => setFoundPart(null)}
                className="clear-button"
              >
                Очистить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPartPage;