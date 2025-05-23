import { useTranslation } from 'react-i18next';

export const useAppTranslation = () => {
  const { t, i18n } = useTranslation(['translation', 'components', 'parts']);

  const translate = (key, namespace = 'translation') => {
    return t(key, { ns: namespace });
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const getCurrentLanguage = () => {
    return i18n.language;
  };

  return {
    t: translate,
    changeLanguage,
    getCurrentLanguage,
  };
};
