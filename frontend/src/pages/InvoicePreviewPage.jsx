import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import InvoicePreviewLayer from "../components/InvoicePreviewLayer";




const InvoicePreviewPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* InvoicePreviewLayer */}
        <InvoicePreviewLayer />

      </MasterLayout>

    </>
  );
};

export default InvoicePreviewPage;
