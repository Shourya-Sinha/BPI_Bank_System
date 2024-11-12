import { AccountBalance, BackupTable, Groups, QrCodeScannerOutlined } from "@mui/icons-material";
import { Box, Dialog, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AddressBook, CaretRight, User } from "phosphor-react";
import React, { useState } from "react";
import {Link as RouterLink,useNavigate} from 'react-router-dom';
const TransferMob = () => {
    const navigate = useNavigate();
    const Muitheme = useTheme();
    const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down("sm"));
  return (
    <>
    {isSmallScreen ? (
    <Box
    sx={{
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
          <AddressBook />
        </IconButton>
      </Stack>
      <Typography>What would you like to do?</Typography>
      <Box sx={{marginTop:2,padding:2,boxShadow:2,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
               <Stack spacing={3} direction={'row'} alignItems={'center'}>
                <QrCodeScannerOutlined sx={{fontSize:'40px',color:'#c62828'}} />
                <Typography variant="h6">Pay via QR code</Typography>
               </Stack>

               <IconButton>
                <CaretRight />
               </IconButton>
            </Box>
      <Stack sx={{ marginTop: 3 }}>
        <Typography variant="h6" sx={{ paddingBottom: 1 }}>
          Transfer money
        </Typography>

        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={3}
        >
          <Stack spacing={1} onClick={() => navigate('/user/ownacc')} sx={{ cursor: "pointer", textAlign: "center" }}>
            <Stack
              sx={{
                width:'100px',
                backgroundColor: "#c8e6c9",
                padding: 3,
                borderRadius: 0.5,
              }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <User style={{ fontSize: "30px" }} color="#689f38" />
            </Stack>
            <Typography variant="caption"sx={{wordWrap: 'break-word', maxWidth: '80px',}}>To own account</Typography>
          </Stack>
          <Stack spacing={1} onClick={() => navigate('/user/anotherbpi')}
          sx={{ cursor: "pointer", textAlign: "center" }}>
            <Stack
              sx={{
                width:'100px',
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
            <Typography variant="caption" sx={{wordWrap: 'break-word', maxWidth: '80px',}}>To another BPI account</Typography>
          </Stack>
          <Stack spacing={1} onClick={() => navigate('/user/anotherbank')}
          sx={{ cursor: "pointer", textAlign: "center" }}>
            <Stack
              sx={{
                width:'100px',
                backgroundColor: "#c8e6c9",
                padding: 3,
                borderRadius: 0.5,
              }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <AccountBalance sx={{ color: "#689f38", fontSize: "30px" }} />
            </Stack>
            <Typography variant="caption" sx={{wordWrap: 'break-word', maxWidth: '80px',}}>To another bank</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  </Box>
    ):(
        <Typography component={RouterLink} to={'/app'}>You are as on Fallback Go to Home</Typography>
    )}
    </>
  )
}

export default TransferMob