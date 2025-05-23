import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import TextGeneratorNewLayer from "../components/TextGeneratorNewLayer";

const TextGeneratorNewPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* TextGeneratorNewLayer */}
        <TextGeneratorNewLayer />

      </MasterLayout>

    </>
  );
};

export default TextGeneratorNewPage; 
