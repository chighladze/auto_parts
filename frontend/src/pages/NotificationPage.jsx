import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import NotificationLayer from "../components/NotificationLayer";



const NotificationPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* NotificationLayer */}
        <NotificationLayer />

      </MasterLayout>

    </>
  );
};

export default NotificationPage; 
