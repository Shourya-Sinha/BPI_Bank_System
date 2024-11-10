import React from 'react';
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import Logo from "../../../assets/logo.svg";
import { Link } from 'react-router-dom';

const AdminResetPass = () => {
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

            <Stack sx={{ marginTop: 2 }}>
              <TextField placeholder="Password" autoComplete="off" />
              <TextField placeholder="Confirm Password" autoComplete="off" />
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
                Return to {" "}
                <Link
                  to={"/admin/login"}
                  style={{ textDecoration: "none" }}
                >
                  Login ?
                </Link>{" "}
              </Typography>
              <Stack sx={{ direction: "row", marginTop: 3, borderRadius: 0.5 }}>
                <Button
                  variant="contained"
                  sx={{ paddingX: 6, paddingY: 1 }}
                >
                  SUBMIT
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AdminResetPass