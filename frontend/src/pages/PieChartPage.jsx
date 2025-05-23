import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import PieChartLayer from "../components/PieChartLayer";

const PieChartPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* PieChartLayer */}
        <PieChartLayer />

      </MasterLayout>

    </>
  );
};

export default PieChartPage; 
