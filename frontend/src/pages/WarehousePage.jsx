import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../components/Breadcrumbs";
import MasterLayout from "../masterLayout/MasterLayout";
import { sectionService, warehouseService } from "../services";

const WarehousePage = () => {
  const { t } = useTranslation();
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseDetails, setWarehouseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    manager: "",
  });

  const loadWarehouses = useCallback(async () => {
    try {
      setLoading(true);
      const warehousesData = await warehouseService.getAllWarehouses();
      setWarehouses(warehousesData);

      // Загружаем детали для каждого склада
      const details = {};
      for (const warehouse of warehousesData) {
        const sections = await sectionService.getSectionsByWarehouse(
          warehouse.id
        );
        details[warehouse.id] = {
          sectionsCount: sections.length,
          totalParts: sections.reduce(
            (sum, section) => sum + (section.parts_count || 0),
            0
          ),
        };
      }
      setWarehouseDetails(details);
      setError(null);
    } catch (err) {
      setError(t("warehouse.load_error", { error: err.message }));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadWarehouses();
  }, [loadWarehouses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentWarehouse) {
        await warehouseService.updateWarehouse(currentWarehouse.id, formData);
        setSuccessMessage(t("warehouse.update_success"));
      } else {
        await warehouseService.createWarehouse(formData);
        setSuccessMessage(t("warehouse.create_success"));
      }
      loadWarehouses();
      handleCloseModal();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(t("warehouse.save_error", { error: err.message }));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("warehouse.delete_confirm"))) {
      try {
        await warehouseService.deleteWarehouse(id);
        setSuccessMessage(t("warehouse.delete_success"));
        loadWarehouses();
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        setError(t("warehouse.delete_error", { error: err.message }));
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentWarehouse(null);
    setFormData({
      name: "",
      location: "",
      description: "",
      manager: "",
    });
  };

  const handleShowAddModal = () => {
    handleCloseModal();
    setShowAddModal(true);
  };

  const handleShowEditModal = (warehouse) => {
    setCurrentWarehouse(warehouse);
    setFormData({
      name: warehouse.name,
      location: warehouse.location,
      description: warehouse.description || "",
      manager: warehouse.manager || "",
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <MasterLayout>
        <div className="content-wrapper">
          <div className="text-center p-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{t("common.loading")}</span>
            </Spinner>
          </div>
        </div>
      </MasterLayout>
    );
  }

  return (
    <MasterLayout>
      <Breadcrumbs />
      <div className="content-wrapper p-4">
        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="bg-white py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{t("warehouse.title")}</h5>
              <Button variant="primary" onClick={handleShowAddModal}>
                <Icon icon="mdi:plus" className="me-1" />
                {t("warehouse.add")}
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            {error && (
              <div className="alert alert-danger mb-4" role="alert">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="alert alert-success mb-4" role="alert">
                {successMessage}
              </div>
            )}

            <Row>
              {warehouses.map((warehouse) => (
                <Col key={warehouse.id} lg={4} md={6} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Header className="bg-white py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">{warehouse.name}</h6>
                        <div className="dropdown">
                          <Button
                            variant="link"
                            className="p-0 text-muted"
                            data-bs-toggle="dropdown"
                          >
                            <Icon icon="mdi:dots-vertical" width="20" />
                          </Button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <Button
                                variant="link"
                                className="dropdown-item"
                                onClick={() => handleShowEditModal(warehouse)}
                              >
                                <Icon icon="mdi:pencil" className="me-2" />
                                {t("common.edit")}
                              </Button>
                            </li>
                            <li>
                              <Button
                                variant="link"
                                className="dropdown-item text-danger"
                                onClick={() => handleDelete(warehouse.id)}
                              >
                                <Icon icon="mdi:delete" className="me-2" />
                                {t("common.delete")}
                              </Button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <Icon
                            icon="mdi:map-marker"
                            className="me-2 text-muted"
                          />
                          <small className="text-muted">
                            {t("warehouse.location")}:
                          </small>
                        </div>
                        <p className="mb-0">{warehouse.location}</p>
                      </div>
                      {warehouse.description && (
                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <Icon
                              icon="mdi:information"
                              className="me-2 text-muted"
                            />
                            <small className="text-muted">
                              {t("warehouse.description")}:
                            </small>
                          </div>
                          <p className="mb-0">{warehouse.description}</p>
                        </div>
                      )}
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <Icon
                            icon="mdi:account"
                            className="me-2 text-muted"
                          />
                          <small className="text-muted">
                            {t("warehouse.manager")}:
                          </small>
                        </div>
                        <p className="mb-0">
                          {warehouse.manager || t("warehouse.no_manager")}
                        </p>
                      </div>
                      <hr />
                      <div className="row g-3">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-primary-100 p-2 me-2">
                              <Icon
                                icon="fluent:cube-16-regular"
                                className="text-primary"
                              />
                            </div>
                            <div>
                              <small className="text-muted d-block">
                                {t("warehouse.sections")}
                              </small>
                              <strong>
                                {warehouseDetails[warehouse.id]
                                  ?.sectionsCount || 0}
                              </strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-success-100 p-2 me-2">
                              <Icon icon="ph:engine" className="text-success" />
                            </div>
                            <div>
                              <small className="text-muted d-block">
                                {t("warehouse.total_parts")}
                              </small>
                              <strong>
                                {warehouseDetails[warehouse.id]?.totalParts ||
                                  0}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        {/* Модальное окно добавления/редактирования */}
        <Modal show={showAddModal || showEditModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {showAddModal
                ? t("warehouse.add_title")
                : t("warehouse.edit_title")}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>{t("warehouse.name")}</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t("warehouse.enter_name")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("warehouse.location")}</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder={t("warehouse.enter_location")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("warehouse.description")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={t("warehouse.enter_description")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("warehouse.manager")}</Form.Label>
                <Form.Control
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  placeholder={t("warehouse.enter_manager")}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                {t("common.cancel")}
              </Button>
              <Button variant="primary" type="submit">
                {showAddModal ? t("common.add") : t("common.save")}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </MasterLayout>
  );
};

export default WarehousePage;
