import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import DashBoardLayerThree from "../components/DashBoardLayerThree";


const HomePageThree = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* DashBoardLayerThree */}
        <DashBoardLayerThree />



      </MasterLayout>
    </>
  );
};

export default HomePageThree;
