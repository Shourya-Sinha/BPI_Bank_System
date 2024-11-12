import React, { useEffect, useRef, useState } from "react";
import {
  ContentCopy,
  DescriptionOutlined,
  EmojiEmotions,
  FileCopy,
  KeyboardBackspace,
  Payments,
  RemoveRedEye,
  SavingsOutlined,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Collapse,
  Divider,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  styled,
  TextField,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import {
  ArrowsLeftRight,
  Calendar,
  CaretDown,
  CaretUp,
  Envelope,
  EyeSlash,
  Shield,
} from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import {
  DepositeRequestAmount,
  GetDepositeRequest,
  GetMyTransactionHistory,
  useIsSmallScreen,
} from "../../../Redux/UserAuth/Auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { ShoppingOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fontSize } from "@mui/system";

const sliderData = [
  {
    id: 1,
    date: "Nov 08",
    title: "Charge your bills to your credit card!",
    description:
      "Enjoy hassle-free payments with more than 400 billers to select from earn interest on earn interest on!",
    icon: <Payments style={{fontSize:'1em'}} />,
  },
  {
    id: 2,
    date: "Nov 01",
    title: "Save money with our savings account!",
    description:
      "Create a savings account and earn interest on your savings every month earn interest on!",
    icon: <SavingsOutlined style={{fontSize:'1em'}} />,
  },
  {
    id: 3,
    date: "Oct 31",
    title: "Get free discounts on your shopping!",
    description:
      "Shop with us and get a free delivery on your next purchase earn interest on earn interest on!",
    icon: <ShoppingOutlined />,
  },
  {
    id: 4,
    date: "Oct 25",
    title: "Unlock more features with our premium account!",
    description:
      "Upgrade to our premium account and enjoy exclusive features like 24/7 support earn interest on!",
    icon: <Shield />,
  },
  {
    id: 5,
    date: "Oct 20",
    title: "Receive instant discounts on your shopping!",
    description:
      "Shop with us and get a free delivery on your next purchase earn interest on earn interest on!",
    icon: <ShoppingOutlined />,
  },
  {
    id: 6,
    date: "Oct 15",
    title: "Receive free shipping on your next purchase!",
    description:
      "Shop with us and get a free delivery on your next purchase get a free delivery on your next purchase!",
    icon: <ShoppingOutlined />,
  }
];

const HiddenScrollbarContainer = styled("div")({
  overflow: "hidden", // Prevent scrolling
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for webkit browsers
  },
  scrollbarWidth: "none", // Hide scrollbar for Firefox
});

const columns = [
  { id: "txnid", label: "TXN-ID", minWidth: 170 },
  { id: "amount", label: "Amount", minWidth: 100 },
  {
    id: "reciverid",
    label: "My ID",
    align: "center",
  },
  {
    id: "txnstatus",
    label: "TXN-Approval Status",
    align: "center",
  },
  {
    id: "depositetype",
    label: "TXN-Type",
    align: "center",
  },
  {
    id: "description",
    label: "Descitption",
    align: "center",
  },
  {
    id: "created",
    label: "Created At",
    align: "center",
  },
];

function createData(
  txnid,
  amount,
  reciverid,
  txnstatus,
  depositetype,
  description,
  created
) {
  return {
    txnid,
    amount,
    reciverid,
    txnstatus,
    depositetype,
    description,
    created,
  };
}

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const formatBalance = (balance) => {
  return balance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatDate = (date) => {
  // Ensure the input is a valid Date object or string
  if (!date) return "N/A";

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Create a new Date object from the input date (if it's a string or number)
  const d = new Date(date);

  // Get the month and date
  const month = months[d.getMonth()]; // Get the month from the Date object (0-based index)
  const day = d.getDate(); // Get the day of the month

  return `${month} ${day}`; // Return the formatted date like "NOV 11"
};

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Muitheme = useTheme();
  const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down("sm"));
  // const isSmallScreen = useIsSmallScreen();
  const { isLoading, myDepositeTransactions } = useSelector(
    (state) => state.auth || { myDepositeTransactions: [] }
  );
  const [collapsed, setCollapsed] = useState(false);
  const [collapsed1, setCollapsed1] = useState(false);
  const [collapsed2, setCollapsed2] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { userBnakDetails } = useSelector(
    (state) => state.auth || { userBnakDetails: {} }
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(GetDepositeRequest());
  }, [dispatch]);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const rows = (myDepositeTransactions || []).map((data) => {
    const row = createData(
      data?.transactionId ? data?.transactionId : "N/A",
      data?.amount ? data?.amount : "N/A",
      data?.receiverUserId?._id ? data.receiverUserId?._id : "N/A",
      data?.status ? data?.status : "N/A",
      data?.transactionType ? data.transactionType : "N/A",
      data?.description ? data?.description : "N/A",
      formatDateTime(data?.timestamp) // Created date
    );

    // Return the row with the key
    return { ...row, key: data._id }; // Use a unique key for each row
  });

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
    dispatch(DepositeRequestAmount(formValues));
  };

  useEffect(() => {
    console.log("isSmallScreen:", isSmallScreen); // Log when it changes
  }, [isSmallScreen]);
  const handleBoxClick = () => {
    setCollapsed2(true);
  };
  const [showHeaderOnScroll, setShowHeaderOnScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        // Adjust the value as needed
        setShowHeaderOnScroll(true);
      } else {
        setShowHeaderOnScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const settings = {
    dots: true,             // Show navigation dots
    infinite: true,         // Infinite loop scrolling
    speed: 1000,             // Transition speed
    slidesToShow: 1,        // Show one slide at a time
    slidesToScroll: 1,      // Scroll one slide at a time
    autoplay: true,         // Autoplay slides
    autoplaySpeed: 5000,    // Set autoplay interval
  };
  return (
    <>
      {isSmallScreen ? (
        <Box sx={{ width: "100%", height: "100%", paddingX: 2, paddingY: 2 }}>
          {!collapsed2 && (
            <Stack sx={{ cursor: "pointer" }} onClick={handleBoxClick}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack>
                  <Typography variant="caption">{getGreeting()},</Typography>
                  <Typography variant="h6">
                  {userBnakDetails?.otherDeatils?.personalDetails?.accountHolderName
              ? userBnakDetails?.otherDeatils?.personalDetails
                  ?.accountHolderName
              : "N/A"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <IconButton>
                    <Envelope />
                  </IconButton>
                  <IconButton onClick={() => navigate("/user/settingMob")}>
                    <Settings />
                  </IconButton>
                </Stack>
              </Stack>
              {/* Slider box */}
              <Stack mt={2} pb={5} sx={{paddingX:2}} >
              <Slider {...settings}>
      {sliderData.map((item) => (
        <Paper
        elevation={5}
          key={item.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            borderRadius: 3,
            boxShadow: 3,
            margin: "auto",
            textAlign: "center",
          }}
        >
          <Box sx={{paddingX:2,paddingTop:3,textAlign:'start'}}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Stack sx={{width:10,height:10,backgroundColor:'#dc143c',borderRadius:'50%'}} />
              <Typography variant="caption">{item.date}</Typography>
            </Stack>
            <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: "bold" }}>
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "#666",pb:2 }}>
            {item.description}
          </Typography>
          </Box>
          <Box sx={{ fontSize: "5em", backgroundColor: "#e0f2f1",}}>{item.icon}</Box>
        </Paper>
      ))}
    </Slider>
              </Stack>
              <Box
                sx={{
                  width: "100%",
                  height: "auto", // Or set to a fixed height for testing
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  boxShadow: 1,
                  marginTop: 2,
                  justifyContent: "space-between",
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                    padding: 2,
                  }}
                >
                  <Stack
                    sx={{
                      padding: 1.5,
                      backgroundColor: "#c8e6c9",
                      borderRadius: 1,
                    }}
                  >
                    <SavingsOutlined sx={{ color: "#20C997" }} />
                  </Stack>
                  <Typography variant="body2">
                    {userBnakDetails?.otherDeatils?.accountType
                      ? userBnakDetails?.otherDeatils?.accountType
                      : "N/A"}
                  </Typography>
                </Box>
                <Stack>
                  <IconButton>
                    <CaretUp />
                  </IconButton>
                </Stack>
              </Box>
              <Box
                sx={{
                  boxShadow: 5,
                  padding: 3,
                  borderRadius: 1,
                  marginTop: -1,
                  cursor: "pointer",
                }}
              >
                <Typography>
                  {userBnakDetails?.otherDeatils?.accountType
                    ? userBnakDetails?.otherDeatils?.accountType
                    : "N/A"}
                </Typography>
                <Typography variant="body2">
                  {userBnakDetails?.accountNumber
                    ? userBnakDetails?.accountNumber
                    : "N/A"}
                </Typography>
                <Stack
                  direction={"column"}
                  justifyContent={"flex-end"} // Aligns the children vertically to the bottom
                  alignItems={"flex-end"} // Aligns the children horizontally to the right
                  sx={{ width: "100%" }}
                >
                  <Typography variant="body2" sx={{ letterSpacing: 1 }}>
                    <span
                      style={{
                        display: "inline",
                        fontSize: "11px",
                        fontWeight: 700,
                        paddingRight: 7,
                      }}
                    >
                      PHP
                    </span>
                    {formatBalance(
                      userBnakDetails?.otherDeatils?.balance
                        ? userBnakDetails?.otherDeatils?.balance
                        : "0.00"
                    )}
                  </Typography>
                  <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                    Available balance
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ marginTop: 5 }}>
                {userBnakDetails?.accountNumber == null ? (
                  <Typography
                    variant="h5"
                    component={Link}
                    to={"/register"}
                    sx={{ paddingTop: 3 }}
                  >
                    You have no bank account. Please create one first.
                  </Typography>
                ) : (
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <ContentCopy sx={{ color: "#20C997" }} />
                    <Typography sx={{ color: "#20C997" }}>
                      Manage My Accounts
                    </Typography>
                  </Stack>
                )}
              </Box>
            </Stack>
          )}

          <Collapse in={collapsed2}>
            <Stack
              sx={{
                boxShadow: 2,
                position: "sticky",
                top: 0,
                backgroundColor: "white", // Ensures the header has a solid background color
                zIndex: 10, // Ensures it stays on top of other elements
              }}
            >
              <Stack direction={"row"} alignItems={"center"} pb={2} pt={3}>
                <IconButton
                  onClick={() => {
                    setCollapsed2((prev) => !prev);
                  }}
                >
                  <KeyboardBackspace />
                </IconButton>
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "flex", // Set the display to flex to enable flexbox
                    justifyContent: "center", // Center horizontally
                    alignItems: "center", // Center vertically
                    width: "100%", // Ensure the element takes full width to center
                  }}
                >
                  {" "}
                  {userBnakDetails?.otherDeatils?.accountType
                    ? userBnakDetails?.otherDeatils?.accountType
                    : "N/A"}
                </Typography>
              </Stack>
              {showHeaderOnScroll && (
                <Stack
                  width={"100%"}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  paddingX={2}
                  paddingY={2}
                >
                  <Stack>
                    <Typography variant="h5">
                      {" "}
                      {userBnakDetails?.otherDeatils?.accountType
                        ? userBnakDetails?.otherDeatils?.accountType
                        : "N/A"}
                    </Typography>
                    <Typography variant="subtitle2">
                      {userBnakDetails?.accountNumber
                        ? userBnakDetails?.accountNumber
                        : "N/A"}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="caption">PHP</Typography>
                      <Typography>
                        {" "}
                        {formatBalance(
                          userBnakDetails?.otherDeatils?.balance
                            ? userBnakDetails?.otherDeatils?.balance
                            : "0.00"
                        )}
                      </Typography>
                    </Stack>
                    <Typography variant="caption">Available balance</Typography>
                  </Stack>
                </Stack>
              )}
            </Stack>

            <HiddenScrollbarContainer
              sx={{
                width: "100%",
                height: "80vh",
                paddingX: 2,
                overflowY: "scroll",
              }}
            >
              <Box
                sx={{
                  boxShadow: 3,
                  paddingX: 2,
                  borderRadius: 0.7,
                  marginTop: 4,
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{ paddingY: 1 }}
                >
                  <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                    {userBnakDetails?.otherDeatils?.accountType
                      ? userBnakDetails?.otherDeatils?.accountType
                      : "N/A"}
                  </Typography>
                  <IconButton>
                    <CaretDown />
                  </IconButton>
                </Stack>
                <Divider />
                <Stack sx={{ marginTop: 2 }}>
                  <Typography variant="caption">Available balance</Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={1}
                  >
                    <Typography variant="caption">PHP</Typography>
                    <Typography variant="subtitle2">
                      {formatBalance(
                        userBnakDetails?.otherDeatils?.balance
                          ? userBnakDetails?.otherDeatils?.balance
                          : "0.00"
                      )}{" "}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ paddingTop: 2 }}>
                    Total balance
                  </Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    pt={1}
                  >
                    <Typography variant="caption">PHP</Typography>
                    <Typography variant="subtitle2">
                      {formatBalance(
                        userBnakDetails?.otherDeatils?.balance
                          ? userBnakDetails?.otherDeatils?.balance
                          : "0.00"
                      )}{" "}
                    </Typography>
                  </Stack>

                  <Stack
                    sx={{ marginTop: 2, mb: 2 }}
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <CaretDown style={{ color: "#20C997" }} size={25} />
                    <Typography variant="subtitle2" sx={{ color: "#20C997" }}>
                      Show Details
                    </Typography>
                  </Stack>

                  <Stack sx={{ borderTop: "1px solid #eeeeee" }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                      paddingY={1}
                    >
                      <ArrowsLeftRight style={{ color: "#20C997" }} size={25} />
                      <Typography sx={{ color: "#20C997" }} variant="subtitle2">
                        Transfer to
                      </Typography>
                      <CaretDown style={{ color: "#20C997" }} size={25} />
                    </Stack>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                      paddingY={1}
                    >
                      <FileCopy sx={{ color: "#20C997" }} size={25} />
                      <Typography sx={{ color: "#20C997" }} variant="subtitle2">
                        Pay Bills
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                      paddingY={1}
                      paddingBottom={2}
                    >
                      <Payments sx={{ color: "#20C997" }} size={25} />
                      <Typography sx={{ color: "#20C997" }} variant="subtitle2">
                        My Statements
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ boxShadow: 3, borderRadius: 0.7, marginTop: 4 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ paddingY: 2, paddingX: 2 }}
                >
                  Transaction history
                </Typography>

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  sx={{ paddingBottom: 2, paddingX: 2, cursor: "pointer" }}
                  onClick={() => navigate("/user/allTransaction")}
                >
                  <RemoveRedEye sx={{ color: "#20C997" }} />
                  <Typography variant="subtitle2" sx={{ color: "#20C997" }}>
                    Get Detained History
                  </Typography>
                </Stack>
              </Box>
              {myDepositeTransactions.length > 0 ? (
                myDepositeTransactions.slice(0, 10).map((transaction) => (
                  <Box sx={{ boxShadow: 3 }} key={transaction._id}>
                    <Box sx={{ backgroundColor: "#eeeeee", padding: 1 }}>
                      <Typography variant="subtitle2">
                        {formatDate(transaction.timestamp) || "N/A"}
                      </Typography>
                    </Box>
                    <Stack sx={{ padding: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ paddingY: 1, textTransform: "capitalize" }}
                      >
                        TXN Type : {transaction.transactionType || "N/A"}
                      </Typography>
                      <Typography variant="subtitle2">
                        TO: {transaction.senderAccountNumber || "N/A"}
                      </Typography>

                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography variant="caption" sx={{ paddingY: 1 }}>
                          Amount
                        </Typography>
                        <Typography variant="subtitle2" sx={{ paddingY: 1 }}>
                          -PHP {transaction.amount || "N/A"}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                ))
              ) : (
                <Typography variant="body2">No transactions found.</Typography> // Fallback if no data
              )}
            </HiddenScrollbarContainer>
          </Collapse>
        </Box>
      ) : (
        <Box sx={{ width: "100%", paddingX: 5 }}>
          <Typography variant="caption"> {getGreeting()},</Typography>
          <Typography variant="h5">
            {userBnakDetails?.otherDeatils?.personalDetails?.accountHolderName
              ? userBnakDetails?.otherDeatils?.personalDetails
                  ?.accountHolderName
              : "N/A"}
          </Typography>

          <HiddenScrollbarContainer
            sx={{
              display: "flex",
              flexDirection: "row",
              borderRadius: 0.5,
              maxWidth: "100%",
              justifyContent: "space-between",
              gap: 2,
              overflowY: "scroll",
              maxHeight: "80vh",
            }}
          >
            <Box sx={{ width: "80%" }}>
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
                      <SavingsOutlined sx={{ color: "#20C997" }} />
                    </Stack>
                    <Stack>
                      <Typography variant="body2">
                        {userBnakDetails?.otherDeatils?.accountType
                          ? userBnakDetails?.otherDeatils?.accountType
                          : "N/A"}
                      </Typography>

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
                          <IconButton
                            onClick={() => {
                              setCollapsed((prev) => !prev); // Toggles the 'collapsed' state
                              setCollapsed1((prev) => !prev); // Toggles the 'collapsed1' state
                            }}
                          >
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
                  {!collapsed1 && (
                    <IconButton onClick={() => setCollapsed1(!collapsed1)}>
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
                        {formatBalance(
                          userBnakDetails?.otherDeatils?.balance
                            ? userBnakDetails?.otherDeatils?.balance
                            : "0.00"
                        )}
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
                        {formatBalance(
                          userBnakDetails?.otherDeatils?.balance
                            ? userBnakDetails?.otherDeatils?.balance
                            : "0.00"
                        )}
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
                  >
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <ArrowsLeftRight size={22} />
                      <Typography variant="caption">Transfer to</Typography>
                      <CaretDown />
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <DescriptionOutlined style={{ fontSize: "25px" }} />
                      <Typography variant="caption">Pay Bills</Typography>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <DescriptionOutlined />
                      <Typography variant="caption">My Statements</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Collapse>

              <Collapse in={collapsed} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#fff",
                    paddingX: 3,
                    borderRadius: 0.5,
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="body2">
                      Home Bank Transaction History
                    </Typography>

                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                      sx={{ color: "#20c997" }}
                    >
                      <IconButton>
                        <EyeSlash color="#20c997" />
                      </IconButton>
                      <Typography variant="subtitle2">
                        Hide running balance
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Transaction History Table */}
                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent={"space-around"}
                  >
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      sx={{
                        width: "100%",
                        backgroundColor: "#eeeeee",
                        padding: 2,
                        borderRadius: 0.5,
                      }}
                    >
                      <Stack>
                        <Typography variant="caption">Sending</Typography>
                        <Typography variant="subtitle2">
                          Newest First
                        </Typography>
                      </Stack>
                      <IconButton>
                        <CaretDown />
                      </IconButton>
                    </Stack>

                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      sx={{
                        width: "100%",
                        backgroundColor: "#eeeeee",
                        padding: 2,
                        borderRadius: 0.5,
                      }}
                    >
                      <Stack>
                        <Typography variant="caption">
                          Trabsaction type
                        </Typography>
                        <Typography variant="subtitle2">
                          All transactions
                        </Typography>
                      </Stack>
                      <IconButton>
                        <CaretDown />
                      </IconButton>
                    </Stack>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      sx={{
                        width: "100%",
                        backgroundColor: "#eeeeee",
                        padding: 2,
                        borderRadius: 0.5,
                      }}
                    >
                      <Typography variant="subtitle2">Start Date</Typography>

                      <IconButton>
                        <Calendar />
                      </IconButton>
                    </Stack>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      sx={{
                        width: "100%",
                        backgroundColor: "#eeeeee",
                        padding: 2,
                        borderRadius: 0.5,
                      }}
                    >
                      <Typography variant="subtitle2">End Date</Typography>

                      <IconButton>
                        <Calendar />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                    {/* <Button
                variant="contained"
                sx={{ paddingX: 5, borderRadius: 0.5 }}
              >
                Apply
              </Button> */}
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
                      <Button
                        onClick={handleDeposite}
                        variant="contained"
                        sx={{
                          borderRadius: 0.5,
                          paddingX: 4,
                          paddingY: 2,
                          color: "#fff",
                          backgroundColor: "#b11116",
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
                    </Stack>
                  </Box>

                  <Box>
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.length > 0 ? (
                              rows
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.code}
                                  >
                                    {columns.map((column) => {
                                      const value = row[column.id];
                                      return (
                                        <TableCell
                                          sx={{ textTransform: "uppercase" }}
                                          key={column.id}
                                          align={column.align}
                                        >
                                          {column.format &&
                                          typeof value === "number"
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                ))
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={columns.length}
                                  align="center"
                                >
                                  <EmojiEmotions
                                    color="error"
                                    fontSize="large"
                                  />
                                  <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                  >
                                    No data available
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </Box>
                </Box>
              </Collapse>

              <Collapse in={collapsed1} timeout="auto" unmountOnExit>
                <Box
                  onClick={() => setCollapsed(!collapsed)}
                  sx={{
                    boxShadow: 3,
                    backgroundColor: "#fff",
                    padding: "14px 22px",
                    marginTop: collapsed ? 2 : 0,
                    borderTop: collapsed ? " none " : "1px solid #ddd",
                    borderRadius: 0.5,
                    cursor: "pointer",
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
                        {formatBalance(
                          userBnakDetails?.otherDeatils?.balance
                            ? userBnakDetails?.otherDeatils?.balance
                            : "0.00"
                        )}
                      </Typography>
                      <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                        Available balance
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Collapse>
            </Box>

            <Box sx={{ maxWidth: "20%", borderRadius: 1 }}>
              <Stack
                sx={{
                  paddingTop: 1,
                  padding: 1,
                  marginTop: 1,
                  borderRadius: 1,
                }}
              >
                <Stack
                  padding={3}
                  marginTop={3}
                  sx={{
                    boxShadow: 2,
                    backgroundColor: "rgba(180,180,180,0.5)",
                    borderRadius: 1,
                  }}
                >
                  <Shield size={30} />
                  <Typography variant="h6">
                    Use Mobile Key on the new BPI app
                  </Typography>

                  <Typography variant="caption" sx={{ paddingRight: 2 }}>
                    Authorize transaction here,in the new BPI app by activating
                    Mobile Key on the new BPI and instead of the older BPI app.
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </HiddenScrollbarContainer>
        </Box>
      )}
    </>
  );
};

export default MyAccount;
