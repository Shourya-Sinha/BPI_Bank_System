import React from "react";
import {
  Box,
  SwipeableDrawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";

const DrawerComponent = ({ isOpen, onClose, content }) => {
  return (
    <SwipeableDrawer
      anchor="top"
      open={isOpen}
      onClose={onClose}
      onOpen={() => {}}
      BackdropProps={{ invisible: true }}
      sx={{
        '& .MuiDrawer-paper': {
          top: '68px',
           // Adjust this height based on Header2’s height
        //   height: 'calc(100vh - 64px)',
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 2,
        //   minHeight: "60vh",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "8px", // Thickness of the border
            background: "linear-gradient(230.32deg, #2c5dce 0, #d34cd5 100%)",
          },
        }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <Box>{content}</Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerComponent;
