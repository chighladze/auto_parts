import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import TextGeneratorLayer from "../components/TextGeneratorLayer";

const TextGeneratorPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* TextGeneratorLayer */}
        <TextGeneratorLayer />

      </MasterLayout>

    </>
  );
};

export default TextGeneratorPage; 
