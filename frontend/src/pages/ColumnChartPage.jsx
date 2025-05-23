import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import ColumnChartLayer from "../components/ColumnChartLayer";


const ColumnChartPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* ColumnChartLayer */}
        <ColumnChartLayer />


      </MasterLayout>
    </>
  );
};

export default ColumnChartPage;
