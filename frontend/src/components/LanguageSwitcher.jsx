import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [currentIcon, setCurrentIcon] = useState('fluent:globe-20-regular');
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const icon = i18n.language === 'en' ? 'circle-flags:us' :
                i18n.language === 'ru' ? 'circle-flags:ru' :
                i18n.language === 'ka' ? 'circle-flags:ge' :
                'fluent:globe-20-regular';
    setCurrentIcon(icon);
  }, [i18n.language]);

  return (
    <Dropdown>
      <Dropdown.Toggle 
        variant="link" 
        id="language-dropdown" 
        className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
      >
        <Icon 
          icon={currentIcon}
          width="24"
          height="24"
          className="text-primary-light"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="to-top dropdown-menu-sm p-0">
        <div className="py-12 px-16 radius-8 bg-primary-50 mb-16">
          <h6 className="text-lg text-primary-light fw-semibold mb-0">
            {t('common.language')}
          </h6>
        </div>
        <ul className="to-top-list px-16">
          <li>
            <Dropdown.Item 
              onClick={() => changeLanguage('en')}
              active={i18n.language === 'en'}
              className="dropdown-item text-black px-16 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
            >
              <Icon icon="circle-flags:us" width="24" height="24" />
              {t('common.available_languages.en')}
            </Dropdown.Item>
          </li>
          <li>
            <Dropdown.Item 
              onClick={() => changeLanguage('ru')}
              active={i18n.language === 'ru'}
              className="dropdown-item text-black px-16 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
            >
              <Icon icon="circle-flags:ru" width="24" height="24" />
              {t('common.available_languages.ru')}
            </Dropdown.Item>
          </li>
          <li>
            <Dropdown.Item 
              onClick={() => changeLanguage('ka')}
              active={i18n.language === 'ka'}
              className="dropdown-item text-black px-16 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
            >
              <Icon icon="circle-flags:ge" width="24" height="24" />
              {t('common.available_languages.ka')}
            </Dropdown.Item>
          </li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;