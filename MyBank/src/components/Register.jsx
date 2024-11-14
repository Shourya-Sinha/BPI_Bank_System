import React, { useState, useRef, useEffect } from "react";
import RTC from "../assets/rtc.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Popper,
  Select,
  Stack,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CaretRight, SignOut, X } from "phosphor-react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBankAcc, createBankAcc2, createBankAcc3, GetUserBankDetails, LogoutUser, resetAccCreated } from "../Redux/UserAuth/Auth";

const HiddenScrollbarContainer = styled("div")({
  overflow: "hidden", // Prevent scrolling
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for webkit browsers
  },
  scrollbarWidth: "none", // Hide scrollbar for Firefox
});

const FirstEffectDialog = ({ open, onClose }) => {

  const handleUnderstandClick = () => {
    // Handle the logic when the user clicks "I Understand"
    console.log("User understood the message");
    onClose(); // Close the dialog
  };
  return (
    <>
      <HiddenScrollbarContainer>
        <Dialog
          open={open}
          onClose={() => {}} // Prevent closing on backdrop click or escape
          disableBackdropClick
          disableEscapeKeyDown
          PaperProps={{ sx: { maxWidth: "390px", padding: 1 } }}
        >
          <DialogContent>
            <Stack direction="row" justifyContent="flex-end">
              <IconButton onClick={onClose}>
                <X size={25} />
              </IconButton>
            </Stack>

            <Stack direction="row" justifyContent="center">
              <img src={RTC} alt="RTC" />
            </Stack>

            <Stack spacing={2} mt={2}>
              <Typography variant="h5">
                Be aware and don't ignore red flags
              </Typography>
              <ul style={{ listStyleType: "disc", paddingLeft: "16px" }}>
                <li
                  style={{
                    color: "#3D5159",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  BPI uses Mobile Key, which is either your biometrics or
                  nominated PIN, to authenticate transactions on your BPI Mobile
                  app.
                </li>
                <li
                  style={{
                    color: "#3D5159",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Do your account information update, rewards redemption or
                  other transactions only through BPI's branches, digital
                  platforms, and other official channels.
                </li>
              </ul>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                backgroundColor: "#D33B40",
                padding: "10px 6px",
                borderRadius: 0.5,
                color: "#fff",
                width: "100%", // Make button full-width
              }}
              onClick={handleUnderstandClick}
            >
              I Understand
            </Button>
          </DialogActions>
        </Dialog>
      </HiddenScrollbarContainer>
    </>
  );
};

const steps = ["Enroll", "Nominate", "Verify"];

const Register = () => {
  const Muitheme = useTheme();
  const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down('sm'));
  const {isLoggedIn,isLoading} = useSelector((state)=>state.auth );
  const {userBnakDetails} = useSelector((state)=>state.auth || {userBnakDetails:{}});
  const { accountCreation } = useSelector((state) => state.auth || { accountCreation: { step: null, status: null } }); 
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(true); // Start with dialog open
  const [formData1, setFormData1] = useState({
    step:1,
    name: "",
    email: "",
    phoneNo: "",
    dob: '',
    gender: "",
    myAddress: {
      vill: "",
      fulladdress: "",
      state: "",
      city: "",
      pincode: "",
      country: "",
      nearBy: "",
      residentialStatus: "",
      occupation: "",
      annualIncome: "",
    },
  });
  const [formData2,setFormData2] = useState({
    step:2,
    accountType:'',
    initialDeposit:0,
  });
  const [formData3,setFormData3] =useState({
    step:3,
    documentType:'',
  })

  const handleInputChangeStep2=(e)=>{
    const {name,value} = e.target;
    setFormData2({...formData2, [name]:value});
  }

  const handleSubmitStep2=(e)=>{
    e.preventDefault();
    console.log('step 2 data',formData2);
    dispatch(createBankAcc2(formData2));
  }

  const handleFileChange3 = (event) => {
    setFormData3({ ...formData3, documentFile: event.target.files[0] });
  };

  const handleInputChangeStep3=(e)=>{
    const {name,value} = e.target;
    setFormData3({...formData3, [name]:value});
  }
  const handleSubmitData3 = (e) => {
    e.preventDefault();
  
    console.log('Step 3 data before submitting:', formData3);
  
    // Create a new FormData instance
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('step', formData3.step);
    formDataToSubmit.append('documentType', formData3.documentType);
    formDataToSubmit.append('files', formData3.documentFile); // Append the file
  
    // Dispatch the action with the FormData
    dispatch(createBankAcc3(formDataToSubmit));
  };
  

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  useEffect(()=>{
    if(accountCreation.status==='success'){
      setActiveStep(accountCreation.step)
    }
  },[accountCreation])

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    dispatch(resetAccCreated());
  };

  const [age, setAge] = React.useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [accountNo, setAccountNo] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [date, setDate] = useState("");
  const isLoginDisabled = !accountNo || !date;

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field is in `myAddress`
    if (name in formData1.myAddress) {
      // Update nested `myAddress` fields
      setFormData1((prevFormData) => ({
        ...prevFormData,
        myAddress: {
          ...prevFormData.myAddress,
          [name]: value,
        },
      }));
    } else {
      // Update top-level fields (e.g., name, email, phoneNo, etc.)
      setFormData1((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleLogout=(e)=>{
    e.preventDefault();
    dispatch(LogoutUser());
  }

  const handleSubmitBnakAccDataStep1=(e)=>{
    e.preventDefault();
    console.log('formvalues step1 data in frontend ',formData1);
    dispatch(createBankAcc(formData1));
  }

  useEffect(()=>{
    dispatch(GetUserBankDetails());
    console.log('get detauils called')
  },[dispatch])

console.log('user bank details ',userBnakDetails);

if (
  userBnakDetails?.isAccountPending === 'Verified' &&
  userBnakDetails?.isVerifiedAccount === true &&  // Correct the boolean check
  userBnakDetails?.accountNumber !== null
) {
  return <Navigate to="/user/mainacc" />; // Use Navigate to redirect if conditions match
}

  if(!isLoggedIn){
    return <Navigate to={'/login'} />
  }
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: "rgb(249,250,251)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: "100%",
            padding: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "39px",
                fontWeight: 800,
                textDecoration: "none",
                color: "#dc3545",
              }}
              component={Link}
              to={"/app"}
            >
              BPI
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="caption"
              component={Link}
              to={"/app"}
              sx={{ textDecoration: "none", color: "#3D5159" }}
            >
              Home
            </Typography>
            <Typography
              variant="caption"
              sx={{ textDecoration: "none", color: "#3D5159" }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="caption"
              sx={{ textDecoration: "none", color: "#3D5159" }}
            >
              Privacy Policy
            </Typography>

            <Stack direction={'row'} alignItems={'center'} sx={{color:'#dc3545'}}>
              <IconButton onClick={handleLogout}>
                <SignOut style={{color:'#dc3545'}} />
              </IconButton>
              <Typography>Logout</Typography>
            </Stack>
          </Box>
        </Box>

        <Container maxWidth="lg">
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography variant="caption">Login</Typography>
            <CaretRight />
            <Typography variant="caption">Register to channel</Typography>
          </Stack>

          {/* Body */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              marginTop: 2,
              borderRadius: 1,
              boxShadow: 2,
            }}
          >
            {/* Box with borderBottom */}
            <Box
              sx={{
                borderBottom: "2px solid #63747B",
                paddingBottom: 1,
                padding: 2,
              }}
            >
              <Box sx={{ maxWidth: "50%", marginX: "auto" }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {
                      fontSize: "10px !important",
                      fontWeight: index === activeStep ? 600 : 400,
                    };
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>
            </Box>

            <Box sx={{ padding: 5 }}>
              <Typography variant="h5">Enroll in BPI app</Typography>
              <Typography variant="subtitle2" sx={{ color: "#3D5159" }}>
                We need some information to verify your identity.
              </Typography>
              <Typography variant="h6" sx={{ paddingTop: 2 }}>
                What type of product do you have with us?
              </Typography>

              <Box sx={{ paddingTop: 4 }}>
                {activeStep === 1 &&  (
                  <Stack spacing={2}>
                    <Typography variant="h6">Enter Personal Details</Typography>
                    <Stack direction={"row"} spacing={2}>
                      <TextField
                        fullWidth
                        required
                        label="Name"
                        name="name"
                        value={formData1.name}
                        onChange={handleInputChange}
                      />
                      <TextField
                      required
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData1.email}
                        onChange={handleInputChange}
                      />
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <TextField
                      required
                        label="Phone Number"
                        name="phoneNo"
                        value={formData1.phoneNo}
                        onChange={handleInputChange}
                        sx={{ flexGrow: 1 }}
                      />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date of Birth"
                          // value={selectedDate}
                          // onChange={(newValue) => setSelectedDate(newValue)}
                          style={{ flexGrow: 1 }}
                          onChange={(newValue) => {
                            setSelectedDate(newValue); // update the selected date for display
                            setFormData1((prevFormData) => ({
                              ...prevFormData,
                              dob: dayjs(newValue).format("YYYY-MM-DD"), // update the dob field in formData1
                            }));
                          }}
                        />
                      </LocalizationProvider>
                    </Stack>

                    <TextField
                    required
                      fullWidth
                      label="Gender"
                      name="gender"
                      value={formData1.gender}
                      onChange={handleInputChange}
                    />

                    <Typography variant="h6">Address Details</Typography>

                    <Stack direction={"row"} spacing={2}>
                      <TextField
                      required
                        fullWidth
                        label="Village"
                        name="vill"
                        value={formData1.vill}
                        onChange={handleInputChange}
                      />
                      <TextField
                      required
                        fullWidth
                        label="Full address"
                        name="fulladdress"
                        value={formData1.myAddress.fulladdress}
                        onChange={handleInputChange}
                      />
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <TextField
                      required
                        fullWidth
                        label="State"
                        name="state"
                        value={formData1.myAddress.state}
                        onChange={handleInputChange}
                      />
                      <TextField
                      required
                        fullWidth
                        label="City"
                        name="city"
                        value={formData1.myAddress.city}
                        onChange={handleInputChange}
                      />
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <TextField
                      required
                        fullWidth
                        label="Pincode"
                        name="pincode"
                        value={formData1.myAddress.pincode}
                        onChange={handleInputChange}
                      />
                      <TextField
                      required
                        fullWidth
                        label="Country"
                        name="country"
                        value={formData1.myAddress.country}
                        onChange={handleInputChange}
                      />
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <TextField
                      required
                        fullWidth
                        label="NearBy"
                        name="nearBy"
                        value={formData1.myAddress.nearBy}
                        onChange={handleInputChange}
                      />
                      <TextField
                      required
                        fullWidth
                        label="Residential Status (Parental or Owned)"
                        name="residentialStatus"
                        value={formData1.myAddress.residentialStatus}
                        onChange={handleInputChange}
                      />
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <TextField
                      required
                        fullWidth
                        label="Occupation"
                        name="occupation"
                        value={formData1.myAddress.occupation}
                        onChange={handleInputChange}
                      />
                      <TextField
                      required
                        fullWidth
                        label="Annual Income"
                        name="annualIncome"
                        value={formData1.myAddress.annualIncome}
                        onChange={handleInputChange}
                      />
                    </Stack>

                    <Button variant="contained" onClick={handleSubmitBnakAccDataStep1}>
                      {isLoading ? <CircularProgress /> :"SUBMIT STEP 1"}
                    </Button>
                  </Stack>
                )}
              </Box>

              {activeStep === 2 && (
                <Stack spacing={2}>
                  <Typography variant="h6">Account Details</Typography>
                  <FormControl fullWidth>
                    <InputLabel id="accountType-label">
                      Select Account Type
                    </InputLabel>
                    <Select
                      labelId="accountType-label"
                      id="accountType"
                      name="accountType"
                      value={formData2.accountType}
                      onChange={handleInputChangeStep2}
                    >
                      <MenuItem value="Deposit Account">Deposit Account</MenuItem>
                      <MenuItem value="Credit Card">Credit Card</MenuItem>
                      <MenuItem value="Loan Account">Loan</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    sx={{ display: 'none' }}
                    label="Initial Deposit"
                    name="initialDeposit"
                    value={formData2.initialDeposit}
                    onChange={handleInputChangeStep2}
                  />
                  <Button variant="contained" onClick={handleSubmitStep2}>
                  {isLoading ? <CircularProgress /> :"SUBMIT STEP 2"}
                  </Button>
                </Stack>
              )}

              {activeStep === 3 &&  (
                <Stack spacing={2}>
                  <Typography variant="h6">
                    Upload Verification Document
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="documentType-label">
                      Document Type
                    </InputLabel>
                    <Select
                      labelId="documentType-label"
                      id="documentType"
                      name="documentType"
                      value={formData3.documentType}
                      onChange={handleInputChangeStep3}
                    >
                      <MenuItem value="ID Proof">ID Proof</MenuItem>
                      <MenuItem value="Address Proof">Address Proof</MenuItem>
                      <MenuItem value="Income Proof">Income Proof</MenuItem>
                    </Select>
                  </FormControl>
                  <input type="file" accept=".pdf" onChange={handleFileChange3} />
                  <Button variant="contained" onClick={handleSubmitData3}>
                  {isLoading ? <CircularProgress /> :"SUBMIT STEP 3"}
                  </Button>
                </Stack>
              )}

{accountCreation?.step === 3 && accountCreation?.status === 'success' && (
      <Stack spacing={2}>
        <Typography variant="h5" sx={{color:'#28a745'}}>
          Your Account is waiting for verification. It will take a minimum of 24 hours. Till then, please wait.
        </Typography>
        <Stack sx={{justifyContent:'center',alignItems:'center'}}>
          <Typography sx={{paddingX:4,paddingY:2,border:'1px solid #28a745',borderRadius:0.7,color:'#dc3545',textDecoration:'none'}}component={Link} to={'/'}>Go to Home</Typography>
        </Stack>
      </Stack>
    )}

            </Box>

            {/* cHAGEABLE bOX accrding to selection */}
            {/* First Box if selected  Deposite Account */}
            {selectedProduct === "da" && (
              <Stack sx={{ maxWidth: 450, paddingX: 5 }} spacing={2}>
                <Typography variant="h6">
                  Your Deposit account number
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined" // or "filled", "standard"
                  placeholder="Enter deposit account number"
                  autoComplete="off"
                  //   value={username}
                  //   onChange={(e) => setUsername(e.target.value)}
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

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{
                      borderRadius: "4px !important",
                      backgroundColor: "#eeeeee",
                    }}
                    label="Select a date"
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        placeholder="Enter deposit account number"
                        autoComplete="off"
                        sx={{
                          padding: 0.2,
                          borderRadius: "4px !important",
                          fontSize: 16,
                          backgroundColor: "#eeeeee",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "none",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>

                <Stack sx={{ width: 280, paddingTop: 2 }}>
                  <Button
                    variant={"contained"}
                    sx={{
                      // backgroundColor: isLoginDisabled
                      //   ? "rgb(242,196,198) "
                      //   : "rgb(211,59,64)",
                      color: "#fff",
                      paddingY: 1.5,
                      borderRadius: 0.5, // Vertical padding
                      boxShadow: "none",
                    }}
                    //   disabled={isLoginDisabled}
                  >
                    Continue
                  </Button>
                </Stack>

                <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a style={{ textDecoration: "underline", color: "#20A39E" }}>
                    {" "}
                    Privacy Policy{" "}
                  </a>{" "}
                  and{" "}
                  <a style={{ textDecoration: "underline", color: "#20A39E" }}>
                    Terms of Service{" "}
                  </a>{" "}
                  apply.
                </Typography>
              </Stack>
            )}

            {/* sECIOND OPTION CHOOSE FOR cREDIT CARD */}
            {selectedProduct === "cd" && (
              <Stack sx={{ maxWidth: 450, paddingX: 5 }} spacing={2}>
                <Typography variant="h6">
                  Your customer number{" "}
                  <a style={{ textDecoration: "underline", color: "#20A39E" }}>
                    ?{" "}
                  </a>
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined" // or "filled", "standard"
                  placeholder="Enter Customer Number"
                  autoComplete="off"
                  //   value={username}
                  //   onChange={(e) => setUsername(e.target.value)}
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

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{
                      borderRadius: "4px !important",
                      backgroundColor: "#eeeeee",
                    }}
                    label="Select a date"
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        placeholder="Enter deposit account number"
                        autoComplete="off"
                        sx={{
                          padding: 0.2,
                          borderRadius: "4px !important",
                          fontSize: 16,
                          backgroundColor: "#eeeeee",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "none",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>

                <Stack sx={{ width: 280, paddingTop: 2 }}>
                  <Button
                    variant={"contained"}
                    sx={{
                      // backgroundColor: isLoginDisabled
                      //   ? "rgb(242,196,198) "
                      //   : "rgb(211,59,64)",
                      color: "#fff",
                      paddingY: 1.5,
                      borderRadius: 0.5, // Vertical padding
                      boxShadow: "none",
                    }}
                    //   disabled={isLoginDisabled}
                  >
                    Continue
                  </Button>
                </Stack>

                <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a style={{ textDecoration: "underline", color: "#20A39E" }}>
                    {" "}
                    Privacy Policy{" "}
                  </a>{" "}
                  and{" "}
                  <a style={{ textDecoration: "underline", color: "#20A39E" }}>
                    Terms of Service{" "}
                  </a>{" "}
                  apply.
                </Typography>
              </Stack>
            )}

            {/* Third option choose for Loans */}
            {selectedProduct === "lo" && (
              <Stack sx={{ maxWidth: 450, paddingX: 5 }} spacing={2}>
                <Typography variant="h6">Your loan account number</Typography>
                <TextField
                  fullWidth
                  variant="outlined" // or "filled", "standard"
                  placeholder="Enter loan account number"
                  autoComplete="off"
                  //   value={username}
                  //   onChange={(e) => setUsername(e.target.value)}
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

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{
                      borderRadius: "4px !important",
                      backgroundColor: "#eeeeee",
                    }}
                    label="Select a date"
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        placeholder="Enter deposit account number"
                        autoComplete="off"
                        sx={{
                          padding: 0.2,
                          borderRadius: "4px !important",
                          fontSize: 16,
                          backgroundColor: "#eeeeee",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "none",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>

                <Stack sx={{ width: 280, paddingTop: 2 }}>
                  <Button
                    variant={"contained"}
                    sx={{
                      // backgroundColor: isLoginDisabled
                      //   ? "rgb(242,196,198) "
                      //   : "rgb(211,59,64)",
                      color: "#fff",
                      paddingY: 1.5,
                      borderRadius: 0.5, // Vertical padding
                      boxShadow: "none",
                    }}
                    //   disabled={isLoginDisabled}
                  >
                    Continue
                  </Button>
                </Stack>

                <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a style={{ textDecoration: "underline", color: "#20A39E" }}>
                    {" "}
                    Privacy Policy{" "}
                  </a>{" "}
                  and{" "}
                  <a style={{ textDecoration: "underline", color: "#20A39E" }}>
                    Terms of Service{" "}
                  </a>{" "}
                  apply.
                </Typography>
              </Stack>
            )}
            {/* Stepper */}
            <Box sx={{ marginTop: 2,paddingX:3,paddingBottom:2 }}>
              {activeStep === 3 && accountCreation.status === 'success' ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/* <Typography sx={{ mt: 2, mb: 1 }}>
                    Step {activeStep + 1}
                  </Typography> */}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      // disabled={
                      //   (activeStep === 1 && accountCreation.step === 1 && accountCreation.status === 'success') ||
                      //   (activeStep === 2 && accountCreation.step === 2 && accountCreation.status === 'success') ||
                      //   (activeStep === 3 && accountCreation.step === 3 && accountCreation.status === 'success')
                      // }
                      
                      onClick={handleBack}
                      variant="contained" sx={{borderRadius:0.5,paddingY:1,paddingX:5,mr: 1}}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {/* {isStepOptional(activeStep) && (
                      <Button
                        color="inherit"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                      >
                        Skip
                      </Button>
                    )} */}
                    <Button onClick={handleNext} variant="contained" sx={{borderRadius:0.5,paddingY:1,paddingX:5}}>
                      {activeStep === steps.length ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
      <FirstEffectDialog open={showDialog} onClose={handleCloseDialog} />
    </>
  );
};

export default Register;
