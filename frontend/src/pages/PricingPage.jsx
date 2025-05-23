import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import PricingLayer from "../components/PricingLayer";

const PricingPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* PricingLayer */}
        <PricingLayer />

      </MasterLayout>

    </>
  );
};

export default PricingPage; 
