import React, { useEffect, useState } from "react";
import MinImage from "../assets/login.svg";
import Secure from "../assets/bitmap-global.svg";
import Banknet from "../assets/bitmap-bancNet.svg";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { CaretRight, Eye, EyeSlash } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUserFun } from "../Redux/UserAuth/Auth";

const RegisterUser = () => {
  const Muitheme = useTheme();
  const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down('sm'));
    const {isRegisterSuccess,isLoading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
  });

  const isLoginDisabled = !formValues.firstName || !formValues.lastName || !formValues.email || !formValues.password || !formValues.phoneNo;


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('register data',formValues);
    dispatch(RegisterUserFun(formValues));
  }

  if (isRegisterSuccess) {
    return <Navigate to="/verify-email" />;
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display:isSmallScreen ? "": "flex",
          flexDirection:isSmallScreen ? "" : "row",
        }}
      >
        {/* Left side */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "390px",
              backgroundColor: "#fff",
              padding: 2,
              // boxShadow: 3,
              px: 3,
              paddingLeft: 5,
            }}
          >
            <Typography
              sx={{
                color: "#dc3545",
                fontSize: "35px",
                fontWeight: 700,
                paddingTop: 4,
                paddingBottom: 2,
              }}
            >
              BPI
            </Typography>
            <Typography
              sx={{
                fontSize: "32px",
                color: "#233840",
                mb: 3,
                fontWeight: 600,
              }}
            >
              Welcome!
            </Typography>

            {/* Form */}

            <Box>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  placeholder="First Name"
                  autoComplete="off"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  sx={{
                    padding: 0.2,
                    borderRadius: 0.5,
                    fontSize: 16,
                    backgroundColor: "#eeeeee",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  placeholder="Last Name"
                  autoComplete="off"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  sx={{
                    padding: 0.2,
                    borderRadius: 0.5,
                    fontSize: 16,
                    backgroundColor: "#eeeeee",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  sx={{
                    padding: 0.2,
                    borderRadius: 0.5,
                    fontSize: 16,
                    backgroundColor: "#eeeeee",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  placeholder="Phone Number"
                  autoComplete="off"
                  name="phoneNo"
                  value={formValues.phoneNo}
                  onChange={handleInputChange}
                  sx={{
                    padding: 0.2,
                    borderRadius: 0.5,
                    fontSize: 16,
                    backgroundColor: "#eeeeee",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  sx={{
                    padding: 0.2,
                    borderRadius: 0.5,
                    fontSize: 16,
                    backgroundColor: "#eeeeee",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Stack>
                  <Button
                    variant={"contained"}
                    sx={{
                      backgroundColor: isLoginDisabled
                        ? "rgb(242,196,198) "
                        : "rgb(211,59,64)",
                      color: "#fff",
                      paddingY: 1.5,
                      borderRadius: 0.5, // Vertical padding
                      boxShadow: "none",
                    }}
                    // disabled={isLoginDisabled}
                    onClick={handleSubmit}
                  >
                    {isLoading ? <CircularProgress sx={{color:'#c6ff00'}} /> : 'Register with us'}
                  </Button>
                  <Stack
                    justifyContent={"center"}
                    direction={"row"}
                    paddingTop={2}
                    spacing={0.5}
                  >
                    <Typography>Already have an account?</Typography>
                    <Link
                      href="/login"
                      sx={{
                        color: "#20A39E",
                        fontSize: 16,
                        textDecoration: "underline",
                      }}
                    >
                      Login
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Box>
          {/* Bottom left */}
          <Box>
            <Stack sx={{ paddingX: 2 }} spacing={1}>
              <Divider />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle2">
                  Show inquiries and other services
                </Typography>

                <Box sx={{ paddingLeft: 10 }}>
                  <IconButton>
                    <CaretRight />
                  </IconButton>
                </Box>
              </Box>
              <Divider />
              <Stack sx={{ width: "350px", paddingBottom: 2 }} spacing={2}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgb(99,116,123)",
                    fontWeight: 600,
                  }}
                >
                  Deposits are insured by PDIC up to Php 500,000 per depositor.
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgb(99,116,123)",
                    fontWeight: 600,
                  }}
                >
                  For inquiries and comments please{" "}
                  <a style={{ textDecoration: "underline", color: "#20A39E" }}>
                    {" "}
                    send us a message
                  </a>{" "}
                  or call our 24-hour BPI Contact Center at (+632) 889-10000.
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgb(99,116,123)",
                    fontWeight: 600,
                  }}
                >
                  BPI is a proud member of BancNet. BPI is regulated by the
                  Bangko Sentral ng Pilipinas.
                  <a style={{ textDecoration: "underline", color: "#20A39E" }}>
                    https://www.bsp.gov.ph
                  </a>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgb(99,116,123)",
                    fontWeight: 600,
                  }}
                >
                  Copyright Ⓒ {new Date().getFullYear()} BPI. All rights
                  reserved.
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        {/* Right Side */}
        {!isSmallScreen && (
  <Box
  sx={{ backgroundColor: "rgb(249 250 251)", flexGrow: 1, padding: 1 }}
>
  {/* Header */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 3, // spacing between items
      p: 5, // padding for header section
    }}
  >
    <Typography variant="caption" component={RouterLink} to={"/"}>
      Home
    </Typography>
    <Typography variant="caption">Contact Us</Typography>
    <Typography variant="caption">Privacy Policy</Typography>
  </Box>

  {/* Centered Image */}
  <Box
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      p: 3,
      alignItems: "center",
      marginTop: 10,
      height: "60vh",
    }}
  >
    <img
      src={MinImage}
      alt="Login Image"
      style={{ objectFit: "cover", width: "100%", maxWidth: "600px" }}
    />
  </Box>

  {/* footer */}

  <Box sx={{ position: "relative", top: 90 }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 3, // spacing between items
        p: 3, // padding for footer section
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Typography
          component={Link}
          variant="subtitle2"
          sx={{ textDecoration: "underline", color: "#3D5159" }}
        >
          Service Agreement
        </Typography>
        <Typography
          component={Link}
          variant="subtitle2"
          sx={{ textDecoration: "underline", color: "#3D5159" }}
        >
          Learn About Security
        </Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <img src={Secure} alt="FIRST iMAGE" />
        <Stack direction={"column"} spacing={0.5}>
          <Typography variant="caption">Proud member of</Typography>
          <img src={Banknet} alt="Bank Nrt Image" />
        </Stack>
      </Stack>
    </Box>
  </Box>
</Box>
        )}
      
      </Box>
    </>
  );
};

export default RegisterUser;
