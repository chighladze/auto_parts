import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import DropdownLayer from "../components/DropdownLayer";


const DropdownPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* DropdownLayer */}
        <DropdownLayer />


      </MasterLayout>
    </>
  );
};

export default DropdownPage;
