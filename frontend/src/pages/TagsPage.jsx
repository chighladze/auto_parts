import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import TagsLayer from "../components/TagsLayer";

const TagsPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* TagsLayer */}
        <TagsLayer />

      </MasterLayout>

    </>
  );
};

export default TagsPage; 
