import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import TableBasicLayer from "../components/TableBasicLayer";

const TableBasicPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* TableBasicLayer */}
        <TableBasicLayer />

      </MasterLayout>

    </>
  );
};

export default TableBasicPage; 
