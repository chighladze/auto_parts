import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SolidAlerts = () => {
    const { t } = useTranslation();
    
    return (
        <div className="col-xl-12">
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">{t('alerts.solid_alerts')}</h6>
                </div>
                <div className="card-body p-24">
                    <div className="row gy-4">
                        <div className="col-sm-6">
                            <div className="d-flex flex-column gap-4">
                                <div
                                    className="alert alert-primary bg-primary-600 text-white border-primary-600 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                                    role="alert"
                                >
                                    {t('alerts.primary_alert')}
                                    <button className="remove-button text-white text-xxl line-height-1">
                                        <Icon icon="iconamoon:sign-times-light" className="icon" />
                                    </button>
                                </div>
                                <div
                                    className="alert alert-success bg-success-600 text-white border-success-600 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                                    role="alert"
                                >
                                    {t('alerts.success_alert')}
                                    <button className="remove-button text-white text-xxl line-height-1">
                                        <Icon icon="iconamoon:sign-times-light" className="icon" />
                                    </button>
                                </div>
                                <div
                                    className="alert alert-info bg-info-600 text-white border-info-600 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                                    role="alert"
                                >
                                    {t('alerts.info_alert')}
                                    <button className="remove-button text-white text-xxl line-height-1">
                                        <Icon icon="iconamoon:sign-times-light" className="icon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="d-flex flex-column gap-4">
                                <div
                                    className="alert alert-lilac bg-lilac-600 text-white border-lilac-600 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                                    role="alert"
                                >
                                    {t('alerts.secondary_alert')}
                                    <button className="remove-button text-white text-xxl line-height-1">
                                        <Icon icon="iconamoon:sign-times-light" className="icon" />
                                    </button>
                                </div>
                                <div
                                    className="alert alert-warning bg-warning-600 text-white border-warning-600 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                                    role="alert"
                                >
                                    {t('alerts.warning_alert')}
                                    <button className="remove-button text-white text-xxl line-height-1">
                                        <Icon icon="iconamoon:sign-times-light" className="icon" />
                                    </button>
                                </div>
                                <div
                                    className="alert alert-danger bg-danger-600 text-white border-danger-600 px-24 py-11 mb-0 fw-semibold text-lg radius-8 d-flex align-items-center justify-content-between"
                                    role="alert"
                                >
                                    {t('alerts.danger_alert')}
                                    <button className="remove-button text-white text-xxl line-height-1">
                                        <Icon icon="iconamoon:sign-times-light" className="icon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolidAlerts;