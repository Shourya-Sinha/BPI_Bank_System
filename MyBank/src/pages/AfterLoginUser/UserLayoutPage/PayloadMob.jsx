import {
    useMediaQuery,
    useTheme,
    Typography,
    Box,
    Grid,
    IconButton,
    Stack,
    styled,
    TextField,
    Button,
    CircularProgress,
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
  import React, { useState } from "react";
  import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DepositeRequestAmount } from "../../../Redux/UserAuth/Auth";


const HiddenScrollbarContainer = styled("div")({
    overflow: "hidden", // Prevent scrolling
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for webkit browsers
    },
    scrollbarWidth: "none", // Hide scrollbar for Firefox
  });

const PayloadMob = () => {
  const dispatch = useDispatch();
  const Muitheme = useTheme();
  const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down("sm"));
  const { userBnakDetails } = useSelector(
    (state) => state.auth || { userBnakDetails: {} }
  );
  const { isLoading, myDepositeTransactions } = useSelector(
    (state) => state.auth || { myDepositeTransactions: [] }
  );
  const [formValues, setFormValues] = useState({
    amount: "",
    accountNumber: userBnakDetails?.accountNumber,
  });

  const handleInputDeposite = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleDeposite = (e) => {
    e.preventDefault();
    // console.log('formValues deposit',formValues);
    dispatch(DepositeRequestAmount(formValues))
  };

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

            <Box sx={{marginTop:5,marginBottom:10}}>
        <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                    <Typography variant="body2">
                      Want to Add Money in Your Account?
                    </Typography>
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <TextField
                        placeholder="Enter Amount"
                        name="amount"
                        value={formValues.amount}
                        onChange={handleInputDeposite}
                      />
                      <TextField
                        placeholder="Your Account Number"
                        name="accountNumber"
                        value={formValues.accountNumber}
                        onChange={handleInputDeposite}
                      />
                     
                    </Stack>
                    <Button
                        onClick={handleDeposite}
                        variant="contained"
                        sx={{
                          borderRadius: 0.5,
                          paddingX: 4,
                          paddingY: 2,
                          color: "#fff",
                          backgroundColor: "#b11116",
                          marginTop:2,
                          "&:hover": {
                            backgroundColor: "#fff",
                            color: "#b11116",
                            border: "1px solid #b11116",
                          },
                        }}
                      >
                        {isLoading ? (
                          <CircularProgress size={24} />
                        ) : (
                          "SEND REQUEST"
                        )}
                      </Button>
                  </Box>
        </Box>


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