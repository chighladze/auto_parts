import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import ViewDetailsLayer from "../components/ViewDetailsLayer";


const ViewDetailsPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* ViewDetailsLayer */}
        <ViewDetailsLayer />

      </MasterLayout>

    </>
  );
};

export default ViewDetailsPage; 
