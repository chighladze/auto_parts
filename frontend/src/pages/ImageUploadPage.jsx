import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import ImageUploadLayer from "../components/ImageUploadLayer";




const ImageUploadPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* ImageUploadLayer */}
        <ImageUploadLayer />

      </MasterLayout>

    </>
  );
};

export default ImageUploadPage;
