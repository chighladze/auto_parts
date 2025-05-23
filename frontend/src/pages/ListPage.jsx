import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import ListLayer from "../components/ListLayer";




const ListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* ListLayer */}
        <ListLayer />

      </MasterLayout>

    </>
  );
};

export default ListPage; 
