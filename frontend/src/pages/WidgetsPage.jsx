import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import WidgetsLayer from "../components/WidgetsLayer";


const WidgetsPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* WidgetsLayer */}
        <WidgetsLayer />

      </MasterLayout>

    </>
  );
};

export default WidgetsPage; 
