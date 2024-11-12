import { AccountBox, KeyboardBackspace, Shield } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  styled,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CaretRight, ChatCircleText } from "phosphor-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HiddenScrollbarContainer = styled("div")({
  overflow: "hidden", // Prevent scrolling
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for webkit browsers
  },
  scrollbarWidth: "none", // Hide scrollbar for Firefox
});

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

const SettingsMobile = () => {
  const navigate = useNavigate();
  const Muitheme = useTheme();
  const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down("sm"));
  return (
    <>
      {isSmallScreen ? (
        <Box sx={{ width: "100%" }}>
          <Stack direction={"row"} alignItems={"center"}>
            <IconButton onClick={() => navigate("/user/mainacc")}>
              <KeyboardBackspace />
            </IconButton>
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex", // Set the display to flex to enable flexbox
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                width: "100%",
              }}
            >
              Settings
            </Typography>
          </Stack>
          <Box sx={{ paddingTop: 3 }}>
            <HiddenScrollbarContainer
              sx={{
                height: "80vh",
                overflowY: "scroll",
                width: "100%",
                paddingTop: 3,
                paddingX: 3,
              }}
            >
              <Box sx={{ borderRadius: 1, width: "100%", boxShadow: 2 }}>
                <Box
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 2,
                    backgroundColor: "#bbdefb",
                    alignItems: "center",
                    paddingX: 3,
                  }}
                >
                  <Typography variant="h5">Profile</Typography>

                  <AccountBox sx={{ fontSize: 50 }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    paddingX: 2,
                    backgroundColor: "#ffffff", // Set a solid white or any contrasting color background
                    marginTop: -2,
                    paddingBottom: 3,
                  }}
                >
                  <Stack spacing={1} sx={{ paddingTop: 2 }}>
                    <Typography variant="h6">Change Password</Typography>
                    <Typography variant="body2">
                      Change your password regularly for your security.
                    </Typography>
                  </Stack>
                  <IconButton>
                    <CaretRight />
                  </IconButton>
                </Box>
                <Stack sx={{ width: "80%" }}>
                  <Divider />
                </Stack>
                <Box
                  sx={{
                    paddingTop: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    paddingX: 2,
                    backgroundColor: "#ffffff", // Set a solid white or any contrasting color background
                    paddingBottom: 3,
                  }}
                >
                  <Stack spacing={1} sx={{ paddingTop: 2 }}>
                    <Typography variant="h6">Update mobile number</Typography>
                    <Typography variant="body2">
                      Update the mobile number used to receive your OTP
                    </Typography>
                  </Stack>
                  <IconButton>
                    <CaretRight />
                  </IconButton>
                </Box>
                <Stack>
                  <Divider />
                </Stack>
                <Box
                  sx={{
                    paddingTop: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    paddingX: 2,
                    backgroundColor: "#ffffff", // Set a solid white or any contrasting color background
                    paddingBottom: 3,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                >
                  <Stack spacing={1} sx={{ paddingTop: 2 }}>
                    <Typography variant="h6">Track & Plan</Typography>
                    <Typography variant="body2">
                      View budget trackers and personal finance insights in My
                      Accounts.
                    </Typography>
                  </Stack>
                  <Stack>
                    <IOSSwitch sx={{ m: 1 }} defaultChecked />
                  </Stack>
                </Box>
              </Box>

              <Paper elevation={2} sx={{ borderRadius: 1, marginTop: 3 }}>
                <Box
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 2,
                    backgroundColor: "#ede7f6",
                    alignItems: "center",
                    paddingX: 3,
                  }}
                >
                  <Typography variant="h5">Security</Typography>

                  <Shield sx={{ fontSize: 50, color: "#d1c4e9" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    paddingX: 2,
                    backgroundColor: "#ffffff", // Set a solid white or any contrasting color background
                    marginTop: -2,
                    paddingBottom: 3,
                  }}
                >
                  <Stack spacing={1} sx={{ paddingTop: 2 }}>
                    <Typography variant="h6">Mobile Key</Typography>
                    <Typography variant="body2">
                      Activate now for enhanced security
                    </Typography>
                  </Stack>
                  <Stack>
                    <IOSSwitch sx={{ m: 1 }} defaultChecked />
                  </Stack>
                </Box>
                <Stack sx={{ width: "80%" }}>
                  <Divider />
                </Stack>
                <Box
                  sx={{
                    paddingTop: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    paddingX: 2,
                    backgroundColor: "#ffffff", // Set a solid white or any contrasting color background
                    paddingBottom: 3,
                  }}
                >
                  <Stack spacing={1} sx={{ paddingTop: 2 }}>
                    <Typography variant="h6">
                      Biometrics for Mobile Key
                    </Typography>
                    <Typography variant="body2">
                      Use Biometrics to approve transactions.
                    </Typography>
                  </Stack>
                  <Stack>
                    <IOSSwitch sx={{ m: 1 }} defaultChecked />
                  </Stack>
                </Box>
                <Stack>
                  <Divider />
                </Stack>
                <Box
                  sx={{
                    paddingTop: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    paddingX: 2,
                    backgroundColor: "#ffffff", // Set a solid white or any contrasting color background
                    paddingBottom: 3,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                >
                  <Stack spacing={1} sx={{ paddingTop: 2 }}>
                    <Typography variant="h6">Biometrcis Login</Typography>
                    <Typography variant="body2">
                      Use Biometrics to login to app
                    </Typography>
                  </Stack>
                  <Stack>
                    <IOSSwitch sx={{ m: 1 }} defaultChecked />
                  </Stack>
                </Box>
              </Paper>

              <Box sx={{ borderRadius: 1, marginTop: 3, boxShadow: 1 }}>
                <Box
                  sx={{
                    borderRadius: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 2,
                    backgroundColor: "#f9fbe7",
                    alignItems: "center",
                    paddingX: 3,
                  }}
                >
                  <Typography variant="h5">Security</Typography>

                  <ChatCircleText style={{ fontSize: 50, color: "#cddc39" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    paddingX: 2,
                    backgroundColor: "#ffffff", // Set a solid white or any contrasting color background
                    marginTop: -2,
                    paddingBottom: 3,
                  }}
                >
                  <Stack spacing={1} sx={{ paddingTop: 2 }}>
                    <Typography variant="h6">Push Notifications</Typography>
                    <Typography variant="body2">
                      Cannot be changed when Mobile Key is enabled
                    </Typography>
                  </Stack>
                  <Stack>
                    <IOSSwitch sx={{ m: 1 }} defaultChecked />
                  </Stack>
                </Box>
                <Stack sx={{ width: "80%" }}>
                  <Divider />
                </Stack>
                <Box
                  sx={{
                    paddingTop: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    paddingX: 2,
                    backgroundColor: "#ffffff", // Set a solid white or any contrasting color background
                    paddingBottom: 3,
                  }}
                >
                  <Stack spacing={1} sx={{ paddingTop: 2 }}>
                    <Typography variant="h6">
                      Transaction alert and offers
                    </Typography>
                    <Typography variant="body2">
                      Get notified after every transaction and receive the
                      latest perks and offers.
                    </Typography>
                  </Stack>
                  <Stack>
                    <IOSSwitch sx={{ m: 1 }} defaultChecked />
                  </Stack>
                </Box>
                <Stack>
                  <Divider />
                </Stack>
              </Box>
            </HiddenScrollbarContainer>
          </Box>
        </Box>
      ) : (
        <Typography component={Link} to={"/app"}>
          Home This is Fallback
        </Typography>
      )}
    </>
  );
};

export default SettingsMobile;
