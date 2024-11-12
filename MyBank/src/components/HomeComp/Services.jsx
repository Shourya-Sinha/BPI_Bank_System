import { Box, Container, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import Image1 from "../../assets/credit-apply.svg";
import Image2 from "../../assets/forex-rates.svg";
import Image3 from "../../assets/Feature-EasyPayment.svg";
import Image4 from "../../assets/Feature-EasyApplication.svg";
import Image5 from "../../assets/Feature-News.svg";
import Image6 from "../../assets/Feature-Support.svg";

const Imgae_Labels = [
  { label: "Apply for a credit card", image: Image1 },
  { label: "View Forex rates", image: Image2 },
  { label: "Pay your bills online", image: Image3 },
  { label: "Open a savings account", image: Image4 },
  { label: "Know the latest announcements", image: Image5 },
  { label: "Visit Help & Support", image: Image6 }, // Add more images and labels as per requirement
];

const Services = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
          <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <Stack
            sx={{
              width: 90,
              height: 7,
              backgroundColor: "#b11116",
              marginBottom: 2,
            }}
          />

          <Typography
            variant="body2"
            sx={{ fontSize:isSmallScreen ? "0.8rem" : "1.9rem", fontWeight: 700 }}
          >
            What would you like to do today?
          </Typography>

          <Grid container spacing={3} justifyContent="center" mt={3}>
            {Imgae_Labels.map((item, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.label}
                    style={{
                      width: "64px",
                      height: "64px",
                      marginBottom: "8px",
                      backgroundColor: "#fef4c8",
                      borderRadius: "48px",
                    }}
                  />

                  {/* Label */}
                  <Typography
                    variant="body2"
                    sx={{ fontSize:isSmallScreen ? "10px" : "20px",fontSize:isMediumScreen ? "13px" : "20px",fontSize:isLargeScreen ? "13px" : "20px", fontWeight: 600, color: "#1a1a1a" }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      {/* <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <Stack
            sx={{
              width: 90,
              height: 7,
              backgroundColor: "#b11116",
              marginBottom: 2,
            }}
          />

          <Typography
            variant="body2"
            sx={{ fontSize: "1.9rem", fontWeight: 700 }}
          >
            What would you like to do today?
          </Typography>

          <Grid container spacing={3} justifyContent="center" mt={3}>
            {Imgae_Labels.map((item, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    style={{
                      width: "64px",
                      height: "64px",
                      marginBottom: "8px",
                      backgroundColor: "#fef4c8",
                      borderRadius: "48px",
                    }}
                  />


                  <Typography
                    variant="body2"
                    sx={{ fontSize: "20px", fontWeight: 600, color: "#1a1a1a" }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container> */}
    
    
    
   
    </>
  );
};

export default Services;
