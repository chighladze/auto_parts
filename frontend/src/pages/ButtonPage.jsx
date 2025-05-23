import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import ButtonLayer from "../components/ButtonLayer";


const ButtonPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* ButtonLayer */}
        <ButtonLayer />


      </MasterLayout>
    </>
  );
};

export default ButtonPage;
