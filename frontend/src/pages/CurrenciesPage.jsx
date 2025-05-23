import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import CurrenciesLayer from "../components/CurrenciesLayer";


const CurrenciesPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* CurrenciesLayer */}
        <CurrenciesLayer />


      </MasterLayout>
    </>
  );
};

export default CurrenciesPage;
