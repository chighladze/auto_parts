import { Icon } from "@iconify/react";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

// Определяем полную структуру навигации с вложенностью
const navigationStructure = {
  dashboard: {
    path: "/",
    children: {
      home: { path: "/" },
    },
  },
  "parts-management": {
    isGroup: true,
    children: {
      warehouses: { path: "/warehouses" },
      sections: { path: "/sections" },
      parts: { path: "/parts" },
    },
  },
  catalog: {
    isGroup: true,
    children: {
      brands: { path: "/brands" },
      "part-groups": { path: "/part-groups" },
      "part-subgroups": { path: "/part-subgroups" },
    },
  },
  inventory: {
    isGroup: true,
    children: {
      inventory: { path: "/inventory" },
      "low-stock": { path: "/low-stock" },
      scanner: { path: "/scanner" },
      "search-parts": { path: "/search-parts" },
    },
  },
};

const Breadcrumb = ({ title }) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Находим родительский раздел для текущего пути
  const findParentSection = useCallback((path) => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return null;

    const currentSegment = segments[segments.length - 1];

    // Проходим по всем секциям
    for (const [sectionKey, sectionConfig] of Object.entries(
      navigationStructure
    )) {
      // Проверяем есть ли дети в секции
      if (sectionConfig.children) {
        // Проходим по всем детям секции
        for (const [childKey, childConfig] of Object.entries(
          sectionConfig.children
        )) {
          if (
            childConfig.path === `/${currentSegment}` ||
            childKey === currentSegment
          ) {
            // Возвращаем название секции только если это группа
            return sectionConfig.isGroup ? sectionKey : null;
          }
        }
      }
    }
    return null;
  }, []);

  const getPathSegments = useCallback(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const result = [];

    if (segments.length === 0) return result;

    let currentPath = "";

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;

      // Пропускаем системные пути
      if (
        ["login", "sign-up", "forgot-password", "access-denied"].includes(
          segment
        )
      ) {
        continue;
      }

      // Пропускаем ID в URL
      const isIdSegment = /^\d+$/.test(segment);
      const isPreviousSegmentParam =
        i > 0 && ["parts", "cars", "brands"].includes(segments[i - 1]);
      if (isIdSegment && isPreviousSegmentParam) continue;

      // Находим группу для текущего сегмента
      const groupSection = findParentSection(currentPath);

      if (groupSection) {
        // Добавляем группу в путь
        const groupTranslationKey = `menu.${groupSection.replace(/-/g, "_")}`;
        result.push({
          path: currentPath,
          raw: groupSection,
          title: t(groupTranslationKey),
          isParent: true,
        });
      }

      // Добавляем текущий сегмент
      const translationKey = `menu.${segment.replace(/-/g, "_")}`;
      const translatedTitle = t(translationKey, segment);

      result.push({
        path: currentPath,
        raw: segment,
        title:
          translatedTitle !== translationKey
            ? translatedTitle
            : segment
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
        isParent: false,
      });
    }

    return result;
  }, [location.pathname, t, findParentSection]);

  const pathSegments = useMemo(() => getPathSegments(), [getPathSegments]);

  const pageTitle = useMemo(
    () =>
      title ||
      (pathSegments.length > 0
        ? pathSegments[pathSegments.length - 1].title
        : t("menu.home")),
    [title, pathSegments, t]
  );

  // Если мы на главной странице, показываем только Home
  if (location.pathname === "/") {
    return (
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 className="fw-semibold mb-0">{t("menu.home")}</h6>
        <nav aria-label="breadcrumb">
          <ol
            className="d-flex align-items-center gap-2 m-0 p-0"
            style={{ listStyle: "none" }}
          >
            <li className="fw-medium">
              <span className="text-primary d-flex align-items-center gap-1">
                <Icon
                  icon="solar:home-smile-angle-outline"
                  className="icon text-lg"
                />
                {t("menu.home")}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    );
  }

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
      <h6 className="fw-semibold mb-0">{pageTitle}</h6>
      <nav aria-label="breadcrumb">
        <ol
          className="d-flex align-items-center gap-2 m-0 p-0"
          style={{ listStyle: "none" }}
        >
          <li className="fw-medium">
            <Link
              to="/"
              className="d-flex align-items-center gap-1 hover-text-primary"
            >
              <Icon
                icon="solar:home-smile-angle-outline"
                className="icon text-lg"
              />
              {t("menu.home")}
            </Link>
          </li>
          {pathSegments.map((segment, index) => (
            <React.Fragment key={`${segment.path}-${index}`}>
              <li className="text-gray-400" aria-hidden="true">
                {" "}
                /{" "}
              </li>
              <li className="fw-medium">
                {index === pathSegments.length - 1 ? (
                  <span className="text-primary" aria-current="page">
                    {segment.title}
                  </span>
                ) : (
                  <Link
                    to={segment.path}
                    className={`hover-text-primary ${
                      segment.isParent ? "text-secondary" : ""
                    }`}
                  >
                    {segment.title}
                  </Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
