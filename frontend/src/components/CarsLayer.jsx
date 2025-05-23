import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { CarsApi } from "../api/cars";

const CarsLayer = () => {
  const { t } = useTranslation();
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    engine_info: "",
  });

  const loadCars = async () => {
    try {
      const response = await CarsApi.getAll();
      setCars(response.data);
    } catch (error) {
      toast.error(t("pages.cars.load_error"));
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCar) {
        await CarsApi.update(editingCar.id, formData);
        toast.success(t("pages.cars.update_success"));
      } else {
        await CarsApi.create(formData);
        toast.success(t("pages.cars.create_success"));
      }
      setShowModal(false);
      setEditingCar(null);
      setFormData({ make: "", model: "", year: "", engine_info: "" });
      loadCars();
    } catch (error) {
      toast.error(t("pages.cars.save_error"));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("pages.cars.delete_confirm"))) {
      try {
        await CarsApi.delete(id);
        toast.success(t("pages.cars.delete_success"));
        loadCars();
      } catch (error) {
        toast.error(t("pages.cars.delete_error"));
      }
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData({
      make: car.make,
      model: car.model || "",
      year: car.year || "",
      engine_info: car.engine_info || "",
    });
    setShowModal(true);
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>{t("pages.cars.title")}</h2>
          <Button
            variant="primary"
            onClick={() => {
              setEditingCar(null);
              setFormData({ make: "", model: "", year: "", engine_info: "" });
              setShowModal(true);
            }}
          >
            {t("pages.cars.add_car")}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("pages.cars.car_make")}</th>
                    <th>{t("pages.cars.car_model")}</th>
                    <th>{t("pages.cars.year")}</th>
                    <th>{t("pages.cars.engine_info")}</th>
                    <th>{t("common.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id}>
                      <td>{car.id}</td>
                      <td>{car.make}</td>
                      <td>{car.model}</td>
                      <td>{car.year}</td>
                      <td>{car.engine_info}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(car)}
                        >
                          {t("common.edit")}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(car.id)}
                        >
                          {t("common.delete")}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCar ? t("pages.cars.edit_car") : t("pages.cars.add_car")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.cars.car_make")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("pages.cars.enter_make")}
                value={formData.make}
                onChange={(e) =>
                  setFormData({ ...formData, make: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.cars.car_model")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("pages.cars.enter_model")}
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.cars.year")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("pages.cars.enter_year")}
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.cars.engine_info")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("pages.cars.enter_engine_info")}
                value={formData.engine_info}
                onChange={(e) =>
                  setFormData({ ...formData, engine_info: e.target.value })
                }
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setShowModal(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button variant="primary" type="submit">
                {t("common.save")}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CarsLayer;
