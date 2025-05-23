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
import { PartGroupsApi } from "../api/partGroups";
import { PartSubgroupsApi } from "../api/partSubgroups";

const PartSubgroupsLayer = () => {
  const { t } = useTranslation();
  const [subgroups, setSubgroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSubgroup, setEditingSubgroup] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    group_id: "",
  });

  const loadData = async () => {
    try {
      const [groupsResponse, subgroupsResponse] = await Promise.all([
        PartGroupsApi.getAll(),
        PartSubgroupsApi.getAll(),
      ]);
      setGroups(groupsResponse.data);
      setSubgroups(subgroupsResponse.data);
    } catch (error) {
      toast.error(t("pages.part_subgroups.load_error"));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubgroup) {
        await PartSubgroupsApi.update(editingSubgroup.id, formData);
        toast.success(t("pages.part_subgroups.update_success"));
      } else {
        await PartSubgroupsApi.create(formData);
        toast.success(t("pages.part_subgroups.create_success"));
      }
      setShowModal(false);
      setEditingSubgroup(null);
      setFormData({ name: "", code: "", description: "", group_id: "" });
      loadData();
    } catch (error) {
      toast.error(t("pages.part_subgroups.save_error"));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("pages.part_subgroups.delete_confirm"))) {
      try {
        await PartSubgroupsApi.delete(id);
        toast.success(t("pages.part_subgroups.delete_success"));
        loadData();
      } catch (error) {
        toast.error(t("pages.part_subgroups.delete_error"));
      }
    }
  };

  const handleEdit = (subgroup) => {
    setEditingSubgroup(subgroup);
    setFormData({
      name: subgroup.name,
      code: subgroup.code || "",
      description: subgroup.description || "",
      group_id: subgroup.group_id || "",
    });
    setShowModal(true);
  };

  const getGroupName = (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    return group ? group.name : "-";
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>{t("pages.part_subgroups.title")}</h2>
          <Button
            variant="primary"
            onClick={() => {
              setEditingSubgroup(null);
              setFormData({
                name: "",
                code: "",
                description: "",
                group_id: "",
              });
              setShowModal(true);
            }}
          >
            {t("pages.part_subgroups.add_subgroup")}
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
                    <th>{t("pages.part_subgroups.subgroup_name")}</th>
                    <th>{t("pages.part_subgroups.subgroup_code")}</th>
                    <th>{t("pages.part_subgroups.parent_group")}</th>
                    <th>{t("pages.part_subgroups.description")}</th>
                    <th>{t("common.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {subgroups.map((subgroup) => (
                    <tr key={subgroup.id}>
                      <td>{subgroup.id}</td>
                      <td>{subgroup.name}</td>
                      <td>{subgroup.code}</td>
                      <td>{getGroupName(subgroup.group_id)}</td>
                      <td>{subgroup.description}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(subgroup)}
                        >
                          {t("common.edit")}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(subgroup.id)}
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
            {editingSubgroup
              ? t("pages.part_subgroups.edit_subgroup")
              : t("pages.part_subgroups.add_subgroup")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.part_subgroups.subgroup_name")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("pages.part_subgroups.enter_subgroup_name")}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.part_subgroups.subgroup_code")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("pages.part_subgroups.enter_subgroup_code")}
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.part_subgroups.parent_group")}</Form.Label>
              <Form.Select
                value={formData.group_id}
                onChange={(e) =>
                  setFormData({ ...formData, group_id: e.target.value })
                }
                required
              >
                <option value="">
                  {t("pages.part_subgroups.select_parent_group")}
                </option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("pages.part_subgroups.description")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={t("pages.part_subgroups.enter_description")}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
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

export default PartSubgroupsLayer;
