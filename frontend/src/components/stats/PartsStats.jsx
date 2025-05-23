import { Icon } from "@iconify/react";
import { Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PartsStats = ({ stats }) => {
  const { t } = useTranslation();

  return (
    <Row className="g-3 mb-4">
      <Col sm={6} md={3}>
        <Card className="border-0 shadow-sm">
          <Card.Body className="d-flex align-items-center">
            <div className="rounded-circle bg-primary-100 p-3 me-3">
              <Icon
                icon="ph:engine"
                className="text-primary"
                width="24"
                height="24"
              />
            </div>
            <div>
              <h3 className="fw-bold mb-0">{stats.totalParts}</h3>
              <p className="text-muted mb-0">{t("stats.total_parts")}</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} md={3}>
        <Card className="border-0 shadow-sm">
          <Card.Body className="d-flex align-items-center">
            <div className="rounded-circle bg-success-100 p-3 me-3">
              <Icon
                icon="mdi:cube-outline"
                className="text-success"
                width="24"
                height="24"
              />
            </div>
            <div>
              <h3 className="fw-bold mb-0">{stats.inStockCount}</h3>
              <p className="text-muted mb-0">{t("stats.in_stock")}</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} md={3}>
        <Card className="border-0 shadow-sm">
          <Card.Body className="d-flex align-items-center">
            <div className="rounded-circle bg-warning-100 p-3 me-3">
              <Icon
                icon="mdi:alert-circle-outline"
                className="text-warning"
                width="24"
                height="24"
              />
            </div>
            <div>
              <h3 className="fw-bold mb-0">{stats.lowStockCount}</h3>
              <p className="text-muted mb-0">{t("stats.low_stock")}</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} md={3}>
        <Card className="border-0 shadow-sm">
          <Card.Body className="d-flex align-items-center">
            <div className="rounded-circle bg-danger-100 p-3 me-3">
              <Icon
                icon="mdi:package-variant-remove"
                className="text-danger"
                width="24"
                height="24"
              />
            </div>
            <div>
              <h3 className="fw-bold mb-0">{stats.outOfStockCount}</h3>
              <p className="text-muted mb-0">{t("stats.out_of_stock")}</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default PartsStats;
