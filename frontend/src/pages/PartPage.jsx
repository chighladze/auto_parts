import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Form, Modal, Spinner, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MasterLayout from '../masterLayout/MasterLayout';
import partService from '../services/partService';

const PartPage = () => {
  const { t } = useTranslation(['parts', 'translation']);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPart, setCurrentPart] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    article_number: '',
    barcode: '',
    qr_code: '',
    text_identifier: ''
  });
  const [formError, setFormError] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const loadParts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const partsData = await partService.getAllParts();
      setParts(partsData);
    } catch (err) {
      setError(t("parts.load_error", { error: err.message }) || 'Ошибка при загрузке запчастей');
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadParts();
  }, [loadParts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSubmitting(true);

    try {
      if (!formData.name.trim() || !formData.article_number.trim()) {
        setFormError(t("parts.validation.required_fields") || 'Заполните обязательные поля');
        return;
      }

      if (currentPart) {
        await partService.updatePart(currentPart.id, formData);
        setActionSuccess(t("parts.success.updated") || 'Запчасть успешно обновлена');
      } else {
        await partService.createPart(formData);
        setActionSuccess(t("parts.success.added") || 'Запчасть успешно добавлена');
      }

      await loadParts();
      handleCloseModal();
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      setFormError(t("parts.save_error", { error: err.message }) || 'Ошибка при сохранении запчасти');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("parts.delete_confirm") || 'Вы уверены, что хотите удалить эту запчасть?')) {
      try {
        setLoading(true);
        await partService.deletePart(id);
        setActionSuccess(t("parts.success.deleted") || 'Запчасть успешно удалена');
        loadParts();
        setTimeout(() => setActionSuccess(null), 3000);
      } catch (err) {
        setError(t("parts.delete_error", { error: err.message }) || 'Ошибка при удалении запчасти');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentPart(null);
    setFormData({
      name: '',
      article_number: '',
      barcode: '',
      qr_code: '',
      text_identifier: ''
    });
    setFormError(null);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowEditModal = (part) => {
    setCurrentPart(part);
    setFormData({
      name: part.name,
      article_number: part.article_number,
      barcode: part.barcode || '',
      qr_code: part.qr_code || '',
      text_identifier: part.text_identifier || ''
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value.trim() === '' ? null : value
    }));
  };

  return (
    <MasterLayout>
      <div className="content-wrapper">
        <div className="d-flex justify-content-between align-items-center p-4">
          <div>
            <Button variant="primary" onClick={handleShowAddModal}>
              <i className="fas fa-plus me-2"></i>
              {t("parts.add_part") || "Добавить запчасть"}
            </Button>
          </div>
          {actionSuccess && (
            <Alert variant="success" className="mb-0 py-2" dismissible onClose={() => setActionSuccess(null)}>
              {actionSuccess}
            </Alert>
          )}
        </div>

        <div className="px-4">
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="text-center p-4">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">{t("common.loading") || "Загрузка..."}</span>
              </Spinner>
              <p className="mt-2">{t("common.loading_data") || "Загрузка данных..."}</p>
            </div>
          ) : (
            <Table responsive striped hover className="align-middle">
              <thead>
                <tr>
                  <th>{t("name", { ns: 'parts' })}</th>
                  <th>{t("parts.article") || "Артикул"}</th>
                  <th>{t("parts.barcode") || "Штрих-код"}</th>
                  <th>{t("parts.qr_code") || "QR-код"}</th>
                  <th>{t("parts.text_id") || "Текстовый ID"}</th>
                  <th className="text-end">{t("common.actions") || "Действия"}</th>
                </tr>
              </thead>
              <tbody>
                {parts.length > 0 ? (
                  parts.map(part => (
                    <tr key={part.id}>
                      <td>{part.name}</td>
                      <td>{part.article_number}</td>
                      <td>{part.barcode || '-'}</td>
                      <td>{part.qr_code || '-'}</td>
                      <td>{part.text_identifier || '-'}</td>
                      <td className="text-end">
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleShowEditModal(part)}
                        >
                          <i className="fas fa-edit me-1"></i>
                          {t("common.edit") || "Редактировать"}
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(part.id)}
                        >
                          <i className="fas fa-trash-alt me-1"></i>
                          {t("common.delete") || "Удалить"}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      {t("parts.no_parts_found") || "Запчасти не найдены"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      <Modal show={showAddModal || showEditModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {showAddModal
              ? (t("parts.add_new_part") || "Добавить новую запчасть")
              : (t("parts.edit_part") || "Редактировать запчасть")
            }
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {formError && <Alert variant="danger">{formError}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>
                {t("name", { ns: 'parts' }) || "Название"} <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t("parts.enter_name") || "Введите название запчасти"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                {t("parts.article") || "Артикул"} <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="article_number"
                value={formData.article_number}
                onChange={handleChange}
                required
                placeholder={t("parts.enter_article") || "Введите артикул"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("parts.barcode") || "Штрих-код"}</Form.Label>
              <Form.Control
                type="text"
                name="barcode"
                value={formData.barcode || ''}
                onChange={handleChange}
                placeholder={t("parts.enter_barcode") || "Введите штрих-код"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("parts.qr_code") || "QR-код"}</Form.Label>
              <Form.Control
                type="text"
                name="qr_code"
                value={formData.qr_code || ''}
                onChange={handleChange}
                placeholder={t("parts.enter_qr_code") || "Введите QR-код"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("parts.text_id") || "Текстовый идентификатор"}</Form.Label>
              <Form.Control
                type="text"
                name="text_identifier"
                value={formData.text_identifier || ''}
                onChange={handleChange}
                placeholder={t("parts.enter_text_id") || "Введите текстовый идентификатор"}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              {t("common.cancel") || "Отмена"}
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
                  {t("common.saving") || "Сохранение..."}
                </>
              ) : (
                showAddModal ? (t("common.add") || "Добавить") : (t("common.save") || "Сохранить")
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </MasterLayout>
  );
};

export default PartPage;