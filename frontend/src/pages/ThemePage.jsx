import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import ThemeLayer from "../components/ThemeLayer";

const ThemePage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* ThemeLayer */}
        <ThemeLayer />

      </MasterLayout>

    </>
  );
};

export default ThemePage; 
