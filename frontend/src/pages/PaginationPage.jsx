import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import PaginationLayer from "../components/PaginationLayer";



const PaginationPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* PaginationLayer */}
        <PaginationLayer />

      </MasterLayout>

    </>
  );
};

export default PaginationPage; 
