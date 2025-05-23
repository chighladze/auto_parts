import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import FormPageLayer from "../components/FormPageLayer";



const FormPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* FormPageLayer */}
        <FormPageLayer />

      </MasterLayout>

    </>
  );
};

export default FormPage;
