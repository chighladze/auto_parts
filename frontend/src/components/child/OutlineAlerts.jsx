import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

const OutlineAlerts = () => {
    const { t } = useTranslation();
    
    return (
        <div className="col-lg-6">
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">{t('alerts.outline_alerts')}</h6>
                </div>
                <div className="card-body p-24 d-flex flex-column gap-4">
                    <div
                        className="alert alert-primary bg-transparent text-primary-600 border-primary-600 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                        role="alert"
                    >
                        {t('alerts.primary_alert')}
                        <button className="remove-button text-primary-600 text-xxl line-height-1">
                            <Icon icon="iconamoon:sign-times-light" className="icon" />
                        </button>
                    </div>
                    <div
                        className="alert alert-lilac bg-transparent text-lilac-600 border-lilac-600 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                        role="alert"
                    >
                        {t('alerts.secondary_alert')}
                        <button className="remove-button text-lilac-600 text-xxl line-height-1">
                            <Icon icon="iconamoon:sign-times-light" className="icon" />
                        </button>
                    </div>
                    <div
                        className="alert alert-warning bg-transparent text-warning-600 border-warning-600 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                        role="alert"
                    >
                        {t('alerts.warning_alert')}
                        <button className="remove-button text-warning-600 text-xxl line-height-1">
                            <Icon icon="iconamoon:sign-times-light" className="icon" />
                        </button>
                    </div>
                    <div
                        className="alert alert-info bg-transparent text-info-600 border-info-600 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                        role="alert"
                    >
                        {t('alerts.info_alert')}
                        <button className="remove-button text-info-600 text-xxl line-height-1">
                            <Icon icon="iconamoon:sign-times-light" className="icon" />
                        </button>
                    </div>
                    <div
                        className="alert alert-danger bg-transparent text-danger-600 border-danger-600 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                        role="alert"
                    >
                        {t('alerts.danger_alert')}
                        <button className="remove-button text-danger-600 text-xxl line-height-1">
                            <Icon icon="iconamoon:sign-times-light" className="icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutlineAlerts;