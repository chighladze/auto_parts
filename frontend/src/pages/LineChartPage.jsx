import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import LineChartLayer from "../components/LineChartLayer";




const LineChartPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* LineChartLayer */}
        <LineChartLayer />

      </MasterLayout>

    </>
  );
};

export default LineChartPage; 
