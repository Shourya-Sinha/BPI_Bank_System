import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CaretRight } from "phosphor-react";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ResendOtp, VerifyOtp } from "../Redux/UserAuth/Auth";

const VerifyEmail = () => {
  const { verifyEmail ,registerEmail,isLoading} = useSelector((state) => state.auth);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    otp: "",
  });

  useEffect(() => {
    if (registerEmail) {
      setFormValues((prevState) => ({
        ...prevState,
        email: registerEmail, // Set form email to Redux state email
      }));
    }
  }, [registerEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("fornmvalues in otp", formValues);
    setLoading(true);
    try {
        dispatch(VerifyOtp(formValues));
        setLoading(false);
    } catch (error) {
        setLoading(false);
    }
    
  };


    if (verifyEmail ) {
      return <Navigate to={"/login"} />;
    }

    const handleResendOtp = (e) => {
        e.preventDefault();
        
        // Debugging to check if email is correct   
        console.log("Resending OTP to email:", formValues.email);
    
        if (!formValues.email) {
          console.error("Email is required to resend OTP.");
          return; // Exit if no email is available
        }
    console.log("Resending OTP to email:", formValues.email);
        dispatch(ResendOtp(formValues.email)); // Dispatch ResendOtp action with the email
      };

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ marginTop: 3 }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography
                variant="h3"
                sx={{ color: "#c62828", fontWeight: 800 }}
              >
                BPI
              </Typography>
            </Stack>

            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Typography variant="body2" component={RouterLink} to={"/"}>
                Home
              </Typography>
              <Typography variant="body2">Contact Us</Typography>
              <Typography variant="body2">Privacy Policy</Typography>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ marginTop: 5, maxWidth: 900, marginX: "auto" }}>
          <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
            <Typography variant="caption">Login</Typography>
            <CaretRight />
            <Typography variant="subtitle2">Forgot Passowrd</Typography>
          </Stack>

          <Box sx={{ boxShadow: 3 }}>
            <Box
              sx={{
                borderBottom: "2px solid #ddd",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, color: "#c62828" }}
              >
                BPI
              </Typography>
            </Box>
            <Box sx={{ maxWidth: 600 }}>
              <Stack sx={{ marginTop: 5, paddingX: 5 }}>
                <Typography variant="h5" sx={{ color: "#233840" }}>
                  Forgot your password?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ paddingTop: 2, color: "#3D5159" }}
                >
                  To reset your password, we need some information to verify
                  your identity. If you need further assistance,{" "}
                  <Link sx={{ color: "#20A39E" }}>contact us</Link>
                </Typography>
              </Stack>

              <Stack
                sx={{ paddingX: 5, marginTop: 2, paddingBottom: 5 }}
                spacing={2}
              >
                <TextField
                  fullWidth
                  variant="outlined" // or "filled", "standard"
                  placeholder="Enter Email"
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

                <Typography variant="h6">Enter OTP</Typography>
                <TextField
                  fullWidth
                  variant="outlined" // or "filled", "standard"
                  placeholder="Enter OTP"
                  autoComplete="off"
                  name="otp"
                  value={formValues.otp}
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

                <Stack direction={"row"} sx={{ justifyContent: "flex-end" }}>
                  <Button
                  onClick={handleSubmit}
                    variant="contained"
                    sx={{ paddingX: 5, borderRadius: 0.5 }}
                  >
                    {isLoading ? <CircularProgress sx={{color:'#c6ff00'}} /> : 'SUBMIT'}
                  </Button>
                </Stack>
                <Stack sx={{ marginTop: 2, paddingTop: 2 }}>
                  <Typography variant="body2">
                    IF OTP EXPIRE RESEND OTP?
                  </Typography>
                  <Button sx={{ color: "#20A39E" }} onClick={handleResendOtp}> {loading ? <CircularProgress /> : 'Resend OTP?'} </Button>
              </Stack>
            </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default VerifyEmail;
