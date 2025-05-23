import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import TabsLayer from "../components/TabsLayer";

const TabsPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* TabsLayer */}
        <TabsLayer />

      </MasterLayout>

    </>
  );
};

export default TabsPage; 
