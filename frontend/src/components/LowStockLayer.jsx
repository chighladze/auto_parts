import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Card, Spinner, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { inventoryService } from "../services";

const LowStockLayer = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const LOW_STOCK_THRESHOLD = 5;

  const loadLowStockItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await inventoryService.getLowStockItems(
        LOW_STOCK_THRESHOLD
      );
      setItems(response);
      setError(null);
    } catch (error) {
      setError(t("pages.low_stock.load_error"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadLowStockItems();
  }, [loadLowStockItems]);

  return (
    <div className="container-fluid">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{t("pages.low_stock.title")}</h5>
          <Button variant="primary" onClick={loadLowStockItems}>
            <Icon icon="mdi:refresh" className="me-1" />
            {t("common.refresh")}
          </Button>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="text-center p-4">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">{t("common.loading")}</span>
              </Spinner>
              <p className="mt-2">{t("common.loading_data")}</p>
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>{t("pages.low_stock.part")}</th>
                  <th>{t("pages.low_stock.section")}</th>
                  <th>{t("pages.low_stock.quantity")}</th>
                  <th>{t("pages.low_stock.status")}</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.part?.name || item.part_id}</td>
                      <td>{item.section?.code || item.section_id}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <span
                          className={`badge bg-${
                            item.quantity === 0 ? "danger" : "warning"
                          }`}
                        >
                          {item.quantity === 0
                            ? t("pages.low_stock.out_of_stock")
                            : t("pages.low_stock.low_stock")}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      {t("pages.low_stock.no_items")}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default LowStockLayer;
