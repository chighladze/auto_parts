import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Card, Form, Modal, Spinner, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../components/Breadcrumbs";
import MasterLayout from "../masterLayout/MasterLayout";
import { sectionService, warehouseService } from "../services";

const SectionPage = () => {
  const { t } = useTranslation();
  const [sections, setSections] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    warehouse_id: ''
  });
  const [formError, setFormError] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const loadSectionsAndWarehouses = useCallback(async () => {
    try {
      setLoading(true);
      const [sectionsData, warehousesData] = await Promise.all([
        sectionService.getAllSections(),
        warehouseService.getAllWarehouses()
      ]);
      setSections(sectionsData);
      setWarehouses(warehousesData);
      setError(null);
    } catch (err) {
      setError(t("section.load_error", { error: err.message }));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadSectionsAndWarehouses();
  }, [loadSectionsAndWarehouses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSubmitting(true);
    
    try {
      const sectionData = {
        ...formData,
        warehouse_id: parseInt(formData.warehouse_id, 10)
      };
      
      if (currentSection) {
        await sectionService.updateSection(currentSection.id, sectionData);
        setActionSuccess(t("section.success.updated"));
      } else {
        await sectionService.createSection(sectionData);
        setActionSuccess(t("section.success.added"));
      }
      
      loadSectionsAndWarehouses();
      handleCloseModal();
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      setFormError(t("section.save_error", { error: err.message }));
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("section.delete_confirm"))) {
      try {
        setLoading(true);
        await sectionService.deleteSection(id);
        setActionSuccess(t("section.success.deleted"));
        loadSectionsAndWarehouses();
        setTimeout(() => setActionSuccess(null), 3000);
      } catch (err) {
        setError(t("section.delete_error", { error: err.message }));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentSection(null);
    setFormData({ code: '', warehouse_id: '' });
    setFormError(null);
  };

  const handleShowAddModal = () => {
    setFormData({ code: '', warehouse_id: warehouses.length > 0 ? warehouses[0].id.toString() : '' });
    setShowAddModal(true);
  };

  const handleShowEditModal = (section) => {
    setCurrentSection(section);
    setFormData({
      code: section.code,
      warehouse_id: section.warehouse_id.toString()
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find(w => w.id === warehouseId);
    return warehouse ? warehouse.name : t("common.not_found");
  };

  return (
    <MasterLayout>
      <Breadcrumbs />
      
      <div className="container-fluid">
        {actionSuccess && (
          <Alert variant="success" dismissible onClose={() => setActionSuccess(null)}>
            {actionSuccess}
          </Alert>
        )}

        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5>{t("section.sections_list")}</h5>
            <Button onClick={handleShowAddModal} variant="primary">
              {t("section.add_section")}
            </Button>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
            
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
                    <th>ID</th>
                    <th>{t("section.section_code")}</th>
                    <th>{t("section.warehouse")}</th>
                    <th>{t("common.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.length > 0 ? (
                    sections.map(section => (
                      <tr key={section.id}>
                        <td>{section.id}</td>
                        <td>{section.code}</td>
                        <td>{getWarehouseName(section.warehouse_id)}</td>
                        <td>
                          <Button 
                            variant="info" 
                            size="sm" 
                            className="me-2"
                            onClick={() => handleShowEditModal(section)}
                          >
                            {t("common.edit")}
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm"
                            onClick={() => handleDelete(section.id)}
                          >
                            {t("common.delete")}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        {t("section.no_sections_found")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </div>

      <Modal show={showAddModal || showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {showAddModal ? t("section.add_new_section") : t("section.edit_section")}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {formError && <Alert variant="danger">{formError}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label>{t("section.section_code")}</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                placeholder={t("section.enter_section_code")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("section.warehouse")}</Form.Label>
              <Form.Select 
                name="warehouse_id" 
                value={formData.warehouse_id}
                onChange={handleChange}
                required
              >
                <option value="">{t("section.select_warehouse")}</option>
                {warehouses.map(warehouse => (
                  <option key={warehouse.id} value={warehouse.id.toString()}>
                    {warehouse.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              {t("common.cancel")}
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={formSubmitting}
            >
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
                showAddModal ? t("common.add") : t("common.save")
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </MasterLayout>
  );
};

export default SectionPage;