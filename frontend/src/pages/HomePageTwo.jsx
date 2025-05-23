import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import DashBoardLayerTwo from "../components/DashBoardLayerTwo";


const HomePageTwo = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* DashBoardLayerTwo */}
        <DashBoardLayerTwo />

      </MasterLayout>
    </>
  );
};

export default HomePageTwo;
