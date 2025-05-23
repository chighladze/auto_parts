import { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ApiErrorAlert from "../components/ApiErrorAlert";
import MasterLayout from "../masterLayout/MasterLayout";
import partService from '../services/partService';

const PartDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation(['parts', 'translation']);
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPart = async () => {
      try {
        setLoading(true);
        const data = await partService.getPartById(id);
        setPart(data);
      } catch (err) {
        setError(t("parts.load_error") || 'Ошибка при загрузке запчасти');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPart();
  }, [id, t]);

  if (loading) {
    return (
      <MasterLayout>
        <div className="content-wrapper">
          <div className="text-center p-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{t("common.loading") || "Загрузка..."}</span>
            </Spinner>
          </div>
        </div>
      </MasterLayout>
    );
  }

  if (error) {
    return (
      <MasterLayout>
        <div className="content-wrapper p-4">
          <ApiErrorAlert message={error} />
        </div>
      </MasterLayout>
    );
  }

  if (!part) {
    return (
      <MasterLayout>
        <div className="content-wrapper p-4">
          <div className="alert alert-warning">
            {t("parts.not_found") || "Запчасть не найдена"}
          </div>
        </div>
      </MasterLayout>
    );
  }

  return (
    <MasterLayout>
      <div className="content-wrapper">
        <div className="p-4">
          <Card>
            <Card.Header>
              <h5 className="card-title mb-0">{t("parts.details") || "Детали запчасти"}</h5>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-6">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>{t("name", { ns: "parts" })}:</th>
                        <td>{part.name}</td>
                      </tr>
                      <tr>
                        <th>{t("article", { ns: "parts" })}:</th>
                        <td>{part.article_number}</td>
                      </tr>
                      <tr>
                        <th>{t("barcode", { ns: "parts" })}:</th>
                        <td>{part.barcode || '-'}</td>
                      </tr>
                      <tr>
                        <th>{t("qr_code", { ns: "parts" })}:</th>
                        <td>{part.qr_code || '-'}</td>
                      </tr>
                      <tr>
                        <th>{t("text_id", { ns: "parts" })}:</th>
                        <td>{part.text_identifier || '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </MasterLayout>
  );
};

export default PartDetailPage;
