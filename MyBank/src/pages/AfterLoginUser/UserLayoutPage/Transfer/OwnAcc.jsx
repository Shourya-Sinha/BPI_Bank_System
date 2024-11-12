import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Pig from "../../../../assets/pig.png";
import { ArrowLeft } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const OwnAcc = () => {
  const navigate = useNavigate();
  const Muitheme = useTheme();
  const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down("sm"));
  return (
    <>
      {isSmallScreen ? (
        <Box sx={{ maxWidth: "100%" }}>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <IconButton onClick={() => navigate("/user/transfermob")}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="h5" sx={{ paddingY: 2 }}>
              To Own Account
            </Typography>
          </Stack>

          <Box sx={{ maxWidth: "100%", boxShadow: 3, paddingX: 3 }}>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ width: "100%", height: "70vh" }}
            >
              <img src={Pig} alt="Pig Image" style={{ width: "20%" }} />

              <Typography variant="subtitle2">
                No eligible accounts found
              </Typography>
              <Typography variant="body2">
                There are no eligible accounts for your transaction. Please
                contact the bank for assistance.
              </Typography>
            </Stack>
          </Box>
        </Box>
      ) : (
        <Box sx={{ maxWidth: "100%" }}>
          <Typography variant="h5" sx={{ paddingY: 2 }}>
            To Own Account
          </Typography>

          <Box sx={{ maxWidth: "80%", boxShadow: 3 }}>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ width: "100%", height: "70vh" }}
            >
              <img src={Pig} alt="Pig Image" style={{ width: "20%" }} />

              <Typography variant="subtitle2">
                No eligible accounts found
              </Typography>
              <Typography variant="body2">
                There are no eligible accounts for your transaction. Please
                contact the bank for assistance.
              </Typography>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default OwnAcc;
