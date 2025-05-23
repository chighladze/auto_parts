import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import DashBoardLayerFive from "../components/DashBoardLayerFive";


const HomePageFive = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* DashBoardLayerFive */}
        <DashBoardLayerFive />



      </MasterLayout>
    </>
  );
};

export default HomePageFive;
