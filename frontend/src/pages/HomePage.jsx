import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, Col, Row, Spinner, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ApiErrorAlert from "../components/ApiErrorAlert";
import MasterLayout from "../masterLayout/MasterLayout";
import {
  inventoryService,
  partService,
  sectionService,
  warehouseService,
} from "../services";

const HomePage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    totalWarehouses: 0,
    totalSections: 0,
    totalParts: 0,
    totalInventoryItems: 0,
    lowStockItems: 0,
  });
  const [recentParts, setRecentParts] = useState([]);
  const [inventoryStats, setInventoryStats] = useState({
    categories: [],
    data: [],
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // Загрузка основных данных
        const [warehouses, sections, parts, inventory] = await Promise.all([
          warehouseService.getAllWarehouses(),
          sectionService.getAllSections(),
          partService.getAllParts(),
          inventoryService.getAllInventory(),
        ]);

        // Расчет общей статистики
        const lowStock = inventory.filter((item) => item.quantity < 5).length;
        setSummary({
          totalWarehouses: warehouses.length,
          totalSections: sections.length,
          totalParts: parts.length,
          totalInventoryItems: inventory.length,
          lowStockItems: lowStock,
        });

        // Последние добавленные запчасти
        const sortedParts = [...parts].sort((a, b) => b.id - a.id).slice(0, 5);
        setRecentParts(sortedParts);

        // Подготовка данных для графика
        const categories = ["В наличии", "Мало", "Нет в наличии"];
        const stockData = [
          inventory.filter((item) => item.quantity >= 5).length,
          inventory.filter((item) => item.quantity > 0 && item.quantity < 5)
            .length,
          inventory.filter((item) => item.quantity === 0).length,
        ];
        setInventoryStats({ categories, data: stockData });

        setError(null);
      } catch (err) {
        setError(t("common.load_error", { error: err.message }));
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [t]);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: inventoryStats.categories,
    },
    yaxis: {
      title: {
        text: "Количество позиций",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " позиций";
        },
      },
    },
  };

  const chartSeries = [
    {
      name: "Запчасти",
      data: inventoryStats.data,
    },
  ];

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

  if (error) {
    return (
      <MasterLayout>
        <div className="content-wrapper p-4">
          <ApiErrorAlert message={error} />
        </div>
      </MasterLayout>
    );
  }

  return (
    <MasterLayout>
      <div className="content-wrapper p-4">
        {/* Статистика */}
        <Row className="mb-4">
          <Col lg={2} sm={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle bg-primary-100 p-3 me-3">
                  <Icon
                    icon="mdi:warehouse"
                    className="text-primary"
                    width="24"
                    height="24"
                  />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">{summary.totalWarehouses}</h3>
                  <p className="text-muted mb-0">{t("menu.warehouses")}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} sm={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle bg-success-100 p-3 me-3">
                  <Icon
                    icon="fluent:cube-16-regular"
                    className="text-success"
                    width="24"
                    height="24"
                  />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">{summary.totalSections}</h3>
                  <p className="text-muted mb-0">{t("menu.sections")}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} sm={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle bg-info-100 p-3 me-3">
                  <Icon
                    icon="ph:engine"
                    className="text-info"
                    width="24"
                    height="24"
                  />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">{summary.totalParts}</h3>
                  <p className="text-muted mb-0">{t("menu.parts_catalog")}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle bg-purple-100 p-3 me-3">
                  <Icon
                    icon="mdi:clipboard-text-outline"
                    className="text-purple"
                    width="24"
                    height="24"
                  />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">
                    {summary.totalInventoryItems}
                  </h3>
                  <p className="text-muted mb-0">{t("menu.inventory")}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle bg-warning-100 p-3 me-3">
                  <Icon
                    icon="mdi:alert-circle-outline"
                    className="text-warning"
                    width="24"
                    height="24"
                  />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">{summary.lowStockItems}</h3>
                  <p className="text-muted mb-0">{t("menu.low_stock")}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* График и таблица */}
        <Row>
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Статистика наличия</h5>
              </Card.Header>
              <Card.Body>
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="bar"
                  height={350}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Последние добавленные</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Название</th>
                        <th>Артикул</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentParts.map((part) => (
                        <tr key={part.id}>
                          <td>{part.name}</td>
                          <td>{part.article_number}</td>
                          <td className="text-end">
                            <Link
                              to={`/parts/${part.id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              <Icon icon="tabler:eye" className="me-1" />
                              Просмотр
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Быстрые действия */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0">Быстрые действия</h5>
          </Card.Header>
          <Card.Body>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/search-parts" className="btn btn-outline-primary">
                <Icon icon="ri:search-line" className="me-2" />
                Поиск запчастей
              </Link>
              <Link to="/scanner" className="btn btn-outline-success">
                <Icon icon="mdi:barcode-scan" className="me-2" />
                Сканировать
              </Link>
              <Link to="/parts" className="btn btn-outline-info">
                <Icon icon="ph:engine" className="me-2" />
                Каталог запчастей
              </Link>
              <Link to="/low-stock" className="btn btn-outline-warning">
                <Icon icon="mdi:alert-circle-outline" className="me-2" />
                Низкий запас
              </Link>
              <Link to="/warehouses" className="btn btn-outline-secondary">
                <Icon icon="mdi:warehouse" className="me-2" />
                Управление складами
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </MasterLayout>
  );
};

export default HomePage;
