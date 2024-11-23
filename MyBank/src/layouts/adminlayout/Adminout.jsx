import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  CreditCardOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TransactionOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button as AntDButton } from "antd";
const { Header, Sider, Content } = Layout;
import Logo from "../../assets/logo.svg";
import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAdmin } from "../../Redux/UserAuth/Auth";
import {
  fetchAdminDetails,
  getAllUser,
  getAnnualData,
  getMonthlyData,
  getRecentUserData,
  getWeeklyData,
  LogoutAdminn,
} from "../../Redux/Admin/AdminFunction";
import { ManageHistory } from "@mui/icons-material";

const Adminout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user = null } = useSelector((state) => state.auth) || {};
  const { userList, recentUsers } = useSelector((state) => state.admin || []);
  const { weeklyTrans, monthlyTrans, annualTrans, adminDetails } = useSelector(
    (state) => state.admin
  );
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin/maindash",
    },
    {
      key: "bankuser",
      icon: <UsergroupAddOutlined />,
      label: "Our Customers",
      path: "/admin/customers",
    },
    {
      key: "transaction",
      icon: <TransactionOutlined />,
      label: "Transactions Flow",
      path: "/admin/transactions",
    },
    {
      key: "creditcard",
      icon: <ManageHistory />,
      label: "Create History",
      path: "/admin/creditcard",
    },
    {
      key: "editedtransaction",
      icon: <TransactionOutlined />,
      label: "Edited Transaction History",
      path: "/admin/edited-transaction",
    },
    {
      key: "userinfo",
      icon: <UserAddOutlined />,
      label: "Admin Information",
      path: "/admin/userinfo",
    },
  ];
  const selectedKey = menuItems.find((item) =>
    location.pathname.includes(item.path)
  )?.key;

  const handleLogout = () => {
    dispatch(LogoutAdminn());
    dispatch(LogoutAdmin());

  };

  useEffect(() => {
    if (!isLoggedIn) {
      // Programmatically navigate to login if not logged in
      navigate("/admin/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getRecentUserData());
    dispatch(getWeeklyData());
    dispatch(getMonthlyData());
    dispatch(getAnnualData());
    dispatch(fetchAdminDetails());
  }, [dispatch]);

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{ borderBottom: "2px solid #ffdc52", marginBottom: 15 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
            items={menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: <Link to={item.path}>{item.label}</Link>, // Wrap label with Link
            }))}
          >
            {/* {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>{" "}
             
              </Menu.Item>
            ))} */}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
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
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Avatar
                  src={
                    adminDetails?.avatar?.secure_url
                      ? adminDetails?.avatar?.secure_url
                      : ""
                  }
                />
                <Stack direction={"column"}>
                  <Typography variant="body2">
                    {adminDetails?.email ? adminDetails?.email : "ADMIN"}
                  </Typography>
                  <Typography variant="caption">
                    {" "}
                    {`${adminDetails?.firstName} ${adminDetails?.lastName}`
                      ? `${adminDetails?.firstName} ${adminDetails?.lastName}`
                      : "ADMIN"}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Link to={isLoggedIn ? "/admin/userinfo" : "/admin/login"}>
                  {isLoggedIn ? "My Info" : "Admin Login"}
                </Link>

                <Button sx={{ border: "none" }} onClick={handleLogout}>
                  Logout
                </Button>
              </Stack>
            </Box>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Adminout;
