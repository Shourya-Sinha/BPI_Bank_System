import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  BarChartOutlined,
  FilePptOutlined,
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
  GearSix,
  SignOut,
  UserCircleGear,
  X,
} from "phosphor-react";
import { Layout, Menu, theme, Button as AntDButton } from "antd";
const { Header, Sider, Content } = Layout;
import Logo from '../../../assets/logo.svg';
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
} from "@mui/material";
import Transfer from "../UserLayoutPage/Transfer";
import More from "../UserLayoutPage/More";
import { useDispatch, useSelector } from "react-redux";
import { GetUserBankDetails, LogoutUser } from "../../../Redux/UserAuth/Auth";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AfterLoginLayout = () => {
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

  const [collapsed, setCollapsed] = useState(false);
  const [showTransferPanel, setShowTransferPanel] = useState(false);
  const [showMorePanel, setShowMorePanel] = useState(false);
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
      icon:<TransactionOutlined />,
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
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // Render nothing temporarily while redirecting
  }

  const handleLogout = () => {
    dispatch(LogoutUser());
  };

  // console.log('userbankldetails in page',userBnakDetails);

  return (
    <>
      {open && (
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
              >
                {/* <Link to={item.path}>{item.label}</Link>{" "} */}
                {userBnakDetails?.accountNumber ? (
                  <Link to={item.path}>{item.label}</Link> // Show link only if `accountNo` is present
                ) : (
                  item.label // Display plain label if `accountNo` is missing
                )}
                {/* Wrap label with Link */}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
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
                    Create Account
                  </Typography>
                )}
              </Stack>

              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <IconButton>
                  <MailOutlined />
                </IconButton>
                <Divider orientation="vertical" flexItem />

                <IconButton component={Link} to={'/user/myprofile'} >
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
        )}

        {showTransferPanel && (
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
        )}
      </Layout>
    </>
  );
};

export default AfterLoginLayout;
