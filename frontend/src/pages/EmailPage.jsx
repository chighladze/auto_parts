import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import EmailLayer from "../components/EmailLayer";


const EmailPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* EmailLayer */}
        <EmailLayer />


      </MasterLayout>
    </>
  );
};

export default EmailPage;
