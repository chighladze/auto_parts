import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import UsersGridLayer from "../components/UsersGridLayer";


const UsersGridPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* UsersGridLayer */}
        <UsersGridLayer />

      </MasterLayout>

    </>
  );
};

export default UsersGridPage; 
