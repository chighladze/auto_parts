import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import ProgressLayer from "../components/ProgressLayer";

const ProgressPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* ProgressLayer */}
        <ProgressLayer />

      </MasterLayout>

    </>
  );
};

export default ProgressPage; 
