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
import { PartGroupsApi } from "../api/partGroups";

const PartGroupsLayer = () => {
  const { t } = useTranslation();
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const loadGroups = useCallback(async () => {
    try {
      setLoading(true);
      const response = await PartGroupsApi.getAll();
      setGroups(response.data);
      setError(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("pages.part_groups.load_error");
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      if (!formData.name.trim() || !formData.code.trim()) {
        toast.error(t("pages.part_groups.required_fields"));
        return;
      }

      if (editingGroup) {
        await PartGroupsApi.update(editingGroup.id, formData);
        setActionSuccess(t("pages.part_groups.update_success"));
      } else {
        await PartGroupsApi.create(formData);
        setActionSuccess(t("pages.part_groups.create_success"));
      }
      handleCloseModal();
      loadGroups();
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("pages.part_groups.save_error");
      toast.error(errorMessage);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("common.confirm_delete"))) {
      try {
        await PartGroupsApi.delete(id);
        setActionSuccess(t("pages.part_groups.delete_success"));
        loadGroups();
        setTimeout(() => setActionSuccess(null), 3000);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || t("pages.part_groups.delete_error");
        toast.error(errorMessage);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingGroup(null);
    setFormData({ name: "", code: "", description: "" });
  };

  const handleShowModal = () => {
    setFormData({ name: "", code: "", description: "" });
    setShowModal(true);
  };

  const handleEdit = (group) => {
    setEditingGroup(group);
    setFormData({
      name: group.name,
      code: group.code,
      description: group.description || "",
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
          <h5 className="mb-0">{t("pages.part_groups.title")}</h5>
          <Button variant="primary" onClick={handleShowModal}>
            <Icon icon="mdi:plus" className="me-1" />
            {t("pages.part_groups.add_group")}
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
                  <th>{t("pages.part_groups.id")}</th>
                  <th>{t("pages.part_groups.code")}</th>
                  <th>{t("pages.part_groups.name")}</th>
                  <th>{t("pages.part_groups.description")}</th>
                  <th>{t("common.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {groups.length > 0 ? (
                  groups.map((group) => (
                    <tr key={group.id}>
                      <td>{group.id}</td>
                      <td>{group.code}</td>
                      <td>{group.name}</td>
                      <td>{group.description || "-"}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(group)}
                        >
                          {t("common.edit")}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(group.id)}
                        >
                          {t("common.delete")}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      {t("pages.part_groups.no_groups")}
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
            {editingGroup
              ? t("pages.part_groups.edit_group")
              : t("pages.part_groups.add_group")}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.part_groups.code")}</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                placeholder={t("pages.part_groups.enter_code")}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.part_groups.name")}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t("pages.part_groups.enter_name")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.part_groups.description")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t("pages.part_groups.enter_description")}
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
              ) : editingGroup ? (
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

export default PartGroupsLayer;
