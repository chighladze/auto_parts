import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import BadgesLayer from "../components/BadgesLayer";


const BadgesPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* BadgesLayer */}
        <BadgesLayer />


      </MasterLayout>
    </>
  );
};

export default BadgesPage;
