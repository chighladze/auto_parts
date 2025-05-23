import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import ColorsLayer from "../components/ColorsLayer";


const ColorsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* ColorsLayer */}
        <ColorsLayer />


      </MasterLayout>
    </>
  );
};

export default ColorsPage;
