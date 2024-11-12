import {
  useMediaQuery,
  useTheme,
  Typography,
  Box,
  Grid,
  IconButton,
  Stack,
  Button,
  styled,
} from "@mui/material";
import { CreditCardOutlined } from "@ant-design/icons";
import {
  AccountBalance,
  BackupTable,
  CancelPresentation,
  ContactEmergency,
  DateRange,
  Description,
  Groups,
  LowPriority,
  Payment,
  QueryBuilder,
  ShieldOutlined,
} from "@mui/icons-material";
import { GearSix, SignOut, User } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../../Redux/UserAuth/Auth";

const HiddenScrollbarContainer = styled("div")({
    overflow: "hidden", // Prevent scrolling
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for webkit browsers
    },
    scrollbarWidth: "none", // Hide scrollbar for Firefox
  });

const MoreMob = () => {
    const dispatch = useDispatch();
  const Muitheme = useTheme();
  const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down("sm"));

  const handleLogout = () => {
    dispatch(LogoutUser());
  };
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
              <Typography variant="h5">More</Typography>

              <Stack direction={"row"}>
                    <IconButton onClick={handleLogout}>
                      <SignOut style={{ color: "#20c997" }} />
                    </IconButton>
                    <Button sx={{ color: "#20c997", border: "none" }}>
                      Logout
                    </Button>
                  </Stack>
            </Stack>
            <Typography>What would you like to do?</Typography>
            <HiddenScrollbarContainer sx={{ width: "100%", height:'100%',overflowY:'scroll'}}>


            <Stack sx={{ marginTop: 3 }}>
              <Typography variant="h6">Settings</Typography>
              <Grid container spacing={3}>
                <Grid item sm={4}>
                  <Stack
                    sx={{
                      backgroundColor: "#ffe0b2",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <GearSix style={{ fontSize: "30px" }} color="#fb8c00" />
                  </Stack>
                  <Typography variant="caption">General settings</Typography>
                </Grid>
                <Grid item sm={4}></Grid>
                <Grid item sm={4}></Grid>
              </Grid>
            </Stack>

            <Stack sx={{ marginTop: 3}}>
              <Typography variant="h6">Card Management</Typography>
              <Grid container spacing={3}>
                <Grid item sm={4} sx={{maxWidth: '110px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#c8e6c9",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <CreditCardOutlined
                      style={{ fontSize: "30px", color: "#689f38" }}
                    />
                  </Stack>
                  <Typography variant="caption">Card control</Typography>
                </Grid>
                <Grid item sm={4} sx={{maxWidth: '110px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#c8e6c9",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                      maxWidth:120
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Payment sx={{ fontSize: "30px", color: "#689f38" }} />
                  </Stack>
                  <Typography variant="caption" >New Debit card</Typography>
                </Grid>
                <Grid item sm={4} sx={{maxWidth: '110px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#c8e6c9",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                      maxWidth:120
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Payment style={{ fontSize: "30px", color: "#689f38" }} />
                  </Stack>
                  <Typography variant="caption" sx={{ overflow: 'hidden', width: '40px !important',whiteSpace:'normal', textOverflow: 'ellipsis'}}>
                    Debit card replacement
                  </Typography>
                </Grid>
              </Grid>
            </Stack>

            <Stack sx={{ marginTop: 3 }}>
              <Typography variant="h6">Services</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#b3e5fc",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <LowPriority sx={{ fontSize: "29px", color: "#0277bd" }} />
                  </Stack>
                  <Typography variant="caption">Reorder checkbook</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#b3e5fc",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <CancelPresentation
                      sx={{ fontSize: "30px", color: "#0277bd" }}
                    />
                  </Stack>
                  <Typography variant="caption">Stop payment order</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#b3e5fc",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Description sx={{ fontSize: "30px", color: "#0277bd" }} />
                  </Stack>
                  <Typography variant="caption">My Statements</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#b3e5fc",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <DateRange style={{ fontSize: "30px", color: "#0277bd" }} />
                  </Stack>
                  <Typography variant="caption">
                    BPI Express main (Dates)
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#b3e5fc",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Description sx={{ fontSize: "30px", color: "#0277bd" }} />
                  </Stack>
                  <Typography variant="caption">My Statements</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#b3e5fc",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Description sx={{ fontSize: "30px", color: "#0277bd" }} />
                  </Stack>
                  <Typography variant="caption">My Statements</Typography>
                </Grid>
              </Grid>
            </Stack>

            <Stack sx={{ marginTop: 3 }}>
              <Typography variant="h6">Products</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#ffccbc",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <ContactEmergency sx={{ fontSize: "29px", color: "#f4511e" }} />
                  </Stack>
                  <Typography variant="caption">New Deposite Account</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                        backgroundColor: "#ffccbc",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <QueryBuilder
                      sx={{ fontSize: "30px", color: "#f4511e" }}
                    />
                  </Stack>
                  <Typography variant="caption">Time Deposite</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                        backgroundColor: "#ffccbc",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <ShieldOutlined sx={{ fontSize: "30px",color: "#f4511e"}} />
                  </Stack>
                  <Typography variant="caption">Health & Life insurance</Typography>
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
  );
};

export default MoreMob;
