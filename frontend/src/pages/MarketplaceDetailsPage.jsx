import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import MarketplaceDetailsLayer from "../components/MarketplaceDetailsLayer";



const MarketplaceDetailsPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* MarketplaceDetailsLayer */}
        <MarketplaceDetailsLayer />

      </MasterLayout>

    </>
  );
};

export default MarketplaceDetailsPage; 
