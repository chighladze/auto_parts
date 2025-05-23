import { useAppTranslation } from '../hooks/useAppTranslation';

const DashBoardLayerOne = () => {
    const { t } = useAppTranslation();

    return (
        <>
            <section className="row gy-4 mt-1">
                <div className="col-12">
                    <h1>{t('dashboard.title', 'components')}</h1>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{t('dashboard.overview', 'components')}</h5>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="stats-box">
                                        <h3>{t('dashboard.total_sales', 'components')}</h3>
                                        <p>...</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="stats-box">
                                        <h3>{t('dashboard.total_revenue', 'components')}</h3>
                                        <p>...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DashBoardLayerOne;