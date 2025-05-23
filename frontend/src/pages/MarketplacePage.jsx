import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import MarketplaceLayer from "../components/MarketplaceLayer";



const MarketplacePage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* MarketplaceLayer */}
        <MarketplaceLayer />

      </MasterLayout>

    </>
  );
};

export default MarketplacePage; 
