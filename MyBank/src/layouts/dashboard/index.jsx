import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ChatFooter, ChatHeader } from "../../components/Chat";
import { Box, Container } from "@mui/material";
import Header2 from "../../components/Chat/Header2";

const DashboardLayout = () => {

  const headerStyle = {
    transition: "opacity 0.5s linear",
  };

  useEffect(() => {
    const handleScroll = () => {
      const chatHeader = document.getElementById("chat-header");
      const header2 = document.getElementById("header-2");

      if (window.scrollY > 100) {
        // When scrolling down more than 100px, hide ChatHeader
        chatHeader.style.visibility = "hidden";
        chatHeader.style.opacity = "0";
        header2.style.position = "fixed"; // Fix Header2 at the top
        header2.style.top = "0";  
        header2.style.backgroundColor='#fff',  
        header2.style.width='80%';      // Align to the top
        header2.style.zIndex = "1";    // Ensure it stays above other content
      } else {
        // When at the top (scrolling up or at the top), show both headers
        chatHeader.style.visibility = "visible";
        chatHeader.style.opacity = "1";
        header2.style.position = "relative"; // Reset to normal flow
        header2.style.top = "initial";       // Reset top
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Container maxWidth={"xl"}>
        {/* Header */}
        <div id="chat-header" style={{ opacity: 1 }}>
          <ChatHeader />
        </div>
        <div id="header-2" style={{ visibility: "visible", opacity: 1 }}>
          <Header2 />
        </div>

        {/* Footer */}
      </Container>
      <Outlet />
      {/* <Container >
        <ChatFooter />
      </Container> */}
    </>
  );
};

export default DashboardLayout;
