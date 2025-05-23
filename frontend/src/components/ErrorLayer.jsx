import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const ErrorLayer = () => {
  const { t } = useTranslation();
  
  return (
    <div className='card basic-data-table'>
      <div className='card-body py-80 px-32 text-center'>
        <img src='assets/images/error-img.png' alt='' className='mb-24' />
        <h6 className='mb-16'>{t('errors.page_not_found')}</h6>
        <p className='text-secondary-light'>
          {t('errors.page_not_found_description')}
        </p>
        <Link to='/' className='btn btn-primary-600 radius-8 px-20 py-11'>
          {t('common.back_to_home')}
        </Link>
      </div>
    </div>
  );
};

export default ErrorLayer;
