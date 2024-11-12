import {
    useMediaQuery,
    useTheme,
    Typography,
    Box,
    Grid,
    Stack,
    styled,
  } from "@mui/material";
  import {
    AddOutlined,
  } from "@mui/icons-material";
  import { ChartLine, Coins} from "phosphor-react";
  import React from "react";
  import { Link } from "react-router-dom";


const HiddenScrollbarContainer = styled("div")({
    overflow: "hidden", // Prevent scrolling
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for webkit browsers
    },
    scrollbarWidth: "none", // Hide scrollbar for Firefox
  });

const InvestMore = () => {
    const Muitheme = useTheme();
    const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down("sm"));
  return (
   <>
     {isSmallScreen ? (
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            paddingX: 2,
            paddingY: 2,
            height: "80vh",
          }}
        >
         
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h5">Invest</Typography>

                   

            </Stack>
            <Typography>What would you like to do?</Typography>
            <HiddenScrollbarContainer sx={{ width: "100%", height:'100%',overflowY:'scroll',marginTop:2}}>


            <Stack sx={{ marginTop: 3 }}>
              <Typography variant="h6">Invest</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#bbdefb",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <ChartLine size={30} style={{ color: "#1565c0" }} />
                  </Stack>
                  <Typography variant="caption">View</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#bbdefb",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <AddOutlined
                      sx={{ fontSize: "30px", color: "#1565c0" }}
                    />
                  </Stack>
                  <Typography variant="caption">Subscribe</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#bbdefb",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Coins style={{ fontSize: "30px", color: "#1565c0" }} />
                  </Stack>
                  <Typography variant="caption">Redeem</Typography>
                </Grid>
              </Grid>
            </Stack>

            </HiddenScrollbarContainer>

        </Box>
      ) : (
        <Typography component={Link} to={"/app"}>
          Home Fallback
        </Typography>
      )}
   </>
  )
}

export default InvestMore