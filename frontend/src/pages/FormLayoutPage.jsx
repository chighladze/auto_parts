import React from "react";
import FormLayoutLayer from "../components/FormLayoutLayer";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";


const FormLayoutPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* FormLayoutLayer */}
        <FormLayoutLayer />

      </MasterLayout>

    </>
  );
};

export default FormLayoutPage;
