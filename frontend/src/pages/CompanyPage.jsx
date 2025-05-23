import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import CompanyLayer from "../components/CompanyLayer";


const CompanyPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* CompanyLayer */}
        <CompanyLayer />


      </MasterLayout>
    </>
  );
};

export default CompanyPage;
