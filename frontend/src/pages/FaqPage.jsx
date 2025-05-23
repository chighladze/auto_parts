import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqLayer from "../components/FaqLayer";


const FaqPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* FaqLayer */}
        <FaqLayer />


      </MasterLayout>
    </>
  );
};

export default FaqPage;
