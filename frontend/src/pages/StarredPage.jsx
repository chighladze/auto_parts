import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import StarredLayer from "../components/StarredLayer";

const StarredPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* StarredLayer */}
        <StarredLayer />

      </MasterLayout>

    </>
  );
};

export default StarredPage; 
