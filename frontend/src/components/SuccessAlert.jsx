import React from 'react';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

/**
 * Компонент для отображения успешных уведомлений с поддержкой мультиязычности
 * @param {Object} props - Свойства компонента
 * @param {string} props.message - Текст сообщения
 * @param {function} props.onClose - Функция закрытия уведомления
 * @returns {JSX.Element} - React компонент
 */
const SuccessAlert = ({ message, onClose }) => {
  const { t } = useTranslation();
  
  if (!message) return null;
  
  return (
    <Alert variant="success" dismissible onClose={onClose}>
      <Alert.Heading>{t('common.success')}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

export default SuccessAlert;