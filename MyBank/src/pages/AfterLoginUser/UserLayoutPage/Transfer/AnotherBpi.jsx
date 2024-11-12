import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowLeft,
  ArrowsLeftRight,
  CaretDown,
  CaretUp,
  Wallet,
} from "phosphor-react";
import {
  CheckBox,
  DescriptionOutlined,
  SavingsOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { InitiateTransfer } from "../../../../Redux/UserAuth/Auth";
import { useNavigate } from "react-router-dom";

const HiddenScrollbarContainer = styled("div")({
  overflow: "hidden", // Prevent scrolling
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for webkit browsers
  },
  scrollbarWidth: "none", // Hide scrollbar for Firefox
});

const formatBalance = (balance) => {
  return balance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const AnotherBpi = () => {
  const navigate = useNavigate();
  const Muitheme = useTheme();
  const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { userBnakDetails } = useSelector(
    (state) => state.auth || { userBnakDetails: {} }
  );
  const { isLoading } = useSelector((state) => state.auth);
  const SenderAccNumber = userBnakDetails?.accountNumber;
  const [formValues, setFormValues] = useState({
    senderAccountNumber: SenderAccNumber,
    receiverAccountNumber: "",
    amount: "",
    currency: "PHP",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleTransactions = (e) => {
    e.preventDefault();
    console.log("formValues transactions page ", formValues);
    dispatch(InitiateTransfer(formValues));
  };

  return (
    <>
      {isSmallScreen ? (
        <Box sx={{ width: "100%", paddingX: 2 ,paddingTop:2}}>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <IconButton onClick={() => navigate("/user/transfermob")}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="h5" >
              To another BPI account
            </Typography>
          </Stack>

          <HiddenScrollbarContainer
            sx={{
              display: "flex",
              flexDirection: "row",
              borderRadius: 0.5,
              maxWidth: "100%",
              justifyContent: "space-between",
              gap: 5,
              overflowY: "scroll",
              maxHeight: "80vh",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "space-between",
                  width: "100%",
                  backgroundColor: "#fff",
                  // paddingX: 3,
                  paddingY: 2,
                  borderRadius: 0.5,
                  boxShadow: 3,
                  // borderBottom: "1px solid #eeeeee",
                }}
              >
                <Stack spacing={2}>
                  <Stack direction={"row"} alignItems={"center"} spacing={3}>
                    <Stack
                      sx={{
                        padding: 1.5,
                        backgroundColor: "#c8e6c9",
                        borderRadius: 1,
                      }}
                    >
                      <Wallet style={{ color: "#20C997", fontSize: 22 }} />
                    </Stack>
                    <Stack>
                      <Typography variant="subtitle2">Transfer from</Typography>

                      {/* Collapsible Header */}
                      <Collapse in={collapsed} timeout="auto" unmountOnExit>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={2}
                          sx={{
                            paddingTop: "0px !important",
                            marginTop: "0px !important",
                            lineHeight: "0px !important",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              lineHeight: "0px !important",
                              textTransform: "uppercase",
                            }}
                          >
                            {userBnakDetails?.otherDeatils?.accountType
                              ? userBnakDetails?.otherDeatils?.accountType
                              : "N/A"}
                          </Typography>
                          <IconButton onClick={() => setCollapsed(!collapsed)}>
                            <CaretDown />
                          </IconButton>
                        </Stack>
                      </Collapse>
                    </Stack>
                  </Stack>

                  {/* Collapsible Content */}
                  <Collapse in={collapsed} timeout="auto" unmountOnExit>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Stack>
                        <Typography variant="caption">
                          Account Number
                        </Typography>
                        <Typography variant="caption">
                          {userBnakDetails?.accountNumber
                            ? userBnakDetails?.accountNumber
                            : "N/A"}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="caption">Branch</Typography>
                        <Typography variant="caption">
                          {userBnakDetails?.otherDeatils?.branchName
                            ? userBnakDetails?.otherDeatils?.branchName
                            : "N/A"}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Collapse>
                </Stack>

                <Stack>
                  {/* Balance Information */}
                  {!collapsed && (
                    <IconButton onClick={() => setCollapsed(!collapsed)}>
                      <CaretUp />
                    </IconButton>
                  )}
                  <Collapse in={collapsed} timeout="auto" unmountOnExit>
                    <Stack spacing={1}>
                      <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                        Available balance
                      </Typography>
                      <Typography variant="body2" sx={{ letterSpacing: 1 }}>
                        <span
                          style={{
                            display: "inline",
                            fontSize: "11px",
                            fontWeight: 500,
                            paddingRight: 7,
                          }}
                        >
                          PHP
                        </span>
                        {formatBalance(userBnakDetails?.otherDeatils?.balance)
                          ? formatBalance(
                              userBnakDetails?.otherDeatils?.balance
                            )
                          : "N/A"}
                      </Typography>
                    </Stack>
                  </Collapse>
                </Stack>
              </Box>

              {/* Collapsable Box when click on ratet up button */}
              <Collapse in={collapsed} timeout="auto" unmountOnExit>
                <Box sx={{ paddingX: 2, backgroundColor: "#fff" }}>
                  <Divider />
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    sx={{ color: "#20c997" }}
                    spacing={2}
                    justifyContent={"space-between"}
                  >
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <CheckBox />
                      <Typography
                        sx={{
                          padding: "0 7px",
                          borderRadius: 0.5,
                          border: "1px solid #ddd",
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        1{" "}
                      </Typography>
                      <Typography variant="caption">
                        {userBnakDetails?.accountNumber
                          ? userBnakDetails?.accountNumber
                          : "N/A"}
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography variant="caption" sx={{ paddingTop: 3 }}>
                        Account balance
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                        }}
                      >
                        {userBnakDetails?.otherDeatils?.balance
                          ? userBnakDetails?.otherDeatils?.balance
                          : "N/A"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Collapse>

              <Collapse in={!collapsed} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    boxShadow: 3,
                    backgroundColor: "#fff",
                    padding: "14px 22px",
                    // marginTop: 2,
                    borderTop: collapsed ? " none " : "1px solid #ddd",
                    borderRadius: 0.5,
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Stack>
                      <Typography
                        variant="subtitle2"
                        sx={{ textTransform: "uppercase" }}
                      >
                        {userBnakDetails?.otherDeatils?.accountType
                          ? userBnakDetails?.otherDeatils?.accountType
                          : "N/A"}
                      </Typography>
                      <Typography>
                        {userBnakDetails?.accountNumber
                          ? userBnakDetails?.accountNumber
                          : "N/A"}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body2" sx={{ letterSpacing: 1 }}>
                        {" "}
                        <p
                          style={{
                            display: "inline",
                            fontSize: "11px",
                            fontWeight: 500,
                            paddingRight: 7,
                          }}
                        >
                          PHP
                        </p>
                        {formatBalance(userBnakDetails?.otherDeatils?.balance)
                          ? formatBalance(
                              userBnakDetails?.otherDeatils?.balance
                            )
                          : "N/A"}
                      </Typography>
                      <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                        Available balance
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Collapse>

              <Box
                sx={{
                  boxShadow: 3,
                  backgroundColor: "#fff",
                  // padding: "14px 22px",
                  marginTop: 2,
                  borderTop: collapsed ? " none " : "1px solid #ddd",
                  borderRadius: 0.5,
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={2}
                  sx={{ paddingBottom: 1 }}
                >
                  <Stack
                    sx={{
                      padding: 1.5,
                      backgroundColor: "#c8e6c9",
                      borderRadius: 1,
                    }}
                  >
                    <ArrowsLeftRight
                      style={{ color: "#20C997", fontSize: 22 }}
                    />
                  </Stack>
                  <Typography variant="h6">Transfer to</Typography>
                </Stack>
                <Divider />
                <Box sx={{ maxWidth: 500, marginTop: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined" // or "filled", "standard"
                    placeholder="BPI Account Number"
                    autoComplete="off"
                    required
                    name="receiverAccountNumber"
                    value={formValues.receiverAccountNumber}
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
                  <Typography variant="caption" sx={{ pb: 5 }}>
                    Enroll accounts for easier transfer in More &gt; General
                    settings &gt; Transactions &gt; Manage Favourites
                  </Typography>

                  <Divider sx={{ marginTop: 5 }} />
                  <Box sx={{ paddingY: 2 }}>
                    <Link
                      sx={{
                        color: "#20c997",
                        fontWeight: 600,
                        textDecoration: "underline",
                      }}
                    >
                      Do you have a QR code?
                    </Link>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  boxShadow: 3,
                  backgroundColor: "#fff",
                  // padding: "14px 22px",
                  marginTop: 2,
                  borderTop: collapsed ? " none " : "1px solid #ddd",
                  borderRadius: 0.5,
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={2}
                  sx={{ paddingBottom: 1 }}
                >
                  <Typography variant="h6">Transfer amount</Typography>
                </Stack>
                <Divider />
                <Box
                  sx={{
                    maxWidth: 500,
                    marginTop: 2,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Stack
                    sx={{
                      padding: 2.2,
                      backgroundColor: "#eeeeee",
                      borderRadius: 0.5,
                      marginRight: 1,
                    }}
                  >
                    <Typography sx={{ color: "#6c757d" }}>PHP</Typography>
                  </Stack>
                  <TextField
                    fullWidth
                    variant="outlined" // or "filled", "standard"
                    placeholder="0.00"
                    autoComplete="off"
                    required
                    name="amount"
                    value={formValues.amount}
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
                        "& input": {
                          textAlign: "right", // Align text and placeholder to the right
                        },
                      },
                    }}
                  />
                </Box>
                <Box sx={{ paddingY: 1, maxWidth: "500px" }}>
                  <TextField
                    fullWidth
                    variant="outlined" // or "filled", "standard"
                    placeholder="Description (What for)"
                    autoComplete="off"
                    required
                    name="description"
                    value={formValues.description}
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
                        "& input": {
                          textAlign: "right", // Align text and placeholder to the right
                        },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: 2,
                    maxWidth: 500,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ paddingX: 5, borderRadius: 0.5 }}
                    onClick={handleTransactions}
                  >
                    {isLoading ? <CircularProgress /> : "Send"}
                  </Button>
                </Box>

                <Divider sx={{ marginTop: 2 }} />
              </Box>
            </Box>
          </HiddenScrollbarContainer>
        </Box>
      ) : (
        <Box sx={{ width: "100%", paddingX: 5 }}>
          <Typography variant="h5" sx={{ paddingBottom: 2 }}>
            To another BPI account
          </Typography>

          <HiddenScrollbarContainer
            sx={{
              display: "flex",
              flexDirection: "row",
              borderRadius: 0.5,
              maxWidth: "80%",
              justifyContent: "space-between",
              gap: 5,
              overflowY: "scroll",
              maxHeight: "80vh",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "space-between",
                  width: "100%",
                  backgroundColor: "#fff",
                  paddingX: 3,
                  paddingY: 2,
                  borderRadius: 0.5,
                  boxShadow: 3,
                  // borderBottom: "1px solid #eeeeee",
                }}
              >
                <Stack spacing={2}>
                  <Stack direction={"row"} alignItems={"center"} spacing={3}>
                    <Stack
                      sx={{
                        padding: 1.5,
                        backgroundColor: "#c8e6c9",
                        borderRadius: 1,
                      }}
                    >
                      <Wallet style={{ color: "#20C997", fontSize: 22 }} />
                    </Stack>
                    <Stack>
                      <Typography variant="subtitle2">Transfer from</Typography>

                      {/* Collapsible Header */}
                      <Collapse in={collapsed} timeout="auto" unmountOnExit>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={2}
                          sx={{
                            paddingTop: "0px !important",
                            marginTop: "0px !important",
                            lineHeight: "0px !important",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              lineHeight: "0px !important",
                              textTransform: "uppercase",
                            }}
                          >
                            {userBnakDetails?.otherDeatils?.accountType
                              ? userBnakDetails?.otherDeatils?.accountType
                              : "N/A"}
                          </Typography>
                          <IconButton onClick={() => setCollapsed(!collapsed)}>
                            <CaretDown />
                          </IconButton>
                        </Stack>
                      </Collapse>
                    </Stack>
                  </Stack>

                  {/* Collapsible Content */}
                  <Collapse in={collapsed} timeout="auto" unmountOnExit>
                    <Stack direction={"row"} spacing={2}>
                      <Stack>
                        <Typography variant="body2">Account Number</Typography>
                        <Typography variant="caption">
                          {userBnakDetails?.accountNumber
                            ? userBnakDetails?.accountNumber
                            : "N/A"}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="body2">Account type</Typography>
                        <Typography variant="caption">
                          {userBnakDetails?.otherDeatils?.accountType
                            ? userBnakDetails?.otherDeatils?.accountType
                            : "N/A"}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="body2">Branch</Typography>
                        <Typography variant="caption">
                          {userBnakDetails?.otherDeatils?.branchName
                            ? userBnakDetails?.otherDeatils?.branchName
                            : "N/A"}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Collapse>
                </Stack>

                <Stack>
                  {/* Balance Information */}
                  {!collapsed && (
                    <IconButton onClick={() => setCollapsed(!collapsed)}>
                      <CaretUp />
                    </IconButton>
                  )}
                  <Collapse in={collapsed} timeout="auto" unmountOnExit>
                    <Stack spacing={1}>
                      <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                        Available balance
                      </Typography>
                      <Typography variant="body2" sx={{ letterSpacing: 1 }}>
                        <span
                          style={{
                            display: "inline",
                            fontSize: "11px",
                            fontWeight: 500,
                            paddingRight: 7,
                          }}
                        >
                          PHP
                        </span>
                        {formatBalance(userBnakDetails?.otherDeatils?.balance)
                          ? formatBalance(
                              userBnakDetails?.otherDeatils?.balance
                            )
                          : "N/A"}
                      </Typography>
                      <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                        Total balance
                      </Typography>
                      <Typography variant="body2" sx={{ letterSpacing: 1 }}>
                        <span
                          style={{
                            display: "inline",
                            fontSize: "11px",
                            fontWeight: 500,
                            paddingRight: 7,
                          }}
                        >
                          PHP
                        </span>
                        {userBnakDetails?.otherDeatils?.balance
                          ? userBnakDetails?.otherDeatils?.balance
                          : "N/A"}
                      </Typography>
                    </Stack>
                  </Collapse>
                </Stack>
              </Box>

              {/* Collapsable Box when click on ratet up button */}
              <Collapse in={collapsed} timeout="auto" unmountOnExit>
                <Box sx={{ paddingX: 2, backgroundColor: "#fff" }}>
                  <Divider />
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    sx={{ paddingX: 2, paddingY: 2, color: "#20c997" }}
                    spacing={2}
                    justifyContent={"space-between"}
                  >
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <CheckBox />
                      <Typography
                        sx={{
                          padding: "0 7px",
                          borderRadius: 0.5,
                          border: "1px solid #ddd",
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        1{" "}
                      </Typography>
                      <Typography variant="caption">
                        {userBnakDetails?.accountNumber
                          ? userBnakDetails?.accountNumber
                          : "N/A"}
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography variant="body2">Account balance</Typography>
                      <Typography variant="caption">
                        {userBnakDetails?.otherDeatils?.balance
                          ? userBnakDetails?.otherDeatils?.balance
                          : "N/A"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Collapse>

              <Collapse in={!collapsed} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    boxShadow: 3,
                    backgroundColor: "#fff",
                    padding: "14px 22px",
                    // marginTop: 2,
                    borderTop: collapsed ? " none " : "1px solid #ddd",
                    borderRadius: 0.5,
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Stack>
                      <Typography
                        variant="subtitle2"
                        sx={{ textTransform: "uppercase" }}
                      >
                        {userBnakDetails?.otherDeatils?.accountType
                          ? userBnakDetails?.otherDeatils?.accountType
                          : "N/A"}
                      </Typography>
                      <Typography>
                        {userBnakDetails?.accountNumber
                          ? userBnakDetails?.accountNumber
                          : "N/A"}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body2" sx={{ letterSpacing: 1 }}>
                        {" "}
                        <p
                          style={{
                            display: "inline",
                            fontSize: "11px",
                            fontWeight: 500,
                            paddingRight: 7,
                          }}
                        >
                          PHP
                        </p>
                        {formatBalance(userBnakDetails?.otherDeatils?.balance)
                          ? formatBalance(
                              userBnakDetails?.otherDeatils?.balance
                            )
                          : "N/A"}
                      </Typography>
                      <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                        Available balance
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Collapse>

              <Box
                sx={{
                  boxShadow: 3,
                  backgroundColor: "#fff",
                  padding: "14px 22px",
                  marginTop: 2,
                  borderTop: collapsed ? " none " : "1px solid #ddd",
                  borderRadius: 0.5,
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={2}
                  sx={{ paddingBottom: 1 }}
                >
                  <Stack
                    sx={{
                      padding: 1.5,
                      backgroundColor: "#c8e6c9",
                      borderRadius: 1,
                    }}
                  >
                    <ArrowsLeftRight
                      style={{ color: "#20C997", fontSize: 22 }}
                    />
                  </Stack>
                  <Typography variant="h6">Transfer to</Typography>
                </Stack>
                <Divider />
                <Box sx={{ maxWidth: 500, marginTop: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined" // or "filled", "standard"
                    placeholder="BPI Account Number"
                    autoComplete="off"
                    required
                    name="receiverAccountNumber"
                    value={formValues.receiverAccountNumber}
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
                  <Typography variant="caption" sx={{ pb: 5 }}>
                    Enroll accounts for easier transfer in More &gt; General
                    settings &gt; Transactions &gt; Manage Favourites
                  </Typography>

                  <Divider sx={{ marginTop: 5 }} />
                  <Box sx={{ paddingY: 2 }}>
                    <Link
                      sx={{
                        color: "#20c997",
                        fontWeight: 600,
                        textDecoration: "underline",
                      }}
                    >
                      Do you have a QR code?
                    </Link>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  boxShadow: 3,
                  backgroundColor: "#fff",
                  padding: "14px 22px",
                  marginTop: 2,
                  borderTop: collapsed ? " none " : "1px solid #ddd",
                  borderRadius: 0.5,
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={2}
                  sx={{ paddingBottom: 1 }}
                >
                  <Typography variant="h6">Transfer amount</Typography>
                </Stack>
                <Divider />
                <Box
                  sx={{
                    maxWidth: 500,
                    marginTop: 2,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Stack
                    sx={{
                      padding: 2.2,
                      backgroundColor: "#eeeeee",
                      borderRadius: 0.5,
                      marginRight: 1,
                    }}
                  >
                    <Typography sx={{ color: "#6c757d" }}>PHP</Typography>
                  </Stack>
                  <TextField
                    fullWidth
                    variant="outlined" // or "filled", "standard"
                    placeholder="0.00"
                    autoComplete="off"
                    required
                    name="amount"
                    value={formValues.amount}
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
                        "& input": {
                          textAlign: "right", // Align text and placeholder to the right
                        },
                      },
                    }}
                  />
                </Box>
                <Box sx={{ paddingY: 1, maxWidth: "500px" }}>
                  <TextField
                    fullWidth
                    variant="outlined" // or "filled", "standard"
                    placeholder="Description (What for)"
                    autoComplete="off"
                    required
                    name="description"
                    value={formValues.description}
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
                        "& input": {
                          textAlign: "right", // Align text and placeholder to the right
                        },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: 2,
                    maxWidth: 500,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ paddingX: 5, borderRadius: 0.5 }}
                    onClick={handleTransactions}
                  >
                    {isLoading ? <CircularProgress /> : "Send"}
                  </Button>
                </Box>

                <Divider sx={{ marginTop: 2 }} />
              </Box>
            </Box>
          </HiddenScrollbarContainer>
        </Box>
      )}
    </>
  );
};

export default AnotherBpi;
