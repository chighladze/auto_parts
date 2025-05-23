import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import FormValidationLayer from "../components/FormValidationLayer";


const FormValidationPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* FormValidationLayer */}
        <FormValidationLayer />

      </MasterLayout>

    </>
  );
};

export default FormValidationPage;
