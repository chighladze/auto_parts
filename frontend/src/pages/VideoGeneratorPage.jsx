import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import VideoGeneratorLayer from "../components/VideoGeneratorLayer";


const VideoGeneratorPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* VideoGeneratorLayer */}
        <VideoGeneratorLayer />

      </MasterLayout>

    </>
  );
};

export default VideoGeneratorPage; 
