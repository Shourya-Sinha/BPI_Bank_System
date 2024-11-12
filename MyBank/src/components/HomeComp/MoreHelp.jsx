import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  Button,
  Link,
} from "@mui/material";
import React from "react";
import Image1 from "../../assets/help.svg";
import {
  CaretRight,
  Chat,
  Headset,
  MapPinLine,
  CalendarPlus,
  ArrowRight,
} from "phosphor-react";
import {Link as RouterLink} from 'react-router-dom'

const Help_Data = [
  { id: 1, title: "Give feedback", icon: <Chat color="#b11116" size={25} /> },
  { id: 2, title: "Contact us", icon: <Headset color="#b11116" size={25} /> },
  {
    id: 3,
    title: "Find a branch/ ATM",
    icon: <MapPinLine color="#b11116" size={25} />,
  },
  {
    id: 4,
    title: "View scheduled maintenance",
    icon: <CalendarPlus color="#b11116" size={25} />,
  },
];

const MoreHelp = () => {
  return (
    <>
        {/* <Box sx={{ width: "100%", marginTop: 10 }}>

<Container maxWidth={"lg"} sx={{ marginTop: 3 }}>

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
    Need more help?
  </Typography>
  <Typography
    variant="body2"
    sx={{ fontSize: "1.25rem", fontWeight: 400, paddingTop: 2 }}
  >
    Get all the help for your banking needs.
  </Typography>

  <Stack sx={{ paddingTop: 5, left: "40%",zIndex:1 }} position={"absolute"}>
    <Grid container spacing={3} sx={{ width: "80%" }}>
      {Help_Data.map((item) => (
        <Grid item xs={12} md={6} key={item.id}>
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Stack sx={{ paddingBottom: 2 }}>{item.icon}</Stack>
            <Stack
              sx={{
                width: "100%",
                borderBottom: "1px solid #000",
                paddingBottom: 2,
                transition: "border-bottom 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  borderBottom: "2px solid #b11116",
                },
              }}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
              component={RouterLink}
              to={'/maintain'}
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#000",
                  textDecoration: "none",
                }}
              >
                {item.title}
              </Typography>
              <IconButton>
                <CaretRight color="#b11116" />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
      ))}
    </Grid>
    <Box sx={{ marginLeft: 4, marginTop: 8 }}>
    <Button
        component={RouterLink}
        to='/maintain'
        sx={{
          color: "#b11116",
          fontWeight: 600,
          fontSize: 16,
          padding: "10px 50px",
          borderRadius: "4px",
          border: "2px solid #b11116",
          "&:hover": {
            backgroundColor: "#b11116",
            color: "#ffffff",
          },
        }}
        endIcon={<ArrowRight style={{ marginLeft: 5 }} size={25} />}
        onClick={() => console.log("Explore Help & Support clicked")} // Log click for debugging
      >
        EXPLORE HELP & SUPPORT
      </Button>
    </Box>
  </Stack>
</Container>
<Box sx={{ position: "relative", bottom: 5 }}>
  <img src={Image1} alt="My Image" />
</Box>
</Box> */}
    <Box sx={{ width: "100%", marginTop: 10 }}>

<Container maxWidth={"lg"} sx={{ marginTop: 3 }}>

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
    sx={{ fontSize:"clamp(14px, 2vw, 39px)", fontWeight: 700 }}
  >
    Need more help?
  </Typography>
  <Typography
    variant="body2"
    sx={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 400, paddingTop: 2 }}
  >
    Get all the help for your banking needs.
  </Typography>

  <Stack sx={{ paddingTop: 5, left: "clamp(50%, 2vw, 40%)",zIndex:1 }} position={"absolute"}>
    <Grid container spacing={3} sx={{ width: "80%" }}>
      {Help_Data.map((item) => (
        <Grid item xs={12} md={6} key={item.id}>
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Stack sx={{ paddingBottom: 2  }}>{item.icon}</Stack>
            <Stack
              sx={{
                width: "100%",
                borderBottom: "1px solid #000",
                paddingBottom: "clamp(5px, 2vw, 10px)",
                transition: "border-bottom 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  borderBottom: "2px solid #b11116",
                },
              }}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
              component={RouterLink}
              to={'/maintain'}
                sx={{
                  fontSize: "clamp(12px, 2vw, 16px)",
                  fontWeight: 600,
                  color: "#000",
                  textDecoration: "none",
                }}
              >
                {item.title}
              </Typography>
              <IconButton>
                <CaretRight style={{fontSize:"clamp(12px, 2vw, 20px)"}}  color="#b11116" />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
      ))}
    </Grid>
    <Box sx={{ marginLeft: 4, marginTop: 8 }}>
    <Button
        component={RouterLink}
        to='/maintain'
        sx={{
          color: "#b11116",
          fontWeight: 600,
          fontSize: "clamp(12px, 2vw, 20px)",
          // padding: "10px 50px",
          paddingX:'clamp(12px, 2vw, 50px)',
          paddingY:'clamp(5px, 2vw, 10px)',
          borderRadius: "4px",
          border: "2px solid #b11116",
          "&:hover": {
            backgroundColor: "#b11116",
            color: "#ffffff",
          },
        }}
        endIcon={<ArrowRight style={{ marginLeft: 5 ,fontSize:'clamp(12px, 2vw, 20px)'}}  />}
        onClick={() => console.log("Explore Help & Support clicked")} // Log click for debugging
      >
        EXPLORE HELP & SUPPORT
      </Button>
    </Box>
  </Stack>
</Container>
<Box sx={{ position: "relative", bottom: 5 }}>
  <img src={Image1} alt="My Image" />
</Box>
</Box>

    </>

  );
};
export default MoreHelp;
