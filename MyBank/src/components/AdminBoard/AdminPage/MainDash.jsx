import { TransactionOutlined } from "@ant-design/icons";
import { Group, MonetizationOn, Shield } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowDown, ArrowUp, ArrowUpRight } from "phosphor-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodayTransactions,
  getAllDepositeTransactions,
  getAnnualData,
  getMonthlyData,
  getWeeklyData,
  StatusUpdateDepositRequest,
} from "../../../Redux/Admin/AdminFunction";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  txnid,
  amount,
  currency,
  username,
  email,
  senderacc,
  status,
  txntype,
  txnstatus,
  created
) {
  return {
    txnid,
    amount,
    currency,
    username,
    email,
    senderacc,
    status,
    txntype,
    txnstatus,
    created,
  };
}

const HiddenScrollbarContainer = styled("div")({
  overflow: "hidden", // Prevent scrolling
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for webkit browsers
  },
  scrollbarWidth: "none", // Hide scrollbar for Firefox
});
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

const MainDash = () => {
  const dispatch = useDispatch();
  const { userList, recentUsers } = useSelector((state) => state.admin || []);
  const {
    weeklyTrans,
    monthlyTrans,
    annualTrans,
    allDepositeRequest,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getWeeklyData())
    dispatch(getMonthlyData());
    dispatch(getAnnualData());
    dispatch(fetchTodayTransactions());
    dispatch(getAllDepositeTransactions());
  }, [dispatch]);

  console.log(
    "deposite transaction in main dashboard admin",
    allDepositeRequest
  );

  const rows = Array.isArray(allDepositeRequest) 
  ? allDepositeRequest.map((data) => {
      return createData(
        data?.transactionId ? data.transactionId : "N/A",
        data?.amount ? data.amount : "N/A",
        data?.currency ? data.currency : "N/A",
        `${data?.senderUserId?.firstName || "N/A"} ${data?.senderUserId?.lastName || "N/A"}`,
        data?.senderUserId?.email ? data.senderUserId?.email : "N/A",
        data?.senderAccountNumber ? data.senderAccountNumber : "N/A", 
        data?.status ? data?.status : "N/A",
        data?.transactionType ? data.transactionType : "N/A",
        data?.status ? data?.status : "N/A",
        formatDateTime(data?.timestamp) // Created date
      );
    })
  : [];

  const handleStatusChange = (transactionId, newStatus) => {
    dispatch(StatusUpdateDepositRequest(transactionId, newStatus));
    dispatch(getAllDepositeTransactions());
  };

  // console.log('todaytransactions in maindashboard',todayTransactions)
  return (
    <>
      <HiddenScrollbarContainer
        sx={{ p: 3, width: "100%", height: "100%", overflowY: "scroll" }}
      >
        <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
          Dashboard Overview
        </Typography>

        <Grid container spacing={3}>
          {/* Total Customers */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                backgroundColor: "#E7ECFF", // Stylish color for box 1
                color: "#001529",
                paddingX: 3,
                paddingY: 2,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
                gap: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#001529",
                      borderRadius: 0.5,
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Shield sx={{ color: "#fff" }} />
                  </Box>
                  <Stack
                    direction={"column"}
                    sx={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#001529",
                      }}
                    >
                      Secure Banking With Us
                    </Typography>
                    <Typography variant="body2">Total Users</Typography>
                  </Stack>
                </Stack>
                <IconButton>
                  <Group size={18} />
                </IconButton>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="h5">{userList.length}</Typography>
                  <Typography variant="caption" sx={{ color: "#43a047" }}>
                    +6.9 %
                  </Typography>
                </Stack>

                <Stack>
                  <svg width="100" height="50" viewBox="0 0 80 20">
                    {/* Line path */}
                    <polyline
                      points="0,15 20,10 40,12 60,8 80,14"
                      fill="none"
                      stroke="#43a047"
                      strokeWidth="2"
                    />
                    {/* Points on the line */}
                    <circle cx="0" cy="15" r="2" fill="#43a047" />
                    <circle cx="20" cy="10" r="2" fill="#43a047" />
                    <circle cx="40" cy="12" r="2" fill="#43a047" />
                    <circle cx="60" cy="8" r="2" fill="#43a047" />
                    <circle cx="80" cy="14" r="2" fill="#43a047" />
                  </svg>
                </Stack>
              </Stack>

              <Stack direction={"row"} justifyContent={"space-between"}>
                {/* Weekly user statics */}
                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowUp style={{ color: "#43a047" }} />
                  <Typography variant="body2">89%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Weekly
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowDown style={{ color: "#c62828" }} />
                  <Typography variant="body2">13%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Monthly
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowUpRight style={{ color: "#43a047" }} />
                  <Typography variant="body2">03%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Overall
                  </Typography>
                </Stack>
              </Stack>
              {/* Placeholder data */}
            </Box>
          </Grid>

          {/* Today's Total Transactions */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                backgroundColor: "#FFEFE2", // Stylish color for box 2
                color: "#001529",
                paddingX: 3,
                paddingY: 2,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
                gap: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#001529",
                      borderRadius: 0.5,
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <MonetizationOn sx={{ color: "#fff" }} />
                  </Box>
                  <Stack
                    direction={"column"}
                    sx={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#001529",
                      }}
                    >
                      Total Weekly Transactions
                    </Typography>
                    <Typography variant="body2">Amount flow</Typography>
                  </Stack>
                </Stack>
                <IconButton>
                  <TransactionOutlined size={18} />
                </IconButton>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="h5">
                    {weeklyTrans ? weeklyTrans.toFixed(2) : "0.00"}
                  </Typography>
                  {/* <Typography variant="h5">65783563</Typography> */}
                  <Typography variant="caption" sx={{ color: "#43a047" }}>
                    +6.9 %
                  </Typography>
                </Stack>

                <Stack>
                  <svg width="100" height="50" viewBox="0 0 80 20">
                    {/* Line path */}
                    <polyline
                      points="0,15 20,10 40,12 60,8 80,14"
                      fill="none"
                      stroke="#43a047"
                      strokeWidth="2"
                    />
                    {/* Points on the line */}
                    <circle cx="0" cy="15" r="2" fill="#43a047" />
                    <circle cx="20" cy="10" r="2" fill="#43a047" />
                    <circle cx="40" cy="12" r="2" fill="#43a047" />
                    <circle cx="60" cy="8" r="2" fill="#43a047" />
                    <circle cx="80" cy="14" r="2" fill="#43a047" />
                  </svg>
                </Stack>
              </Stack>

              <Stack direction={"row"} justifyContent={"space-between"}>
                {/* Weekly user statics */}
                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowUp style={{ color: "#43a047" }} />
                  <Typography variant="body2">89%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Weekly
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowDown style={{ color: "#c62828" }} />
                  <Typography variant="body2">13%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Monthly
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowUpRight style={{ color: "#43a047" }} />
                  <Typography variant="body2">03%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Overall
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>

          {/* This Month's Total Transactions */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                backgroundColor: "#4bc0c0", // Stylish color for box 3
                color: "#fff",
                paddingX: 3,
                paddingY: 2,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
                gap: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#001529",
                      borderRadius: 0.5,
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <MonetizationOn sx={{ color: "#fff" }} />
                  </Box>
                  <Stack
                    direction={"column"}
                    sx={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#001529",
                      }}
                    >
                      Total Monthly Transaction
                    </Typography>
                    <Typography variant="body2">Money Flow</Typography>
                  </Stack>
                </Stack>
                <IconButton>
                  <TransactionOutlined size={18} />
                </IconButton>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="h5">
                    {monthlyTrans ? monthlyTrans.toFixed(2) : "0.00"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#43a047" }}>
                    +6.9 %
                  </Typography>
                </Stack>

                <Stack>
                  <svg width="100" height="50" viewBox="0 0 80 20">
                    {/* Line path */}
                    <polyline
                      points="0,15 20,10 40,12 60,8 80,14"
                      fill="none"
                      stroke="#43a047"
                      strokeWidth="2"
                    />
                    {/* Points on the line */}
                    <circle cx="0" cy="15" r="2" fill="#43a047" />
                    <circle cx="20" cy="10" r="2" fill="#43a047" />
                    <circle cx="40" cy="12" r="2" fill="#43a047" />
                    <circle cx="60" cy="8" r="2" fill="#43a047" />
                    <circle cx="80" cy="14" r="2" fill="#43a047" />
                  </svg>
                </Stack>
              </Stack>

              <Stack direction={"row"} justifyContent={"space-between"}>
                {/* Weekly user statics */}
                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowUp style={{ color: "#43a047" }} />
                  <Typography variant="body2">89%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Weekly
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowDown style={{ color: "#c62828" }} />
                  <Typography variant="body2">13%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Monthly
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowUpRight style={{ color: "#43a047" }} />
                  <Typography variant="body2">03%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Overall
                  </Typography>
                </Stack>
              </Stack>
              {/* Placeholder data */}
            </Box>
          </Grid>

          {/* This Year’s Total Transactions */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                backgroundColor: "#ffcd56", // Stylish color for box 4
                color: "#fff",
                paddingX: 3,
                paddingY: 2,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
                gap: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#001529",
                      borderRadius: 0.5,
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <MonetizationOn sx={{ color: "#fff" }} />
                  </Box>
                  <Stack
                    direction={"column"}
                    sx={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#001529",
                      }}
                    >
                      Total Yearly Transactions
                    </Typography>
                    <Typography variant="body2">Transactions Flow</Typography>
                  </Stack>
                </Stack>
                <IconButton>
                  <TransactionOutlined size={18} />
                </IconButton>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="h5">
                    {annualTrans ? annualTrans.toFixed(2) : "0.00"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#43a047" }}>
                    +6.9 %
                  </Typography>
                </Stack>

                <Stack>
                  <svg width="100" height="50" viewBox="0 0 80 20">
                    {/* Line path */}
                    <polyline
                      points="0,15 20,10 40,12 60,8 80,14"
                      fill="none"
                      stroke="#43a047"
                      strokeWidth="2"
                    />
                    {/* Points on the line */}
                    <circle cx="0" cy="15" r="2" fill="#43a047" />
                    <circle cx="20" cy="10" r="2" fill="#43a047" />
                    <circle cx="40" cy="12" r="2" fill="#43a047" />
                    <circle cx="60" cy="8" r="2" fill="#43a047" />
                    <circle cx="80" cy="14" r="2" fill="#43a047" />
                  </svg>
                </Stack>
              </Stack>

              <Stack direction={"row"} justifyContent={"space-between"}>
                {/* Weekly user statics */}
                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowUp style={{ color: "#43a047" }} />
                  <Typography variant="body2">89%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Weekly
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowDown style={{ color: "#c62828" }} />
                  <Typography variant="body2">13%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Monthly
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <ArrowUpRight style={{ color: "#43a047" }} />
                  <Typography variant="body2">03%</Typography>
                  <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
                    Overall
                  </Typography>
                </Stack>
              </Stack>
              {/* Placeholder data */}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 5, width: "100%" }}>
          <Typography variant="subtitle2" sx={{ paddingY: 5 }}>
            User List which add Deposite Money Today
          </Typography>

          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">TXN-ID</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell align="center">Cuurency</StyledTableCell>
                    <StyledTableCell align="center">UserName</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">
                      Sender Acc No.
                    </StyledTableCell>
                    <StyledTableCell align="center">TXN-Status</StyledTableCell>
                    <StyledTableCell align="center">TXN-Type</StyledTableCell>
                    <StyledTableCell align="center">TXN-Status</StyledTableCell>
                    <StyledTableCell align="center">Created At</StyledTableCell>
                  </TableRow>
                </TableHead>
                {/* txnid,amount,currency, username, email, senderacc, reciveracc,bankname,created */}
                <TableBody>
                  {/* {rows.map((row) => (
            <StyledTableRow key={row.key}>
              <StyledTableCell component="th" scope="row">
                {row.txnid}
              </StyledTableCell>
              <StyledTableCell align="center">{row.amount}</StyledTableCell>
              <StyledTableCell align="center">{row.currency}</StyledTableCell>
              <StyledTableCell align="center">{row.username}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.senderacc}</StyledTableCell>
              <StyledTableCell align="center">{row.reciveracc}</StyledTableCell>
              <StyledTableCell align="center">{row.bankname}</StyledTableCell>
              <StyledTableCell align="center">{row.created}</StyledTableCell>
            </StyledTableRow>
          ))} */}
                  {rows.length > 0 ? (
                    // Map through rows if available
                    rows.map((row) => (
                      <StyledTableRow key={row.key}>
                        <StyledTableCell component="th" scope="row">
                          {row.txnid}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.amount}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.currency}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.username}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.senderacc}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.status === "completed" ||
                          row.status === "rejected" ? (
                            // Display plain text if the status is "completed" or "rejected"
                            <span>{row.status}</span>
                          ) : (
                            // Show the dropdown selector only if the status is "pending"
                            <FormControl variant="outlined" size="small">
                              <InputLabel>Status</InputLabel>
                              <Select
                                value={row.status}
                                onChange={(e) =>
                                  handleStatusChange(row.txnid, e.target.value)
                                }
                                label="Status"
                              >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="approved">Approved</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.txntype}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{
                            textTransform: "capitalize",
                            color:
                              row.txnstatus === "completed" ? "green" : "red",
                          }}
                        >
                          {row.txnstatus}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.created}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    // Show fallback message if no data is available
                    <StyledTableRow>
                      <StyledTableCell colSpan={9} align="center">
                        <span role="img" aria-label="weeping emoji">
                          😭
                        </span>{" "}
                        No Data Available
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </HiddenScrollbarContainer>
    </>
  );
};

export default MainDash;
