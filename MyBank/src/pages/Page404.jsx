import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Maintain from '../assets/maintan.jpg';

const Page404 = () => {
  return (
    <>
<Container maxWidth="xl">
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        padding: "20px",
        textAlign: "left", // Aligns text to the left within its box
      }}
    >
      {/* Left Side: Text */}
      <Box sx={{ flex: 1, paddingRight: "20px" }}> {/* Adjust padding as needed */}
        <Typography variant="h1" gutterBottom>
          Under Maintenance
        </Typography>
        <Typography variant="body1" gutterBottom>
          We are currently making some improvements. Please check back later!
        </Typography>
        <Link
          variant="contained"
          color="primary"
          to="/app"
          sx={{ marginTop: "20px", display: "inline-block" }}
        >
          Go to Home
        </Link>
      </Box>

      {/* Right Side: Image */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <img
          src={Maintain} // Replace with your image source
          alt="Under Maintenance"
          style={{ width: "100%", borderRadius: 15, objectFit: "cover" }}
        />
      </Box>
    </Box>
  </Container>
    </>
  );
};

export default Page404;
