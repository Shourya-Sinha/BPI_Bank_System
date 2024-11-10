import React, { useState } from "react";
import Logo from "../../../assets/logo.svg";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Eye } from "phosphor-react";
import { LoginOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginAdmin } from "../../../Redux/UserAuth/Auth";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [formValues,setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange=(e)=>{
    const {name,value} = e.target;
    setFormValues({...formValues, [name]:value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log('login data',formValues);
    dispatch(LoginAdmin(formValues));
  }

  if(isLoggedIn){
    return <Navigate to="/admin" />;
  }
  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 15 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <img
              src={Logo}
              alt="Bpi Logo "
              style={{ width: 200, height: 80 }}
            />
          </Box>

          <Box sx={{ marginTop: 5 }}>
            <Typography
              variant="h5"
              sx={{ paddingY: 2, textTransform: "capitalize" }}
            >
              Login The Bpi Banking System for admin
            </Typography>
          </Box>

          <Box sx={{ marginTop: 1, width: "60%" }}>
            <Stack sx={{ paddingX: 3, borderBottom: "2px solid #8c8c8c" }}>
              <img
                src={Logo}
                alt="Bpi Logo"
                style={{ width: 100, height: 100 }}
              />
            </Stack>

            <Stack sx={{ marginTop: 2 }} spacing={2}>
              <TextField placeholder="Enter Email" autoComplete="off" name="email" value={formValues.email} onChange={handleInputChange} />
              <TextField
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleShowPassword}>
                      {" "}
                      <Eye />{" "}
                    </IconButton>
                  ),
                }}
              />
            </Stack>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2">
                Forgot{" "}
                <Link
                  to={"/admin/forgot-password"}
                  style={{ textDecoration: "none" }}
                >
                  Password ?
                </Link>{" "}
              </Typography>
              <Stack sx={{ direction: "row", marginTop: 3, borderRadius: 0.5 }}>
                <Button
                onClick={handleSubmit}
                  variant="contained"
                  sx={{ paddingX: 6, paddingY: 1 }}
                  endIcon={<LoginOutlined style={{ fontSize: 15 }} />}
                >
                  {isLoading ? <CircularProgress sx={{color:'#007bff'}} /> : "LOGIN"}
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
