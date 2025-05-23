import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

/**
 * Компонент отображения состояния загрузки
 * @param {Object} props - Свойства компонента
 * @param {boolean} props.isLoading - Флаг загрузки
 * @param {string} props.message - Дополнительное сообщение (опционально)
 * @param {React.ReactNode} props.children - Дочерние элементы, отображаемые после загрузки
 * @returns {JSX.Element} - React компонент
 */
const Loading = ({ isLoading, message, children }) => {
  const { t } = useTranslation();
  
  if (!isLoading) {
    return children || null;
  }
  
  return (
    <div className="text-center py-5">
      <Spinner animation="border" role="status" variant="primary" />
      <p className="mt-3">{message || t('common.loading_data')}</p>
    </div>
  );
};

export default Loading;