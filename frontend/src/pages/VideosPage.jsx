import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import VideosLayer from "../components/VideosLayer";


const VideosPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* VideosLayer */}
        <VideosLayer />

      </MasterLayout>

    </>
  );
};

export default VideosPage; 
