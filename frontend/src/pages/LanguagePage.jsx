import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import LanguageLayer from "../components/LanguageLayer";




const LanguagePage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* LanguageLayer */}
        <LanguageLayer />

      </MasterLayout>

    </>
  );
};

export default LanguagePage; 
