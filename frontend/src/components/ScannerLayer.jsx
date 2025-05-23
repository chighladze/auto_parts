import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { inventoryService, partService } from "../services";

const ScannerLayer = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scannedPart, setScannedPart] = useState(null);
  const [barcode, setBarcode] = useState("");

  const handleScan = useCallback(async () => {
    if (!barcode.trim()) {
      toast.error(t("pages.scanner.enter_barcode"));
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const part = await partService.findByBarcode(barcode);
      if (part) {
        const inventory = await inventoryService.findByPartId(part.id);
        setScannedPart({ ...part, inventory });
        toast.success(t("pages.scanner.part_found"));
      } else {
        setScannedPart(null);
        toast.error(t("pages.scanner.part_not_found"));
      }
    } catch (error) {
      setError(t("pages.scanner.scan_error"));
      toast.error(t("pages.scanner.scan_error"));
    } finally {
      setLoading(false);
    }
  }, [barcode, t]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && barcode) {
        handleScan();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [barcode, handleScan]);

  return (
    <div className="container-fluid">
      <Card>
        <Card.Header>
          <h5 className="mb-0">{t("pages.scanner.title")}</h5>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Form className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.scanner.barcode")}</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder={t("pages.scanner.enter_barcode")}
                  disabled={loading}
                  autoFocus
                />
                <Button
                  variant="primary"
                  onClick={handleScan}
                  disabled={loading || !barcode.trim()}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon icon="mdi:barcode-scan" />
                  )}
                  <span className="ms-2">{t("pages.scanner.scan")}</span>
                </Button>
              </div>
            </Form.Group>
          </Form>

          {scannedPart && (
            <Card className="bg-light">
              <Card.Body>
                <h6>{t("pages.scanner.scanned_part")}</h6>
                <dl className="row mb-0">
                  <dt className="col-sm-3">{t("pages.parts.name")}:</dt>
                  <dd className="col-sm-9">{scannedPart.name}</dd>

                  <dt className="col-sm-3">
                    {t("pages.parts.article_number")}:
                  </dt>
                  <dd className="col-sm-9">{scannedPart.article_number}</dd>

                  <dt className="col-sm-3">{t("pages.parts.description")}:</dt>
                  <dd className="col-sm-9">{scannedPart.description || "-"}</dd>

                  <dt className="col-sm-3">{t("pages.inventory.quantity")}:</dt>
                  <dd className="col-sm-9">
                    {scannedPart.inventory?.length > 0
                      ? scannedPart.inventory.reduce(
                          (total, inv) => total + inv.quantity,
                          0
                        )
                      : 0}
                  </dd>
                </dl>

                {scannedPart.inventory?.length > 0 && (
                  <div className="mt-3">
                    <h6>{t("pages.scanner.locations")}</h6>
                    <ul className="list-unstyled mb-0">
                      {scannedPart.inventory.map((inv) => (
                        <li key={inv.id}>
                          {t("pages.scanner.section")}: {inv.section?.code} -{" "}
                          {inv.quantity} {t("common.units")}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ScannerLayer;
