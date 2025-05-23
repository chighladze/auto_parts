import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import DashBoardLayerFour from "../components/DashBoardLayerFour";


const HomePageFour = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />


        {/* DashBoardLayerFour */}
        <DashBoardLayerFour />


      </MasterLayout>
    </>
  );
};

export default HomePageFour;
