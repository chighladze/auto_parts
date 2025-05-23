import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import CodeGeneratorLayer from "../components/CodeGeneratorLayer";


const CodeGeneratorPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* CodeGeneratorLayer */}
        <CodeGeneratorLayer />


      </MasterLayout>
    </>
  );
};

export default CodeGeneratorPage;
