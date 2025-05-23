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
import { InventoryApi } from "../api/inventory";

const InventoryLayer = () => {
  const { t } = useTranslation();
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    part_id: "",
    section_id: "",
    quantity: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const loadInventory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await InventoryApi.getAll();
      setInventory(response.data);
      setError(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("pages.inventory.load_error");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      if (editingItem) {
        await InventoryApi.update(editingItem.id, formData);
        setActionSuccess(t("pages.inventory.update_success"));
      } else {
        await InventoryApi.create(formData);
        setActionSuccess(t("pages.inventory.create_success"));
      }
      handleCloseModal();
      loadInventory();
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("pages.inventory.save_error");
      toast.error(errorMessage);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("common.confirm_delete"))) {
      try {
        await InventoryApi.delete(id);
        setActionSuccess(t("pages.inventory.delete_success"));
        loadInventory();
        setTimeout(() => setActionSuccess(null), 3000);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || t("pages.inventory.delete_error");
        toast.error(errorMessage);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ part_id: "", section_id: "", quantity: 0 });
  };

  const handleShowModal = () => {
    setFormData({ part_id: "", section_id: "", quantity: 0 });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      part_id: item.part_id,
      section_id: item.section_id,
      quantity: item.quantity,
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

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{t("pages.inventory.title")}</h5>
          <Button variant="primary" onClick={handleShowModal}>
            <Icon icon="mdi:plus" className="me-1" />
            {t("pages.inventory.add_item")}
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
                  <th>{t("pages.inventory.id")}</th>
                  <th>{t("pages.inventory.part")}</th>
                  <th>{t("pages.inventory.section")}</th>
                  <th>{t("pages.inventory.quantity")}</th>
                  <th>{t("common.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {inventory.length > 0 ? (
                  inventory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.part?.name || item.part_id}</td>
                      <td>{item.section?.code || item.section_id}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(item)}
                        >
                          {t("common.edit")}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          {t("common.delete")}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      {t("pages.inventory.no_items")}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingItem
              ? t("pages.inventory.edit_item")
              : t("pages.inventory.add_item")}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.inventory.part")}</Form.Label>
              <Form.Control
                type="text"
                name="part_id"
                value={formData.part_id}
                onChange={handleChange}
                required
                placeholder={t("pages.inventory.select_part")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.inventory.section")}</Form.Label>
              <Form.Control
                type="text"
                name="section_id"
                value={formData.section_id}
                onChange={handleChange}
                required
                placeholder={t("pages.inventory.select_section")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.inventory.quantity")}</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
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
              ) : editingItem ? (
                t("common.save")
              ) : (
                t("common.add")
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryLayer;
