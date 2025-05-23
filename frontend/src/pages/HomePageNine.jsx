import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import DashBoardLayerNine from "../components/DashBoardLayerNine";

const HomePageNine = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* DashBoardLayerNine */}
        <DashBoardLayerNine />
      </MasterLayout>
    </>
  );
};

export default HomePageNine;
