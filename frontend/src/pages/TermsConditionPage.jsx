import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import TermsConditionLayer from "../components/TermsConditionLayer";

const TermsConditionPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* TermsConditionLayer */}
        <TermsConditionLayer />

      </MasterLayout>

    </>
  );
};

export default TermsConditionPage; 
