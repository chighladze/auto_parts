import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import CodeGeneratorNewLayer from "../components/CodeGeneratorNewLayer";


const CodeGeneratorNewPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* CodeGeneratorNewLayer */}
        <CodeGeneratorNewLayer />


      </MasterLayout>
    </>
  );
};

export default CodeGeneratorNewPage;
