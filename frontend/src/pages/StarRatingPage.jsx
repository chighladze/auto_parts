import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import StarRatingLayer from "../components/StarRatingLayer";

const StarRatingPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* StarRatingLayer */}
        <StarRatingLayer />

      </MasterLayout>

    </>
  );
};

export default StarRatingPage; 
