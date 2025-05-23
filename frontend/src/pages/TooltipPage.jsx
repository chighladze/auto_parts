import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import TooltipLayer from "../components/TooltipLayer";

const TooltipPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* TooltipLayer */}
        <TooltipLayer />

      </MasterLayout>

    </>
  );
};

export default TooltipPage; 
