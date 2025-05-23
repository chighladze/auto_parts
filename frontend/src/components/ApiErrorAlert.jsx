import React from 'react';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

/**
 * Компонент для отображения ошибок API с поддержкой мультиязычности
 * @param {Object} props - Свойства компонента
 * @param {string} props.error - Текст ошибки
 * @param {function} props.onClose - Функция закрытия уведомления
 * @returns {JSX.Element} - React компонент
 */
const ApiErrorAlert = ({ error, onClose }) => {
  const { t } = useTranslation();
  
  if (!error) return null;
  
  // Получение локализованного сообщения об ошибке
  const getErrorMessage = (errorText) => {
    // Если это стандартное сообщение об ошибке (например, "Not found")
    if (errorText.includes('not found') || errorText.includes('404')) {
      return t('errors.not_found');
    } else if (errorText.includes('unauthorized') || errorText.includes('401')) {
      return t('errors.unauthorized');
    } else if (errorText.includes('forbidden') || errorText.includes('403')) {
      return t('errors.forbidden');
    } else if (errorText.includes('server error') || errorText.includes('500')) {
      return t('errors.server_error');
    }
    
    // Если сообщение не распознано, возвращаем исходное с префиксом
    return `${t('errors.api_error')}: ${errorText}`;
  };

  return (
    <Alert variant="danger" dismissible onClose={onClose}>
      <Alert.Heading>{t('errors.title')}</Alert.Heading>
      <p>{getErrorMessage(error)}</p>
    </Alert>
  );
};

export default ApiErrorAlert;