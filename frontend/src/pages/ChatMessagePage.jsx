import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumbs from "../components/Breadcrumbs";
import ChatMessageLayer from "../components/ChatMessageLayer";


const ChatMessagePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* ChatMessageLayer */}
        <ChatMessageLayer />


      </MasterLayout>
    </>
  );
};

export default ChatMessagePage;
