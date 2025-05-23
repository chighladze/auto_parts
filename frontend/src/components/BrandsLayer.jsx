import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { BrandsApi } from "../api/brands";

const BrandsLayer = () => {
  const { t } = useTranslation();
  const [brands, setBrands] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const loadBrands = useCallback(async () => {
    try {
      setLoading(true);
      const response = await BrandsApi.getAll();
      setBrands(response.data);
      setError(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("pages.brands.load_error");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      if (!formData.name.trim()) {
        toast.error(t("pages.brands.name_required"));
        return;
      }

      if (currentBrand) {
        await BrandsApi.update(currentBrand.id, formData);
        setActionSuccess(t("pages.brands.update_success"));
      } else {
        await BrandsApi.create(formData);
        setActionSuccess(t("pages.brands.create_success"));
      }
      handleCloseModal();
      loadBrands();
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("pages.brands.save_error");
      toast.error(errorMessage);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("common.confirm_delete"))) {
      try {
        await BrandsApi.delete(id);
        setActionSuccess(t("pages.brands.delete_success"));
        loadBrands();
        setTimeout(() => setActionSuccess(null), 3000);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || t("pages.brands.delete_error");
        toast.error(errorMessage);
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentBrand(null);
    setFormData({ name: "" });
  };

  const handleShowAddModal = () => {
    setFormData({ name: "" });
    setShowAddModal(true);
  };

  const handleShowEditModal = (brand) => {
    setCurrentBrand(brand);
    setFormData({ name: brand.name });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid">
      {actionSuccess && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setActionSuccess(null)}
        >
          {actionSuccess}
        </Alert>
      )}

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{t("pages.brands.title")}</h5>
          <Button variant="primary" onClick={handleShowAddModal}>
            <Icon icon="mdi:plus" className="me-1" />
            {t("pages.brands.add_brand")}
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
                  <th>{t("pages.brands.id")}</th>
                  <th>{t("pages.brands.name")}</th>
                  <th>{t("common.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {brands.length > 0 ? (
                  brands.map((brand) => (
                    <tr key={brand.id}>
                      <td>{brand.id}</td>
                      <td>{brand.name}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleShowEditModal(brand)}
                        >
                          {t("common.edit")}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(brand.id)}
                        >
                          {t("common.delete")}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      {t("pages.brands.no_brands")}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showAddModal || showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentBrand
              ? t("pages.brands.edit_brand")
              : t("pages.brands.add_brand")}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="brandName">
              <Form.Label>{t("pages.brands.name")}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t("pages.brands.enter_name")}
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              {t("common.cancel")}
            </Button>
            <Button variant="primary" type="submit" disabled={formSubmitting}>
              {formSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {t("common.saving")}
                </>
              ) : showAddModal ? (
                t("common.add")
              ) : (
                t("common.save")
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandsLayer;
