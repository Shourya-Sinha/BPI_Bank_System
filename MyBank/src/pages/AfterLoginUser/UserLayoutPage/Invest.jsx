import React from "react";
import MaintainImage from "../../../assets/maintan.png";
import { Box, Container, Stack, Typography } from "@mui/material";

const Invest = () => {
  return (
    <Container maxWidth="lg">
    <Box sx={{ textAlign: "center", padding: 3 }}>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <img
          src={MaintainImage}
          alt="Construction image"
          style={{
            maxWidth: "800px",
            maxHeight: "800px",
            objectFit: "contain",
            borderRadius: 3,
          }}
        />
        <Typography variant="h4" gutterBottom>
          This Page is Under Maintenance
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We’re working hard to improve your experience. This page is
          temporarily unavailable as we make some updates and enhancements.
          Please check back soon!
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Thank you for your patience and understanding. For further
          assistance or inquiries, feel free to contact our support team.
        </Typography>
      </Stack>
    </Box>
  </Container>
  )
}

export default Invest