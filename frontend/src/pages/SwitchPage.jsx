import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import SwitchLayer from "../components/SwitchLayer";

const SwitchPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* SwitchLayer */}
        <SwitchLayer />

      </MasterLayout>

    </>
  );
};

export default SwitchPage; 
