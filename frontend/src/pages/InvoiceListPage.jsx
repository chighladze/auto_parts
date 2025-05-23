import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import InvoiceListLayer from "../components/InvoiceListLayer";




const InvoiceListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* InvoiceListLayer */}
        <InvoiceListLayer />

      </MasterLayout>

    </>
  );
};

export default InvoiceListPage;
