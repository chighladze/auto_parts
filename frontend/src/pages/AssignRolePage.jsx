import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import AssignRoleLayer from "../components/AssignRoleLayer";


const AssignRolePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* AssignRoleLayer */}
        <AssignRoleLayer />


      </MasterLayout>
    </>
  );
};

export default AssignRolePage;
