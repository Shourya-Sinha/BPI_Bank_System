import React, { useEffect, useState } from "react";
import SLiderView from "../../components/HomeComp/SLiderView";
import { Box, Button } from "@mui/material";
import Services from "../../components/HomeComp/Services";
import MergerInfo from "../../components/HomeComp/MergerInfo";
import CardInfo from "../../components/HomeComp/CardInfo";
import InsightBlogs from "../../components/HomeComp/InsightBlogs";
import AppDown from "../../components/HomeComp/AppDown";
import AddLinks from "../../components/HomeComp/AddLinks";
import MoreHelp from "../../components/HomeComp/MoreHelp";
import BPIFooter from "../../components/Chat/BPIFooter";
import { ArrowUp } from "phosphor-react";

const GeneralApp = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Show button when scrolling down
    const handleScroll = () => {
      if (window.scrollY > 200) { // Adjust scroll threshold as needed
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Box sx={{ maxWidth: "100vw" }}>
        {/* All Home Components */}
        <SLiderView />
        <Services />
        <MergerInfo />
        <CardInfo />
        <InsightBlogs />
        <AppDown />
        <AddLinks />
        <MoreHelp />
        <BPIFooter />

        {showScrollButton && (
          <Button
            onClick={scrollToTop}
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              backgroundColor: "#1A1A1A",
              color: "#fff",
              borderRadius: "4px",
              minWidth: "48px",
              minHeight: "48px",
              "&:hover": {
                backgroundColor: "#b11116"
              }
            }}
          >
            <ArrowUp  />
          </Button>
        )}
      </Box>
    </>
  );
};

export default GeneralApp;
