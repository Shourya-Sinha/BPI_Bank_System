import {
    useMediaQuery,
    useTheme,
    Typography,
    Box,
    Grid,
    IconButton,
    Stack,
    styled,
  } from "@mui/material";
  import {
    AddCardOutlined,
    InstallMobileOutlined,
    MoreHorizOutlined,
    QrCodeScannerOutlined,
    ReceiptLongOutlined,
    WalletOutlined,
  } from "@mui/icons-material";
  import { AddressBook, CaretRight} from "phosphor-react";
  import React from "react";
  import { Link } from "react-router-dom";


const HiddenScrollbarContainer = styled("div")({
    overflow: "hidden", // Prevent scrolling
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for webkit browsers
    },
    scrollbarWidth: "none", // Hide scrollbar for Firefox
  });

const PayloadMob = () => {
  const Muitheme = useTheme();
  const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down("sm"));

  return (
    <>
          {isSmallScreen ? (
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            paddingX: 2,
            paddingY: 2,
            height: "80vh",
          }}
        >
         
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h5">Pay/Load</Typography>

                      <AddressBook  size={30} />
                   

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
            <HiddenScrollbarContainer sx={{ width: "100%", height:'100%',overflowY:'scroll',marginTop:2}}>


            <Stack sx={{ marginTop: 3 }}>
              <Typography variant="h6">Pay</Typography>
              <Grid container spacing={3} sx={{maxWidth:'120px'}}>
                <Grid item sm={4}>
                  <Stack
                    sx={{
                      backgroundColor: "#ffcdd2",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <ReceiptLongOutlined sx={{ fontSize: "30px", color:"#d32f2f" }} />
                  </Stack>
                  <Typography variant="caption" alignItems={'center'} sx={{alignItems:'center'}}>Bills</Typography>
                </Grid>
                <Grid item sm={4}></Grid>
                <Grid item sm={4}></Grid>
              </Grid>
            </Stack>

            <Stack sx={{ marginTop: 3 }}>
              <Typography variant="h6">Services</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#e8eaf6",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <AddCardOutlined sx={{ fontSize: "29px", color: "#303f9f" }} />
                  </Stack>
                  <Typography variant="caption">Prepaid Card</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#e8eaf6",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <InstallMobileOutlined
                      sx={{ fontSize: "30px", color: "#303f9f" }}
                    />
                  </Stack>
                  <Typography variant="caption">Prepaid Phone</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#e8eaf6",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <WalletOutlined sx={{ fontSize: "30px", color: "#303f9f" }} />
                  </Stack>
                  <Typography variant="caption">E-wallet</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{maxWidth: '120px'}}>
                  <Stack
                    sx={{
                      backgroundColor: "#e8eaf6",
                      padding: 3,
                      borderRadius: 0.5,
                      marginTop: 1,
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <MoreHorizOutlined style={{ fontSize: "30px", color: "#303f9f" }} />
                  </Stack>
                  <Typography variant="caption">
                    Other services
                  </Typography>
                </Grid>
              </Grid>
            </Stack>

            </HiddenScrollbarContainer>

        </Box>
      ) : (
        <Typography component={Link} to={"/app"}>
          Home Fallback
        </Typography>
      )}
    </>
  )
}

export default PayloadMob