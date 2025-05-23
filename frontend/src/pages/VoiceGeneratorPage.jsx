import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import VoiceGeneratorLayer from "../components/VoiceGeneratorLayer";


const VoiceGeneratorPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* VoiceGeneratorLayer */}
        <VoiceGeneratorLayer />

      </MasterLayout>

    </>
  );
};

export default VoiceGeneratorPage; 
