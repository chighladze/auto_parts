import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import TypographyLayer from "../components/TypographyLayer";


const TypographyPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* TypographyLayer */}
        <TypographyLayer />

      </MasterLayout>

    </>
  );
};

export default TypographyPage; 
