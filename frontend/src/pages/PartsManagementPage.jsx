import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PartScanner from '../components/PartScanner';
import partService from '../services/partService';
import sectionService from '../services/sectionService';

const PartsManagementPage = () => {
  const { sectionId } = useParams();
  const [section, setSection] = useState(null);
  const [scannedPart, setScannedPart] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadSection = useCallback(async () => {
    try {
      const sectionData = await sectionService.getSectionById(sectionId);
      setSection(sectionData);
    } catch (err) {
      setError('Ошибка при загрузке секции');
      console.error(err);
    }
  }, [sectionId]);

  useEffect(() => {
    if (sectionId) {
      loadSection();
    }
  }, [sectionId, loadSection]);

  const handlePartFound = (part) => {
    setScannedPart(part);
    setMessage('');
    setError('');
  };

  const handleAddPart = async () => {
    if (!scannedPart || !sectionId) return;

    try {
      await partService.addPartToSection(scannedPart.id, sectionId, quantity);
      setMessage('Запчасть успешно добавлена в секцию');
      setScannedPart(null);
      setQuantity(1);
    } catch (err) {
      setError('Ошибка при добавлении запчасти');
      console.error(err);
    }
  };

  return (
    <div className="parts-management">
      <h1>Управление запчастями</h1>
      
      {section && (
        <div className="section-info">
          <h2>Секция: {section.code}</h2>
        </div>
      )}

      <div className="scanner-section">
        <h3>Сканировать запчасть</h3>
        <PartScanner 
          sectionId={sectionId} 
          onPartFound={handlePartFound} 
        />
      </div>

      {scannedPart && (
        <div className="part-details">
          <h3>Найдена запчасть:</h3>
          <p>Название: {scannedPart.name}</p>
          <p>Артикул: {scannedPart.article_number}</p>
          
          <div className="quantity-input">
            <label>
              Количество:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </label>
          </div>

          <button 
            onClick={handleAddPart}
            className="add-part-button"
          >
            Добавить в секцию
          </button>
        </div>
      )}

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PartsManagementPage;