import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CaretRight } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";

const LinkData = [
  { id: 1, title: "Bank service fees" },
  { id: 2, title: "Deposite rates" },
  { id: 3, title: "Start your own business" },
  { id: 4, title: "should you rent or buy" },
  { id: 5, title: "Forex rates" },
  { id: 6, title: "ATM Locator" },
];

const AddLinks = () => {
  return (
    <>
      {/* <Container maxWidth={"lg"} sx={{ marginTop: 7 }}>
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
            Additional Links
          </Typography>

          <Box sx={{ marginTop: 5 }}>
            <Grid container spacing={2}>
              {LinkData.map((item) => (
                <Grid item xs={12} sm={4} md={4} key={item.id}>
                  <Stack direction={"row"} justifyContent={"space-between"}  sx={{borderBottom:'1px solid black','&:hover':{borderBottom:'2px solid #b11116'},marginBottom:4}}>
                    <Typography
                    component={Link}
                    to='/maintain'
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "#000",
                        paddingBottom:4,
                        textDecoration:'none'
                      }}
                    >
                      {item.title}
                    </Typography>

                    <IconButton sx={{paddingBottom:4}}>
                      <CaretRight color="#b11116" />
                    </IconButton>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container> */}

<Container maxWidth={"lg"} sx={{ marginTop: 7 }}>
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
            sx={{ fontSize: 'clamp(14px, 2vw, 1.5rem)', fontWeight: 700 }}
          >
            Additional Links
          </Typography>

          <Box sx={{ marginTop: 5 }}>
            <Grid container spacing={2}>
              {LinkData.map((item) => (
                <Grid item xs={12} sm={4} md={4} key={item.id}>
                  <Stack direction={"row"} justifyContent={"space-between"}  sx={{borderBottom:'1px solid black','&:hover':{borderBottom:'2px solid #b11116'},marginBottom:4}}>
                    <Typography
                    component={Link}
                    to='/maintain'
                      sx={{
                        fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
                        fontWeight: 600,
                        color: "#000",
                        paddingBottom:'clamp(8px, 2vw, 30px)',
                        textDecoration:'none'
                      }}
                    >
                      {item.title}
                    </Typography>

                    <IconButton sx={{paddingBottom:'clamp(8px, 2vw, 30px)'}}>
                      <CaretRight style={{fontSize: 'clamp(14px, 2vw, 1.5rem)'}} color="#b11116" />
                    </IconButton>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddLinks;
