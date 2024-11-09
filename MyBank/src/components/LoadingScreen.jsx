import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LoadingScreen = () => {
  return (
    <Box
    sx={{
      position: 'fixed', // Ensures it overlays the whole screen
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Dark translucent overlay
    }}
  >
    <Box
      sx={{
        padding: 3,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for loading spinner
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={70} />
    </Box>
  </Box>
  );
};

export default LoadingScreen;
