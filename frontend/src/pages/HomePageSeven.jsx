import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import DashBoardLayerSeven from "../components/DashBoardLayerSeven";


const HomePageSeven = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* DashBoardLayerSeven */}
        <DashBoardLayerSeven />

      </MasterLayout>
    </>
  );
};

export default HomePageSeven;
