import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import AvatarLayer from "../components/AvatarLayer";


const AvatarPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* AvatarLayer */}
        <AvatarLayer />


      </MasterLayout>
    </>
  );
};

export default AvatarPage;
