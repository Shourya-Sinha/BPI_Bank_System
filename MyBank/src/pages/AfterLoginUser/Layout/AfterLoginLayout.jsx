import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AlignLeftOutlined,
  BarChartOutlined,
  FilePptOutlined,
  FileTextOutlined,
  LayoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import {
  ArrowsLeftRight,
  CaretRight,
  CaretUp,
  Envelope,
  GearSix,
  Shield,
  SignOut,
  UserCircleGear,
  X,
} from "phosphor-react";
import { Layout, Menu, theme, Button as AntDButton, Drawer } from "antd";
const { Header, Sider, Content } = Layout;
import Logo from "../../../assets/logo.svg";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Divider,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  styled,
} from "@mui/material";
import Transfer from "../UserLayoutPage/Transfer";
import More from "../UserLayoutPage/More";
import { useDispatch, useSelector } from "react-redux";
import {
  GetMyLofinDetailsTime,
  GetUserBankDetails,
  LogoutUser,
  useIsSmallScreen,
} from "../../../Redux/UserAuth/Auth";
import moment from "moment";
import {
  EqualizerOutlined,
  Favorite,
  Folder,
  LocationOn,
  Reorder,
  RequestPageOutlined,
  Restore,
  Settings,
  SyncAltOutlined,
  ViewQuilt,
} from "@mui/icons-material";
import { fontSize } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  // backgroundColor: "#000",
  margin: "auto",
  // borderRadius: "20px 20px 0 0",
  textAlign: "center",
  boxShadow: theme.shadows[8],
  padding: "0 0",
  [theme.breakpoints.down("sm")]: {
    paddingX: "50px !important",
  },
}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  fontSize: "1.6em",
  padding: "0.1em",
  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease",
  "& .icon-wrapper": {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  "& .MuiBottomNavigationAction-label": {
    color: "#888",
    fontSize: "11px",
  },
  "& .MuiSvgIcon-root": {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  "&.Mui-selected": {
    "& .icon-wrapper": {
      transform: "translateY(-8px) scale(1.3)",
      background: "linear-gradient(195deg, #dc143c, #ff4d6d)",
      borderRadius: "50%",
      padding: "1px",
      color: "#fff",
      boxShadow: "0px 0px 15px rgba(220, 20, 60, 0.6)",
      zIndex: 1,
    },
    "& .MuiBottomNavigationAction-label": {
      fontWeight: "bold",
      fontSize: "10px",
      color: "#dc143c",
    },
  },
  // Apply equal width on small screens
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100px", // 100% divided by 5 actions
    fontSize: "1em",
    "& .MuiBottomNavigationAction-label": {
      fontSize: "9px",
    },
  },
}));



// const StyledBottomNavigationAction = styled(BottomNavigationAction)(
//   ({ theme }) => ({
//     fontSize: "1em",
//     padding: "0.1em",
//     // margin: "0.1em",
//     transition:
//       "transform 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease",
//     "& .icon-wrapper": {
//       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     },
//     "& .MuiBottomNavigationAction-label": {
//       color: "#888", // Default color for labels when not selected
//       fontSize: "11px",
//     },
//     "& .MuiSvgIcon-root": {
//       transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth animation
//     },
//     "&.Mui-selected": {
//       "& .icon-wrapper": {
//         transform: "translateY(-8px) scale(1.3)", // Move the icon up and scale up
//         background: "linear-gradient(195deg, #dc143c, #ff4d6d)",
//         borderRadius: "50%",
//         padding: "5px",
//         color: "#fff",
//         boxShadow: "0px 0px 15px rgba(220, 20, 60, 0.6)", // Add a glow effect
//         zIndex: 1,
//       },
//       "& .MuiBottomNavigationAction-label": {
//         fontWeight: "bold",
//         fontSize: "10px",
//         color: "#dc143c",
//       },
//     },
//   })
// );

const AfterLoginLayout = () => {
  const [value, setValue] = useState("myaccount"); // Track the selected navigation item
  const isSmallScreen = useIsSmallScreen();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { userBnakDetails } = useSelector(
    (state) =>
      state.auth || {
        userBnakDetails: {
          accountNumber: null,
          isVerifiedAccount: null,
          isAccountPending: null,
          otherDeatils: {},
        },
      }
  );
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openSecondDialog, setOpenSecondDialog] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showTransferPanel, setShowTransferPanel] = useState(false);
  const [showMorePanel, setShowMorePanel] = useState(false);
  const [getLoginData, setLoginData] = useState(null);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "myaccount",
      icon: <LayoutOutlined />,
      label: "My Accounts",
      path: "/user/mainacc",
    },
    {
      key: "transfer",
      icon: <ArrowsLeftRight />,
      label: "Transfer",
      path: "/user/transfer",
    },
    {
      key: "allTransaction",
      icon: <TransactionOutlined />,
      label: "All Transactions",
      path: "/user/allTransaction",
    },
    {
      key: "payload",
      icon: <FilePptOutlined />,
      label: "Payload",
      path: "/user/payload",
    },
    {
      key: "invest",
      icon: <BarChartOutlined />,
      label: "Invest",
      path: "/user/invest",
    },
    {
      key: "more",
      icon: <MoreOutlined />,
      label: "More",
      path: "/user/more",
    },
    {
      key: "profile",
      icon: <UserCircleGear />,
      label: "Profile",
      path: "/user/myprofile",
    },
  ];
  const selectedKey = menuItems.find((item) =>
    location.pathname.includes(item.path)
  )?.key;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(GetUserBankDetails());
    const fetchLoginDetails = async () => {
      const data = await GetMyLofinDetailsTime();
      if (data) {
        setLoginData(data.data); // Assuming your response contains data under "data"
      }
    };
    fetchLoginDetails();
  }, [dispatch]);

  useEffect(() => {
    // Check if userBnakDetails is populated and accountNumber is null
    if (
      userBnakDetails?.accountNumber === null &&
      userBnakDetails?.accountNumber === undefined
    ) {
      setOpen(true);
    }
  }, [userBnakDetails?.accountNumber]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/app");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // Render nothing temporarily while redirecting
  }

  const handleLogout = () => {
    dispatch(LogoutUser());
  };

  // console.log('userbankldetails in page',userBnakDetails);
  const formatMyDate = (date) => {
    if (!date || !moment(date).isValid()) return "No data found";
    return moment(date).format("MMM DD YYYY [at] hh:mm:ss A (GMT Z)"); // Example: Nov 11 2024 at 11:12:40 AM (GMT +5)
  };
  function getGreeting() {
    const currentHour = new Date().getHours(); // Get the current hour (0-23)

    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue); // Update the selected value
    // Navigate based on the selected BottomNavigationAction
    switch (newValue) {
      case "myaccount":
        navigate("/user/mainacc"); // Navigate to Main Account
        break;
      case "transfer":
        navigate("/user/transfermob"); // Navigate to Transactions
        break;
      case "PayLoad":
        navigate("/user/payloadmob"); // Navigate to Pay/Load
        break;
      case "invest":
        navigate("/user/investmob"); // Navigate to Invest
        break;
      case "more":
        navigate("/user/moremob"); // Navigate to More options
        break;
      case "settingMobile":
        navigate("/user/settingMob"); // Navigate to More options
        break;
      default:
        navigate("/user/mainacc"); // Fallback path
    }
  };

  return (
    <>
      {open &&
        userBnakDetails?.accountNumber === null &&
        userBnakDetails?.accountNumber === undefined && (
          <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>You have no any account</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Please create an account to access this feature.
              </DialogContentText>
              <Stack sx={{ marginTop: 2 }}>
                <Link
                  to={"/register"}
                  style={{ fontSize: "15px", fontWeight: 600 }}
                >
                  Create Account
                </Link>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              {/* Add more actions here if necessary */}
            </DialogActions>
          </Dialog>
        )}
      {isSmallScreen ? (
        <Box sx={{ width: "100vw", height: "90vh",paddingX:1, paddingY: 2 }}>
          <Box >
            <Outlet />
          </Box>
          <StyledBottomNavigation
            showLabels
            sx={{
              // width: "300px !important",
              position: "fixed",
              bottom: 0,
              left: 0,
              right:0,
              boxShadow: 9,
              paddingX:15
            }}
            value={value}
            onChange={handleNavigationChange}
          >
            <StyledBottomNavigationAction
              label="My Accounts"
              value="myaccount"
              icon={
                <Box
                  className="icon-wrapper"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ViewQuilt />{" "}
                </Box>
              }
            />
            <StyledBottomNavigationAction
              label="Transfer"
              value="transfer"
              icon={
                <Box
                  className="icon-wrapper"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SyncAltOutlined />
                </Box>
              }
            />
            <StyledBottomNavigationAction
              label="Pay/load"
              value="PayLoad"
              icon={
                <Box
                  className="icon-wrapper"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RequestPageOutlined />
                </Box>
              }
            />
            <StyledBottomNavigationAction
              label="Invest"
              value="invest"
              icon={
                <Box
                  className="icon-wrapper"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EqualizerOutlined />
                </Box>
              }
            />
            <StyledBottomNavigationAction
              label="More"
              value="more"
              icon={
                <Box
                  className="icon-wrapper"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Reorder />
                </Box>
              }
            />
          </StyledBottomNavigation>
        </Box>
      ) : (
        <Layout style={{ height: "100vh" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={300}
            style={{ backgroundColor: "#fff", color: "#343a40", marginLeft: 4 }}
          >
            <div style={{ marginBottom: 15, marginTop: 5 }}>
              <div
                style={{
                  display: "flex",
                  marginLeft: 5,
                }}
              >
                <img
                  src={Logo}
                  alt="Logo "
                  style={{ width: 70, height: 60, objectFit: "contain" }}
                />
              </div>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[selectedKey || "dashboard"]}
              style={{
                backgroundColor: "#fff",
                color: "#343a40",
                cursor: userBnakDetails?.accountNumber ? "pointer" : "none",
              }}
              // onClick={(e) => setShowTransferPanel(e.key === "transfer" || "more")}
              onClick={(e) => {
                if (e.key === "transfer") {
                  setShowTransferPanel(true);
                  setShowMorePanel(false); // Ensure only the transfer panel shows
                } else if (e.key === "more") {
                  setShowMorePanel(true);
                  setShowTransferPanel(false); // Ensure only the more panel shows
                } else {
                  setShowTransferPanel(false);
                  setShowMorePanel(false); // Close both panels for other menu items
                }
              }}
            >
              {menuItems.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  disabled={!userBnakDetails?.accountNumber}
                  style={{
                    color: "#343a40",
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: 15,
                  }}
                  onClick={item.onClick}
                >
                  {userBnakDetails?.accountNumber ? (
                    <Link to={item.path}>{item.label}</Link> // Show link only if `accountNo` is present
                  ) : (
                    item.label // Display plain label if `accountNo` is missing
                  )}
                </Menu.Item>
              ))}
            </Menu>
            <Box sx={{ position: "absolute", bottom: 0, padding: 2 }}>
              {getLoginData ? (
                <>
                  <Stack spacing={0.5}>
                    <Typography variant="caption">
                      Your last Login was
                    </Typography>
                    <Typography variant="caption">
                      {formatMyDate(getLoginData.lastLoginTime)}
                    </Typography>
                    <Typography variant="caption">
                      Your last failed Login was:
                    </Typography>
                    <Typography variant="caption">
                      {formatMyDate(getLoginData.lastFailedLoginTime)}
                    </Typography>
                  </Stack>
                </>
              ) : (
                <p>Loading login details...</p>
              )}
            </Box>
          </Sider>

          {/* {openSecondDialog && (
            <Dialog
              open={openSecondDialog}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>Test Dialog</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  This is a second dialog, triggered by the "Test" menu item.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          )} */}

          <Layout
            style={{
              backgroundColor: "#f5f5f5",
              transition: "margin-left 0.3s ease",
            }}
          >
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              <AntDButton
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />

              <Box
                sx={{
                  width: "97%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingX: 3,
                }}
              >
                {selectedKey === "myaccount" && (
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography variant="caption">Account</Typography>
                    <CaretRight />
                    <Typography variant="caption">My Account</Typography>
                  </Stack>
                )}
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  {!userBnakDetails?.accountNumber && (
                    <Typography component={Link} to={"/register"}>
                      You don't have any account Create Bank Account
                    </Typography>
                  )}
                </Stack>

                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <IconButton>
                    <MailOutlined />
                  </IconButton>
                  <Divider orientation="vertical" flexItem />

                  <IconButton component={Link} to={"/user/myprofile"}>
                    <GearSix />
                  </IconButton>

                  <Divider orientation="vertical" flexItem />

                  <Stack direction={"row"}>
                    <IconButton onClick={handleLogout}>
                      <SignOut style={{ color: "#20c997" }} />
                    </IconButton>
                    <Button sx={{ color: "#20c997", border: "none" }}>
                      Logout
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                backgroundColor: "#f5f5f5",
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
          {showMorePanel && (
            <>
              <Box
                onClick={() => setShowTransferPanel(false)}
                sx={{
                  position: "fixed",
                  left: 300,
                  top: 0,
                  height: "100vh",
                  width: "90vw",
                  backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark transparent backdrop
                  zIndex: 999, // Behind the Transfer Panel but above everything else
                }}
              >
                <Stack
                  sx={{ width: "90%", marginTop: "10%" }}
                  direction={"row"}
                  spacing={2}
                >
                  <Stack sx={{ width: "80%" }}>
                    <Box
                      sx={{
                        boxShadow: 3,
                        padding: 3,
                        backgroundColor: "#fff",
                        position: "relative",
                        overflow: "hidden",
                        width: "100%",
                      }}
                    >
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography variant="body2">Hello User,</Typography>

                        <IconButton>
                          <CaretUp />
                        </IconButton>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(100, 100, 100, 0.5)", // Dark transparent overlay
                            zIndex: 0, // Stays behind content
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box sx={{ paddingX: 5 }}>
                      {" "}
                      <Divider />{" "}
                    </Box>
                    <Box
                      sx={{
                        boxShadow: 3,
                        padding: 3,
                        backgroundColor: "#fff",
                        position: "relative",
                        overflow: "hidden",
                        width: "100%",
                      }}
                    >
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography variant="body2">Hello User,</Typography>

                        <Stack
                          direction={"row"}
                          spacing={1}
                          alignItems={"center"}
                        >
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 500,
                              paddingBottom: 1,
                            }}
                          >
                            PHP
                          </Typography>
                          <Stack direction={"column"}>
                            <Typography>2,345.00</Typography>
                            <Typography
                              sx={{ fontSize: "10px", fontWeight: 400 }}
                            >
                              Available Balance
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(100, 100, 100, 0.5)", // Dark transparent overlay
                          zIndex: 0, // Stays behind content
                        }}
                      />
                    </Box>
                  </Stack>
                  <Stack
                    sx={{
                      paddingTop: 5,
                      padding: 1,
                      width: "20%",
                      marginTop: 3,
                    }}
                  >
                    <Stack
                      padding={3}
                      marginTop={3}
                      sx={{
                        boxShadow: 2,
                        backgroundColor: "rgba(180,180,180,0.5)",
                      }}
                    >
                      <Shield size={30} />
                      <Typography variant="h6">
                        Use Mobile Key on the new BPI app
                      </Typography>

                      <Typography variant="caption" sx={{ paddingRight: 2 }}>
                        Authorize transaction here,in the new BPI app by
                        activating Mobile Key on the new BPI and instead of the
                        older BPI app.
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
              <Box
                sx={{
                  position: "fixed",
                  left: 300,
                  top: 0,
                  height: "100vh",
                  width: 400,
                  backgroundColor: "#fff",
                  boxShadow: 3,
                  paddingX: 2,
                  paddingY: 2,
                  overflowY: "auto",
                  zIndex: 1000,
                }}
              >
                <Stack direction={"row"} justifyContent={"flex-end"}>
                  <IconButton onClick={() => setShowMorePanel(false)}>
                    <X />
                  </IconButton>
                </Stack>
                <More setShowMorePanel={setShowMorePanel} />
              </Box>
            </>
          )}

          {showTransferPanel && (
            <>
              <Box
                onClick={() => setShowTransferPanel(false)}
                sx={{
                  position: "fixed",
                  left: 300,
                  top: 0,
                  height: "100vh",
                  width: "90vw",
                  backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark transparent backdrop
                  zIndex: 999, // Behind the Transfer Panel but above everything else
                }}
              >
                <Stack
                  sx={{ width: "90%", marginTop: "10%" }}
                  direction={"row"}
                  spacing={2}
                >
                  <Stack sx={{ width: "80%" }}>
                    <Box
                      sx={{
                        boxShadow: 3,
                        padding: 3,
                        backgroundColor: "#fff",
                        position: "relative",
                        overflow: "hidden",
                        width: "100%",
                      }}
                    >
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography variant="body2">Hello User,</Typography>

                        <IconButton>
                          <CaretUp />
                        </IconButton>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(100, 100, 100, 0.5)", // Dark transparent overlay
                            zIndex: 0, // Stays behind content
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box sx={{ paddingX: 5 }}>
                      {" "}
                      <Divider />{" "}
                    </Box>
                    <Box
                      sx={{
                        boxShadow: 3,
                        padding: 3,
                        backgroundColor: "#fff",
                        position: "relative",
                        overflow: "hidden",
                        width: "100%",
                      }}
                    >
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography variant="body2">Hello User,</Typography>

                        <Stack
                          direction={"row"}
                          spacing={1}
                          alignItems={"center"}
                        >
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 500,
                              paddingBottom: 1,
                            }}
                          >
                            PHP
                          </Typography>
                          <Stack direction={"column"}>
                            <Typography>2,345.00</Typography>
                            <Typography
                              sx={{ fontSize: "10px", fontWeight: 400 }}
                            >
                              Available Balance
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(100, 100, 100, 0.5)", // Dark transparent overlay
                          zIndex: 0, // Stays behind content
                        }}
                      />
                    </Box>
                  </Stack>
                  <Stack
                    sx={{
                      paddingTop: 5,
                      padding: 1,
                      width: "20%",
                      marginTop: 3,
                    }}
                  >
                    <Stack
                      padding={3}
                      marginTop={3}
                      sx={{
                        boxShadow: 2,
                        backgroundColor: "rgba(180,180,180,0.5)",
                      }}
                    >
                      <Shield size={30} />
                      <Typography variant="h6">
                        Use Mobile Key on the new BPI app
                      </Typography>

                      <Typography variant="caption" sx={{ paddingRight: 2 }}>
                        Authorize transaction here,in the new BPI app by
                        activating Mobile Key on the new BPI and instead of the
                        older BPI app.
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
              <Box
                sx={{
                  position: "fixed",
                  left: 300,
                  top: 0,
                  height: "100vh",
                  width: 400,
                  backgroundColor: "#fff",
                  boxShadow: 3,
                  paddingX: 2,
                  paddingY: 2,
                  overflowY: "auto",
                  zIndex: 1000,
                }}
              >
                <Stack direction={"row"} justifyContent={"flex-end"}>
                  <IconButton onClick={() => setShowTransferPanel(false)}>
                    <X />
                  </IconButton>
                </Stack>
                <Transfer setShowTransferPanel={setShowTransferPanel} />
              </Box>
            </>
          )}
        </Layout>
      )}
    </>
  );
};

export default AfterLoginLayout;
