import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import AddUserLayer from "../components/AddUserLayer";


const AddUserPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* AddUserLayer */}
        <AddUserLayer />


      </MasterLayout>
    </>
  );
};

export default AddUserPage;
