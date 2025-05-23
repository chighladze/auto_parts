import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import CarouselLayer from "../components/CarouselLayer";


const ChatEmptyPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* CarouselLayer */}
        <CarouselLayer />


      </MasterLayout>
    </>
  );
};

export default ChatEmptyPage;
