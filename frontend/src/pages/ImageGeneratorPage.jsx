import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import ImageGeneratorLayer from "../components/ImageGeneratorLayer";




const ImageGeneratorPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* ImageGeneratorLayer */}
        <ImageGeneratorLayer />

      </MasterLayout>

    </>
  );
};

export default ImageGeneratorPage;
