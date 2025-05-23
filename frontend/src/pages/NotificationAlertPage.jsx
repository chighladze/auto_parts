import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import NotificationAlertLayer from "../components/NotificationAlertLayer";



const NotificationAlertPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* NotificationAlertLayer */}
        <NotificationAlertLayer />

      </MasterLayout>

    </>
  );
};

export default NotificationAlertPage; 
