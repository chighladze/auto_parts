import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import ChatProfileLayer from "../components/ChatProfileLayer";


const ChatProfilePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* ChatProfileLayer */}
        <ChatProfileLayer />


      </MasterLayout>
    </>
  );
};

export default ChatProfilePage;
