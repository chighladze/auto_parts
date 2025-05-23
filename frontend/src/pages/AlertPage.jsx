import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import AlertLayer from "../components/AlertLayer";


const AlertPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* AlertLayer */}
        <AlertLayer />


      </MasterLayout>
    </>
  );
};

export default AlertPage;
