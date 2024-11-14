import React, { useState } from "react";
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
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { CaretRight, Eye, EyeSlash } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../Redux/UserAuth/Auth";

const HiddenScrollbarContainer = styled("div")({
  overflow: "hidden", // Prevent scrolling
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for webkit browsers
  },
  scrollbarWidth: "none", // Hide scrollbar for Firefox
});

const Login = () => {
  const Muitheme = useTheme();
  const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down("sm"));
  const { isLoading, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const isLoginDisabled = !formValues.email || !formValues.password;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formvalues login", formValues);
    dispatch(LoginUser(formValues));
    // Call API to login
    // Redirect to dashboard
  };

  if (isLoggedIn) {
    return <Navigate to={"/user/mainacc"} />;
  }
  return (
    <>
    {isSmallScreen ? (
      <HiddenScrollbarContainer
      sx={{
        width: "100%",
        height: "100vh",
        display: isSmallScreen ? "block" : "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        overflowY:'auto'
      }}
    >
      {/* Left side */}
      <Box
        sx={{
          display: "flex",
          justifyContent: isSmallScreen ? "center" : "space-between",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: isSmallScreen ? "100%" : "390px",
            backgroundColor: "#fff",
            padding: 10,
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
              paddingTop: 10,
              paddingBottom: 1,
            }}
          >
            BPI
          </Typography>
          {isSmallScreen && (
            <Typography
            variant="caption"
            component={RouterLink}
            to={"/"}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            Home
          </Typography>
          )}
          
          <Typography
            sx={{
              fontSize: "32px",
              color: "#233840",
              mb: 1,
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
                variant="outlined" // or "filled", "standard"
                placeholder="Username"
                autoComplete="off"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                sx={{
                  padding: 0.2, // TextField's internal padding
                  borderRadius: 0.5,
                  fontSize: 16,
                  backgroundColor: "#eeeeee",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none", // Hide border
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                variant="outlined" // or "filled", "standard"
                placeholder="Pasword"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                value={formValues.password}
                name="password"
                onChange={handleInputChange}
                sx={{
                  padding: 0.2, // TextField's internal padding
                  borderRadius: 0.5,
                  fontSize: 16,
                  backgroundColor: "#eeeeee",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none", // Hide border
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
                  onClick={handleSubmit}
                  //   disabled={isLoginDisabled}
                >
                  {isLoading ? <CircularProgress /> : "Log in"}
                </Button>
                <Stack
                  justifyContent={"center"}
                  direction={"row"}
                  paddingTop={2}
                  spacing={0.5}
                >
                  <Typography>Forgot</Typography>
                  <Link
                    href="#"
                    sx={{
                      color: "#20A39E",
                      fontSize: 16,
                      textDecoration: "underline",
                    }}
                  >
                    username
                  </Link>
                  <Typography>or</Typography>
                  <RouterLink
                    to={"/forgot-password"}
                    href="#"
                    sx={{
                      color: "#20A39E",
                      fontSize: 16,
                      textDecoration: "underline",
                    }}
                  >
                    password
                  </RouterLink>
                </Stack>

                <Stack paddingTop={2}>
                  <Divider>OR</Divider>
                </Stack>
              </Stack>

              <Stack >
                <Button
                  variant="outlined"
                  sx={{
                    paddingY: 2,
                    borderColor: "#000",
                    borderRadius: 0.5,
                    color: "#233840",
                  }}
                  component={RouterLink}
                  to="/registerUser"
                >
                  Register now
                </Button>
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
          sx={{
            backgroundColor: "rgb(249 250 251)",
            flexGrow: 1,
            padding: 1,
          }}
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
    </HiddenScrollbarContainer>
    ):(
      <HiddenScrollbarContainer
        sx={{
          width: "100%",
          height: "100vh",
          display: isSmallScreen ? "block" : "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          overflowY:'auto'
        }}
      >
        {/* Left side */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "center" : "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: isSmallScreen ? "100%" : "390px",
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
                paddingTop: 2,
                paddingBottom: 2,
              }}
            >
              BPI
            </Typography>
            {isSmallScreen && (
              <Typography
              variant="caption"
              component={RouterLink}
              to={"/"}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              Home
            </Typography>
            )}
            
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
                  variant="outlined" // or "filled", "standard"
                  placeholder="Username"
                  autoComplete="off"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  sx={{
                    padding: 0.2, // TextField's internal padding
                    borderRadius: 0.5,
                    fontSize: 16,
                    backgroundColor: "#eeeeee",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // Hide border
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined" // or "filled", "standard"
                  placeholder="Pasword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  value={formValues.password}
                  name="password"
                  onChange={handleInputChange}
                  sx={{
                    padding: 0.2, // TextField's internal padding
                    borderRadius: 0.5,
                    fontSize: 16,
                    backgroundColor: "#eeeeee",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // Hide border
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
                    onClick={handleSubmit}
                    //   disabled={isLoginDisabled}
                  >
                    {isLoading ? <CircularProgress /> : "Log in"}
                  </Button>
                  <Stack
                    justifyContent={"center"}
                    direction={"row"}
                    paddingTop={2}
                    spacing={0.5}
                  >
                    <Typography>Forgot</Typography>
                    <Link
                      href="#"
                      sx={{
                        color: "#20A39E",
                        fontSize: 16,
                        textDecoration: "underline",
                      }}
                    >
                      username
                    </Link>
                    <Typography>or</Typography>
                    <RouterLink
                      to={"/forgot-password"}
                      href="#"
                      sx={{
                        color: "#20A39E",
                        fontSize: 16,
                        textDecoration: "underline",
                      }}
                    >
                      password
                    </RouterLink>
                  </Stack>

                  <Stack paddingTop={4}>
                    <Divider>OR</Divider>
                  </Stack>
                </Stack>

                <Stack paddingTop={2}>
                  <Button
                    variant="outlined"
                    sx={{
                      paddingY: 2,
                      borderColor: "#000",
                      borderRadius: 0.5,
                      color: "#233840",
                    }}
                    component={RouterLink}
                    to="/registerUser"
                  >
                    Register now
                  </Button>
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
            sx={{
              backgroundColor: "rgb(249 250 251)",
              flexGrow: 1,
              padding: 1,
            }}
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
      </HiddenScrollbarContainer>
    )}

      {/* <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
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



            <Box>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  variant="outlined" // or "filled", "standard"
                  placeholder="Username"
                  autoComplete="off"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  sx={{
                    padding: 0.2, // TextField's internal padding
                    borderRadius: 0.5,
                    fontSize: 16,
                    backgroundColor: "#eeeeee",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // Hide border
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined" // or "filled", "standard"
                  placeholder="Pasword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  value={formValues.password}
                  name='password'
                  onChange={handleInputChange}
                  sx={{
                    padding: 0.2, // TextField's internal padding
                    borderRadius: 0.5,
                    fontSize: 16,
                    backgroundColor: "#eeeeee",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // Hide border
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
                    onClick={handleSubmit}
                    //   disabled={isLoginDisabled}
                  >
                    {isLoading ? <CircularProgress /> : 'Log in'} 
                  </Button>
                  <Stack
                    justifyContent={"center"}
                    direction={"row"}
                    paddingTop={2}
                    spacing={0.5}
                  >
                    <Typography>Forgot</Typography>
                    <Link
                      href="#"
                      sx={{
                        color: "#20A39E",
                        fontSize: 16,
                        textDecoration: "underline",
                      }}
                    >
                      username
                    </Link>
                    <Typography>or</Typography>
                    <RouterLink
                      to={"/forgot-password"}
                      href="#"
                      sx={{
                        color: "#20A39E",
                        fontSize: 16,
                        textDecoration: "underline",
                      }}
                    >
                      password
                    </RouterLink>
                  </Stack>

                  <Stack paddingTop={4}>
                    <Divider>OR</Divider>
                  </Stack>
                </Stack>

                <Stack paddingTop={2}>
                  <Button
                    variant="outlined"
                    sx={{
                      paddingY: 2,
                      borderColor: "#000",
                      borderRadius: 0.5,
                      color: "#233840",
                    }}
                    component={RouterLink}
                    to="/registerUser"
                  >
                    Register now
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>

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

        <Box
          sx={{ backgroundColor: "rgb(249 250 251)", flexGrow: 1, padding: 1 }}
        >

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
      </Box> */}
    </>
  );
};

export default Login;
