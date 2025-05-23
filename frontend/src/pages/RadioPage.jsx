import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import RadioLayer from "../components/RadioLayer";

const RadioPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* RadioLayer */}
        <RadioLayer />

      </MasterLayout>

    </>
  );
};

export default RadioPage; 
