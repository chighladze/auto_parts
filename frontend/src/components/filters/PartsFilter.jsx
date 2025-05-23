import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PartsFilter = ({ onFilterChange }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    search: "",
    group: "",
    subgroup: "",
    inStock: "all",
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">
          <Icon icon="mdi:filter-variant" className="me-2" />
          {t("filters.title")}
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>{t("filters.search")}</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <Icon icon="mdi:magnify" />
                </span>
                <Form.Control
                  type="text"
                  name="search"
                  placeholder={t("filters.search_placeholder")}
                  value={filters.search}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>{t("filters.group")}</Form.Label>
              <Form.Select
                name="group"
                value={filters.group}
                onChange={handleChange}
              >
                <option value="">{t("filters.all_groups")}</option>
                {/* Groups will be loaded dynamically */}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>{t("filters.subgroup")}</Form.Label>
              <Form.Select
                name="subgroup"
                value={filters.subgroup}
                onChange={handleChange}
                disabled={!filters.group}
              >
                <option value="">{t("filters.all_subgroups")}</option>
                {/* Subgroups will be loaded dynamically */}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>{t("filters.stock")}</Form.Label>
              <Form.Select
                name="inStock"
                value={filters.inStock}
                onChange={handleChange}
              >
                <option value="all">{t("filters.all")}</option>
                <option value="in_stock">{t("filters.in_stock")}</option>
                <option value="out_stock">{t("filters.out_stock")}</option>
                <option value="low_stock">{t("filters.low_stock")}</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PartsFilter;
