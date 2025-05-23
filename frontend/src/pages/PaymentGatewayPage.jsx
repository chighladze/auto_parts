import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import PaymentGatewayLayer from "../components/PaymentGatewayLayer";



const PaymentGatewayPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* PaymentGatewayLayer */}
        <PaymentGatewayLayer />

      </MasterLayout>

    </>
  );
};

export default PaymentGatewayPage; 
