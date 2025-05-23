import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import CalendarMainLayer from "../components/CalendarMainLayer";


const CalendarMainPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* CalendarMainLayer */}
        <CalendarMainLayer />


      </MasterLayout>
    </>
  );
};

export default CalendarMainPage;
