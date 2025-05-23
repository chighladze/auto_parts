import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import InvoiceEditLayer from "../components/InvoiceEditLayer";




const InvoiceEditPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* InvoiceEditLayer */}
        <InvoiceEditLayer />

      </MasterLayout>

    </>
  );
};

export default InvoiceEditPage;
