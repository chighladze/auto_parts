import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

const DefaultAlertsTwo = () => {
    const { t } = useTranslation();
    
    return (
        <div className="col-lg-6">
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">{t('alerts.default_alerts')}</h6>
                </div>
                <div className="card-body p-24 d-flex flex-column gap-4">
                    <div
                        className="alert alert-primary bg-primary-50 text-primary-600 border-primary-50 px-24 py-11 mb-0 fw-semibold text-lg radius-8"
                        role="alert"
                    >
                        <div className="d-flex align-items-center justify-content-between text-lg">
                            {t('alerts.primary_alert')}
                            <button className="remove-button text-primary-600 text-xxl line-height-1">
                                <Icon icon="iconamoon:sign-times-light" className="icon" />
                            </button>
                        </div>
                        <p className="fw-medium text-primary-600 text-sm mt-8">
                            {t('alerts.alert_with_description')}
                        </p>
                    </div>
                    <div
                        className="alert alert-success bg-success-100 text-success-600 border-success-100 px-24 py-11 mb-0 fw-semibold text-lg radius-8"
                        role="alert"
                    >
                        <div className="d-flex align-items-center justify-content-between text-lg">
                            {t('alerts.success_alert')}
                            <button className="remove-button text-success-600 text-xxl line-height-1">
                                <Icon icon="iconamoon:sign-times-light" className="icon" />
                            </button>
                        </div>
                        <p className="fw-medium text-success-600 text-sm mt-8">
                            {t('alerts.alert_with_description')}
                        </p>
                    </div>
                    <div
                        className="alert alert-warning bg-warning-100 text-warning-600 border-warning-100 px-24 py-11 mb-0 fw-semibold text-lg radius-8"
                        role="alert"
                    >
                        <div className="d-flex align-items-center justify-content-between text-lg">
                            {t('alerts.warning_alert')}
                            <button className="remove-button text-warning-600 text-xxl line-height-1">
                                <Icon icon="iconamoon:sign-times-light" className="icon" />
                            </button>
                        </div>
                        <p className="fw-medium text-warning-600 text-sm mt-8">
                            {t('alerts.alert_with_description')}
                        </p>
                    </div>
                    <div
                        className="alert alert-info bg-info-100 text-info-600 border-info-100 px-24 py-11 mb-0 fw-semibold text-lg radius-8"
                        role="alert"
                    >
                        <div className="d-flex align-items-center justify-content-between text-lg">
                            {t('alerts.info_alert')}
                            <button className="remove-button text-info-600 text-xxl line-height-1">
                                <Icon icon="iconamoon:sign-times-light" className="icon" />
                            </button>
                        </div>
                        <p className="fw-medium text-info-600 text-sm mt-8">
                            {t('alerts.alert_with_description')}
                        </p>
                    </div>
                    <div
                        className="alert alert-danger bg-danger-100 text-danger-600 border-danger-100 px-24 py-11 mb-0 fw-semibold text-lg radius-8"
                        role="alert"
                    >
                        <div className="d-flex align-items-center justify-content-between text-lg">
                            {t('alerts.danger_alert')}
                            <button className="remove-button text-danger-600 text-xxl line-height-1">
                                <Icon icon="iconamoon:sign-times-light" className="icon" />
                            </button>
                        </div>
                        <p className="fw-medium text-danger-600 text-sm mt-8">
                            {t('alerts.alert_with_description')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultAlertsTwo;