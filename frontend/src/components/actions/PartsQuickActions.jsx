import { Icon } from "@iconify/react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PartsQuickActions = ({ onAction }) => {
  const { t } = useTranslation();

  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Header className="bg-white py-3">
        <h5 className="mb-0">{t("quick_actions.title")}</h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={() => onAction("add")}
          >
            <Icon icon="mdi:plus" className="me-2" />
            {t("quick_actions.add_part")}
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => onAction("import")}
          >
            <Icon icon="mdi:file-import" className="me-2" />
            {t("quick_actions.import")}
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => onAction("export")}
          >
            <Icon icon="mdi:file-export" className="me-2" />
            {t("quick_actions.export")}
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => onAction("print")}
          >
            <Icon icon="mdi:printer" className="me-2" />
            {t("quick_actions.print")}
          </button>
          <button
            className="btn btn-outline-warning"
            onClick={() => onAction("scan")}
          >
            <Icon icon="mdi:barcode-scan" className="me-2" />
            {t("quick_actions.scan")}
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PartsQuickActions;
