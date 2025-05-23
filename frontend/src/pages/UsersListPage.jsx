import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import UsersListLayer from "../components/UsersListLayer";


const UsersListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* UsersListLayer */}
        <UsersListLayer />

      </MasterLayout>

    </>
  );
};

export default UsersListPage; 
