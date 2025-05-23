import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Form,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PartsApi } from "../api/parts";
import PartsQuickActions from "./actions/PartsQuickActions";
import PartsFilter from "./filters/PartsFilter";
import PartsStats from "./stats/PartsStats";

const PartsLayer = () => {
  const { t } = useTranslation();
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    article_number: "",
    description: "",
    barcode: "",
    qr_code: "",
    text_identifier: "",
    min_quantity: 5,
    group_id: "",
    subgroup_id: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [stats, setStats] = useState({
    totalParts: 0,
    inStockCount: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
  });

  const loadParts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await PartsApi.getAll();
      setParts(response.data);
      setFilteredParts(response.data);

      const inStock = response.data.filter((part) => part.quantity > 5).length;
      const lowStock = response.data.filter(
        (part) => part.quantity > 0 && part.quantity <= 5
      ).length;
      const outOfStock = response.data.filter(
        (part) => part.quantity === 0
      ).length;

      setStats({
        totalParts: response.data.length,
        inStockCount: inStock,
        lowStockCount: lowStock,
        outOfStockCount: outOfStock,
      });

      setError(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("pages.parts.load_error");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadParts();
  }, [loadParts]);

  const handleQuickAction = (action) => {
    switch (action) {
      case "add":
        handleShowModal();
        break;
      case "import":
        toast.info(t("features.coming_soon"));
        break;
      case "export":
        toast.info(t("features.coming_soon"));
        break;
      case "print":
        window.print();
        break;
      case "scan":
        toast.info(t("features.coming_soon"));
        break;
      default:
        break;
    }
  };

  const handleFilterChange = (filters) => {
    let result = [...parts];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (part) =>
          part.name.toLowerCase().includes(searchLower) ||
          part.article_number.toLowerCase().includes(searchLower) ||
          part.text_identifier?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.group) {
      result = result.filter((part) => part.group_id === filters.group);
    }

    if (filters.subgroup) {
      result = result.filter((part) => part.subgroup_id === filters.subgroup);
    }

    if (filters.inStock !== "all") {
      switch (filters.inStock) {
        case "in_stock":
          result = result.filter((part) => part.quantity > 5);
          break;
        case "low_stock":
          result = result.filter(
            (part) => part.quantity > 0 && part.quantity <= 5
          );
          break;
        case "out_stock":
          result = result.filter((part) => part.quantity === 0);
          break;
        default:
          break;
      }
    }

    setFilteredParts(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      if (!formData.name.trim()) {
        toast.error(t("pages.parts.name_required"));
        return;
      }

      if (editingPart) {
        await PartsApi.update(editingPart.id, formData);
        setActionSuccess(t("pages.parts.update_success"));
      } else {
        await PartsApi.create(formData);
        setActionSuccess(t("pages.parts.create_success"));
      }
      handleCloseModal();
      loadParts();
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("pages.parts.save_error");
      toast.error(errorMessage);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("common.confirm_delete"))) {
      try {
        await PartsApi.delete(id);
        setActionSuccess(t("pages.parts.delete_success"));
        loadParts();
        setTimeout(() => setActionSuccess(null), 3000);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || t("pages.parts.delete_error");
        toast.error(errorMessage);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPart(null);
    setFormData({
      name: "",
      article_number: "",
      description: "",
      barcode: "",
      qr_code: "",
      text_identifier: "",
      min_quantity: 5,
      group_id: "",
      subgroup_id: "",
    });
  };

  const handleShowModal = () => {
    setFormData({
      name: "",
      article_number: "",
      description: "",
      barcode: "",
      qr_code: "",
      text_identifier: "",
      min_quantity: 5,
      group_id: "",
      subgroup_id: "",
    });
    setShowModal(true);
  };

  const handleEdit = (part) => {
    setEditingPart(part);
    setFormData({
      name: part.name,
      article_number: part.article_number,
      description: part.description,
      barcode: part.barcode,
      qr_code: part.qr_code,
      text_identifier: part.text_identifier,
      min_quantity: part.min_quantity,
      group_id: part.group_id,
      subgroup_id: part.subgroup_id,
    });
    setShowModal(true);
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

      <PartsStats stats={stats} />

      <PartsQuickActions onAction={handleQuickAction} />

      <PartsFilter onFilterChange={handleFilterChange} />

      <Card className="border-0 shadow-sm">
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
            <div className="table-responsive">
              <Table striped bordered hover className="align-middle mb-0">
                <thead>
                  <tr>
                    <th>{t("pages.parts.name")}</th>
                    <th>{t("pages.parts.article_number")}</th>
                    <th>{t("pages.parts.quantity")}</th>
                    <th>{t("pages.parts.group")}</th>
                    <th>{t("pages.parts.identifiers")}</th>
                    <th>{t("common.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParts.length > 0 ? (
                    filteredParts.map((part) => (
                      <tr key={part.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <Icon
                              icon="ph:engine"
                              className="me-2 text-muted"
                              width="20"
                              height="20"
                            />
                            <div>
                              <div className="fw-medium">{part.name}</div>
                              <small className="text-muted">
                                {part.description}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>{part.article_number}</td>
                        <td>
                          <Badge
                            bg={
                              part.quantity === 0
                                ? "danger"
                                : part.quantity <= 5
                                ? "warning"
                                : "success"
                            }
                          >
                            {part.quantity} шт
                          </Badge>
                        </td>
                        <td>
                          {part.group_name && (
                            <>
                              <div>{part.group_name}</div>
                              <small className="text-muted">
                                {part.subgroup_name}
                              </small>
                            </>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            {part.barcode && (
                              <Badge bg="secondary" title="Штрих-код">
                                <Icon icon="mdi:barcode" className="me-1" />
                                {part.barcode}
                              </Badge>
                            )}
                            {part.qr_code && (
                              <Badge bg="info" title="QR-код">
                                <Icon icon="mdi:qrcode" className="me-1" />
                                {part.qr_code}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link
                              to={`/parts/${part.id}`}
                              className="btn btn-sm btn-outline-primary"
                              title={t("common.view")}
                            >
                              <Icon icon="tabler:eye" />
                            </Link>
                            <Button
                              variant="outline-info"
                              size="sm"
                              title={t("common.edit")}
                              onClick={() => handleEdit(part)}
                            >
                              <Icon icon="tabler:edit" />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              title={t("common.delete")}
                              onClick={() => handleDelete(part.id)}
                            >
                              <Icon icon="tabler:trash" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        {t("pages.parts.no_parts")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingPart
              ? t("pages.parts.edit_part")
              : t("pages.parts.add_part")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>{t("pages.parts.name")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>{t("pages.parts.article_number")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="article_number"
                    value={formData.article_number}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>{t("pages.parts.description")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>{t("pages.parts.barcode")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>{t("pages.parts.qr_code")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="qr_code"
                    value={formData.qr_code}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>{t("pages.parts.group")}</Form.Label>
                  <Form.Select
                    name="group_id"
                    value={formData.group_id}
                    onChange={handleChange}
                  >
                    <option value="">{t("common.select_option")}</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>{t("pages.parts.subgroup")}</Form.Label>
                  <Form.Select
                    name="subgroup_id"
                    value={formData.subgroup_id}
                    onChange={handleChange}
                    disabled={!formData.group_id}
                  >
                    <option value="">{t("common.select_option")}</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>{t("pages.parts.min_quantity")}</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    name="min_quantity"
                    value={formData.min_quantity}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>{t("pages.parts.text_identifier")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="text_identifier"
                    value={formData.text_identifier}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                {t("common.cancel")}
              </Button>
              <Button type="submit" variant="primary" disabled={formSubmitting}>
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
                ) : (
                  t("common.save")
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PartsLayer;
