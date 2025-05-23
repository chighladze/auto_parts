import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const ROUTE_TRANSLATIONS = {
  "": ["components", "navigation.home"],
  brands: ["translation", "menu.brands"],
  cars: ["translation", "menu.cars"],
  "part-groups": ["translation", "menu.part_groups"],
  "part-subgroups": ["translation", "menu.part_subgroups"],
  warehouses: ["translation", "menu.warehouses"],
  sections: ["translation", "menu.sections"],
  parts: ["translation", "menu.parts_catalog"],
  inventory: ["translation", "menu.inventory"],
  scanner: ["translation", "menu.scanning"],
  "search-parts": ["translation", "menu.search_parts"],
  "low-stock": ["translation", "menu.low_stock"],
  profile: ["translation", "common.profile"],
  settings: ["translation", "common.settings"],
};

const Breadcrumbs = () => {
  const location = useLocation();
  const { t } = useTranslation(["components", "translation"]);

  const getTranslation = (path) => {
    const [namespace, key] = ROUTE_TRANSLATIONS[path] || ["translation", path];
    return t(key, { ns: namespace });
  };

  const renderHomeLink = () => (
    <Link to="/" className="d-flex align-items-center">
      <Icon
        icon="solar:home-smile-angle-outline"
        className="icon text-lg me-1"
      />
      {getTranslation("")}
    </Link>
  );

  const renderBreadcrumbItem = (name, routeTo, isLast) => (
    <li key={routeTo} className="breadcrumb-item">
      {isLast ? (
        <span className="text-muted">{getTranslation(name)}</span>
      ) : (
        <>
          <Link to={routeTo} className="text-primary">
            {routeTo === "/" ? renderHomeLink() : getTranslation(name)}
          </Link>
          <Icon icon="mdi:chevron-right" className="mx-2 text-muted" />
        </>
      )}
    </li>
  );

  if (location.pathname === "/") return null;

  const pathnames = location.pathname.split("/").filter(Boolean);
  const breadcrumbItems = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    return renderBreadcrumbItem(name, routeTo, isLast);
  });

  return (
    <nav aria-label="breadcrumb" className="mb-3">
      <ol className="breadcrumb d-flex align-items-center mb-0">
        <li className="breadcrumb-item">
          {renderHomeLink()}
          <Icon icon="mdi:chevron-right" className="mx-2 text-muted" />
        </li>
        {breadcrumbItems}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
