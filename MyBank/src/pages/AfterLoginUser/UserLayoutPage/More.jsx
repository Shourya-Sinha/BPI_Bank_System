import { CreditCardOutlined } from "@ant-design/icons";
import { AccountBalance, BackupTable, CancelPresentation, DateRange, Description, Groups, LowPriority, Payment } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { GearSix, User } from "phosphor-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const More = ({ setShowMorePanel }) => {
  const navigate = useNavigate();
  // Close panel on link click
  const handleClosePanel = (path) => {
    navigate(path);
    setShowMorePanel(false); // Close the transfer panel
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
        <Typography variant="h5">More</Typography>

        <IconButton>
          <BackupTable />
        </IconButton>
      </Stack>
      <Typography>What would you like to do?</Typography>

      <Stack sx={{marginTop:3}}>
        <Typography variant="h6">Settings</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack  sx={{
                backgroundColor: "#ffe0b2",
                padding: 3,
                borderRadius: 0.5,
                marginTop:1
              }}
              alignItems={"center"}
              justifyContent={"center"}>
 <GearSix style={{ fontSize: "30px" }} color="#fb8c00" />
            </Stack>
            <Typography variant="caption">General settings</Typography>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
      </Stack>

      <Stack sx={{marginTop:3}}>
        <Typography variant="h6">Card Management</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack  sx={{
                backgroundColor: "#c8e6c9",
                padding: 3,
                borderRadius: 0.5,
                marginTop:1
              }}
              alignItems={"center"}
              justifyContent={"center"}>
 <CreditCardOutlined style={{ fontSize: "27px",color:"#689f38" }}  />
            </Stack>
            <Typography variant="caption">Card control</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack  sx={{
                backgroundColor: "#c8e6c9",
                padding: 3,
                borderRadius: 0.5,
                marginTop:1
              }}
              alignItems={"center"}
              justifyContent={"center"}>
<Payment style={{ fontSize: "30px",color:"#689f38"  }}  />
            </Stack>
            <Typography variant="caption">New Debit card</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack  sx={{
                backgroundColor: "#c8e6c9",
                padding: 3,
                borderRadius: 0.5,
                marginTop:1
              }}
              alignItems={"center"}
              justifyContent={"center"}>
 <Payment style={{ fontSize: "30px",color:"#689f38"  }}  />
            </Stack>
            <Typography variant="caption">Debit card replacement</Typography>
          </Grid>

          
        </Grid>
      </Stack>

      <Stack sx={{marginTop:3}}>
        <Typography variant="h6">Services</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack  sx={{
                backgroundColor: "#b3e5fc",
                padding: 3,
                borderRadius: 0.5,
                marginTop:1
              }}
              alignItems={"center"}
              justifyContent={"center"}>
 <LowPriority sx={{ fontSize: "29px",color:"#0277bd" }}  />
            </Stack>
            <Typography variant="caption">Reorder checkbook</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack  sx={{
                backgroundColor: "#b3e5fc",
                padding: 3,
                borderRadius: 0.5,
                marginTop:1
              }}
              alignItems={"center"}
              justifyContent={"center"}>
<CancelPresentation sx={{ fontSize: "30px",color:"#0277bd"   }}  />
            </Stack>
            <Typography variant="caption">Stop payment order</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack  sx={{
                backgroundColor: "#b3e5fc",
                padding: 3,
                borderRadius: 0.5,
                marginTop:1
              }}
              alignItems={"center"}
              justifyContent={"center"}>
 <Description sx={{ fontSize: "30px",color:"#0277bd"  }}  />
            </Stack>
            <Typography variant="caption">My Statements</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack  sx={{
                backgroundColor: "#b3e5fc",
                padding: 3,
                borderRadius: 0.5,
                marginTop:1
              }}
              alignItems={"center"}
              justifyContent={"center"}>
 <DateRange style={{ fontSize: "30px",color:"#0277bd"  }}  />
            </Stack>
            <Typography variant="caption">BPI Express main (Dates)</Typography>
          </Grid>
        </Grid>
      </Stack>

     
    </Box>
  </Box>
    </>

  )
}

export default More