import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import BlankPageLayer from "../components/BlankPageLayer";

const BlankPagePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* BlankPageLayer */}
        <BlankPageLayer />
      </MasterLayout>
    </>
  );
};

export default BlankPagePage;
