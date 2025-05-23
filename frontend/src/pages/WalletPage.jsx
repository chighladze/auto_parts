import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import WalletLayer from "../components/WalletLayer";


const WalletPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* WalletLayer */}
        <WalletLayer />

      </MasterLayout>

    </>
  );
};

export default WalletPage; 
