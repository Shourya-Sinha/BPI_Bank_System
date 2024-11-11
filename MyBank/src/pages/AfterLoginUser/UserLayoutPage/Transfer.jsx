import { AccountBalance, BackupTable, Groups } from "@mui/icons-material";
import { Box, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { User } from "phosphor-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Transfer = ({ setShowTransferPanel }) => {
  const navigate = useNavigate();
  const handleClosePanel = (path) => {
    navigate(path);
    setShowTransferPanel(false); // Close the transfer panel
  };
  return (
    <>
    <Box
        sx={{
          maxWidth: 400,
          backgroundColor: "#fff",
          paddingX: 2,
          paddingY: 2,
          height: "80vh",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Transfer</Typography>

            <IconButton>
              <BackupTable />
            </IconButton>
          </Stack>
          <Typography>What would you like to do?</Typography>

          <Stack sx={{ marginTop: 3 }}>
            <Typography variant="h6" sx={{ paddingBottom: 1 }}>
              Transfer money
            </Typography>

            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={1}
              justifyContent={"space-around"}
            >
              <Stack spacing={1} onClick={() => handleClosePanel('/user/ownacc')} sx={{ cursor: "pointer", textAlign: "center" }}>
                <Stack
                  sx={{
                    backgroundColor: "#c8e6c9",
                    padding: 3,
                    borderRadius: 0.5,
                  }}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <User style={{ fontSize: "30px" }} color="#689f38" />
                </Stack>
                <Typography variant="caption">To own account</Typography>
              </Stack>
              <Stack spacing={1} onClick={() => handleClosePanel('/user/anotherbpi')}
              sx={{ cursor: "pointer", textAlign: "center" }}>
                <Stack
                  sx={{
                    backgroundColor: "#c8e6c9",
                    padding: 3,
                    borderRadius: 0.5,
                  }}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Groups
                    sx={{ color: "#689f38", fontSize: "30px" }}
                    color="#689f38"
                  />
                </Stack>
                <Typography variant="caption">To another BPI account</Typography>
              </Stack>
              <Stack spacing={1} onClick={() => handleClosePanel('/user/anotherbank')}
              sx={{ cursor: "pointer", textAlign: "center" }}>
                <Stack
                  sx={{
                    backgroundColor: "#c8e6c9",
                    padding: 3,
                    borderRadius: 0.5,
                  }}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <AccountBalance sx={{ color: "#689f38", fontSize: "30px" }} />
                </Stack>
                <Typography variant="caption">To another bank</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    {/* </Dialog> */}
    </>
  );
};

export default Transfer;
