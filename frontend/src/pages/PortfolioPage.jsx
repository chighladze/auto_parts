import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import PortfolioLayer from "../components/PortfolioLayer";

const PortfolioPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* PortfolioLayer */}
        <PortfolioLayer />

      </MasterLayout>

    </>
  );
};

export default PortfolioPage; 
