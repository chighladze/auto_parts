import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import KanbanLayer from "../components/KanbanLayer";




const KanbanPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* KanbanLayer */}
        <KanbanLayer />

      </MasterLayout>

    </>
  );
};

export default KanbanPage; 
