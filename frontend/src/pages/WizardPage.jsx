import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import WizardLayer from "../components/WizardLayer";


const WizardPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* WizardLayer */}
        <WizardLayer />

      </MasterLayout>

    </>
  );
};

export default WizardPage; 
