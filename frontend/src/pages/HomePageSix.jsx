import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import DashBoardLayerSix from "../components/DashBoardLayerSix";


const HomePageSix = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* DashBoardLayerSix */}
        <DashBoardLayerSix />



      </MasterLayout>
    </>
  );
};

export default HomePageSix;
