import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import inventoryService from '../services/inventoryService';

const PartLocations = ({ partId }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadLocations();
  }, [partId]);

  const loadLocations = async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getPartLocations(partId);
      setLocations(data);
    } catch (err) {
      setError('Ошибка при загрузке расположений');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Загрузка расположений...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!locations.length) return <div>Запчасть не найдена на складе</div>;

  return (
    <div className="part-locations">
      <h3>Расположение на складе:</h3>
      <div className="locations-list">
        {locations.map((location) => (
          <div key={location.section_id} className="location-item">
            <div className="location-details">
              <p>
                <strong>Склад:</strong> {location.warehouse_name}
              </p>
              <p>
                <strong>Секция:</strong> {location.section_code}
              </p>
              <p>
                <strong>Количество:</strong> {location.quantity}
              </p>
            </div>
            <Link 
              to={`/section/${location.section_id}/parts`}
              className="go-to-section-button"
            >
              Перейти к секции
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartLocations;