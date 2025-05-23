import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import InvoiceAddLayer from "../components/InvoiceAddLayer";




const InvoiceAddPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* InvoiceAddLayer */}
        <InvoiceAddLayer />

      </MasterLayout>

    </>
  );
};

export default InvoiceAddPage;
