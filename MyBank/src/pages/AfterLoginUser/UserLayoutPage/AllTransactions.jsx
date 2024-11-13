import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMyTransactionHistory } from "../../../Redux/UserAuth/Auth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CaretDown, CaretUp } from "phosphor-react";

const HiddenScrollbarContainer = styled("div")({
  overflow: "hidden", // Prevent scrolling
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for webkit browsers
  },
  scrollbarWidth: "none", // Hide scrollbar for Firefox
});

const columns = [
  { id: "txnid", label: "TXN-ID" },
  { id: "amount", label: "Amount" },
  {
    id: "currency",
    label: "Currency",
  },
  {
    id: "reciverid",
    label: "Receiver ID",
    align: "center",
  },
  {
    id: "reciname",
    label: "Receiver Name",
    align: "center",
  },
  {
    id: "reciemail",
    label: "Receiver Email",
    align: "center",
  },

  {
    id: "reciaccNo",
    label: "Receiver Acc No.(To)",
    align: "center",
  },
  {
    id: "senderaccNo",
    label: "My Acc No(From)",
    align: "center",
  },
  {
    id: "txnstatus",
    label: "TXN-Status",
    align: "center",
  },
  {
    id: "txnstype",
    label: "TXN-Type",
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
  currency,
  reciverid,
  reciname,
  reciemail,
  reciaccNo,
  senderaccNo,
  txnstatus,
  txnstype,
  created
) {
  return {
    txnid,
    amount,
    currency,
    reciverid,
    reciname,
    reciemail,
    reciaccNo,
    senderaccNo,
    txnstatus,
    txnstype,
    created,
  };
}

const columns1 = [
  { id: "txnid", label: "TXN-ID", minWidth: 170 },
  { id: "amount", label: "Amount", minWidth: 100 },
  {
    id: "currency",
    label: "Currency",
  },
  {
    id: "reciverid",
    label: "Receiver ID",
    align: "center",
  },
  {
    id: "reciname",
    label: "Receiver Name",
    align: "center",
  },
  {
    id: "reciaccNo",
    label: "Receiver Acc No.(To)",
    align: "center",
  },
  {
    id: "recbankname",
    label: "Receiver Bank Name",
    align: "center",
  },
  {
    id: "recbankcode",
    label: "Receiver Bank Code",
    align: "center",
  },

  {
    id: "senderaccNo",
    label: "My Acc No(From)",
    align: "center",
  },
  {
    id: "txnstatus",
    label: "TXN-Status",
    align: "center",
  },
  {
    id: "txnstype",
    label: "TXN-Type",
    align: "center",
  },
  {
    id: "created",
    label: "Created At",
    align: "center",
  },
];
function createData1(
  txnid,
  amount,
  currency,
  reciverid,
  reciname,
  reciaccNo,
  recbankname,
  recbankcode,
  senderaccNo,
  txnstatus,
  txnstype,
  created
) {
  return {
    txnid,
    amount,
    currency,
    reciverid,
    reciname,
    reciaccNo,
    recbankname,
    recbankcode,
    senderaccNo,
    txnstatus,
    txnstype,
    created,
  };
}

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

const AllTransactions = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const Muitheme = useTheme();
  const isSmallScreen = useMediaQuery(Muitheme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [collapse, setCollapse] = useState(false);
  const [collapse1, setCollapse1] = useState(false);

  const { myAllTransactions } = useSelector(
    (state) => state.auth || { myAllTransactions: [] }
  );
  const { userBnakDetails } = useSelector( (state) => state.auth || { userBnakDetails: {}});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setLoading(true);  // Set loading state to true before starting data fetch
    dispatch(GetMyTransactionHistory())
      .finally(() => {
        setLoading(false);  // Set loading state to false after data fetch is complete
      });
  }, [dispatch]);

  // const rows = myAllTransactions?.homeBankTransactions?.map((data) => {
  //   const row = createData(
  //     data.transactionId ? data.transactionId : "N/A",
  //     data.amount ? data.amount : "N/A",
  //     data.currency ? data.currency : "N/A",
  //     data.receiverUserId?._id ? data.receiverUserId?._id : "N/A",
  //     `${data.receiverUserId?.firstName || "N/A"} ${
  //       data.receiverUserId?.lastName || "N/A"
  //     }`,
  //     data.receiverUserId?.email ? data.receiverUserId?.email : "N/A",
  //     data.receiverBankAccountNumber ? data.receiverBankAccountNumber : "N/A",
  //     data.senderBankAccountNumber ? data.senderBankAccountNumber : "N/A",
  //     data.status ? data.status : "N/A",
  //     data.transactionType ? data.transactionType : "N/A",
  //     formatDateTime(data.timestamp) // Created date
  //   );

  //   // Return the row with the key
  //   return { ...row, key: data._id }; // Use a unique key for each row
  // });
  const rows = myAllTransactions?.homeBankTransactions?.length > 0
    ? myAllTransactions.homeBankTransactions.map((data) => {
        return createData(
          data.transactionId || "N/A",
          data.amount || "N/A",
          data.currency || "N/A",
          data.receiverUserId?._id || "N/A",
          `${data.receiverUserId?.firstName || "N/A"} ${data.receiverUserId?.lastName || "N/A"}`,
          data.receiverUserId?.email || "N/A",
          data.receiverBankAccountNumber || "N/A",
          data.senderBankAccountNumber || "N/A",
          data.status || "N/A",
          data.transactionType || "N/A",
          formatDateTime(data.timestamp) // Created date
        );
      })
    : [];
  // const rows1 = myAllTransactions?.anotherBankTransactions.map((data) => {
  //   const row = createData1(
  //     data.transactionId ? data.transactionId : "N/A",
  //     data.amount ? data.amount : "N/A",
  //     data.currency ? data.currency : "N/A",
  //     data.receiverUserId?._id ? data.receiverUserId?._id : "N/A",
  //     `${data.anotherBankDetails?.accountHolderName || "N/A"}`,
  //     data.receiverBankAccountNumber ? data.receiverBankAccountNumber : "N/A",
  //     data.anotherBankDetails?.bankName
  //       ? data.anotherBankDetails?.bankName
  //       : "N/A",
  //     data.anotherBankDetails?.swiftCode
  //       ? data.anotherBankDetails?.swiftCode
  //       : "N/A",
  //     data.senderBankAccountNumber ? data.senderBankAccountNumber : "N/A",
  //     data.status ? data.status : "N/A",
  //     data.transactionType ? data.transactionType : "N/A",
  //     formatDateTime(data.timestamp) // Created date
  //   );

  //   // Return the row with the key
  //   return { ...row, key: data._id }; // Use a unique key for each row
  // });
  const rows1 = myAllTransactions?.anotherBankTransactions?.length > 0
  ? myAllTransactions.anotherBankTransactions.map((data) => {
      return createData1(
        data.transactionId || "N/A",
        data.amount || "N/A",
        data.currency || "N/A",
        data.receiverUserId?._id || "N/A",
        `${data.anotherBankDetails?.accountHolderName || "N/A"}`,
        data.receiverBankAccountNumber || "N/A",
        data.anotherBankDetails?.bankName || "N/A",
        data.anotherBankDetails?.swiftCode || "N/A",
        data.senderBankAccountNumber || "N/A",
        data.status || "N/A",
        data.transactionType || "N/A",
        formatDateTime(data.timestamp) // Created date
      );
    })
  : [];

  const hasTransactions = rows.length > 0 || rows1.length > 0;

  const hasMobTransaction =
  myAllTransactions?.homeBankTransactions?.length > 0 ||
  myAllTransactions?.anotherBankTransactions?.length > 0;


    if (loading) {
      return <p>Loading...</p>;
    }
  return (
    <>
      {isSmallScreen ? (
        <Box sx={{ width: "100%", paddingX: 2, paddingTop: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={3}
            sx={{ position: "sticky" }}
          >
            <IconButton onClick={() => navigate("/user/mainacc")}>
              <ArrowLeft />
            </IconButton>
            <Typography variant="h5">All Home Bank Transactions</Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ marginTop: 2, px: 2 }}
          >
            <Typography variant="h6">
              {collapse ? "Hide Details" : "Show Home Bank Details"}
            </Typography>
            <IconButton onClick={() => setCollapse((prev) => !prev)}>
              {collapse ? <CaretDown /> : <CaretUp />}
            </IconButton>
          </Stack>
          <HiddenScrollbarContainer
            sx={{ overflowY: "scroll", width: "100%", maxHeight: "80vh" }}
          >
            <Box sx={{ marginTop: 3 }}>
              <Paper
                sx={{ width: "100%", overflow: "hidden", marginBottom: 5 }}
              >
                {/* <Collapse in={collapse}>
                  {hasMobTransaction ? (
                    myAllTransactions?.homeBankTransactions.map(
                      (transaction) => (
                        <Box
                          sx={{ boxShadow: 3, paddingBottom: 1 }}
                          key={transaction.key}
                        >
                          <Box
                            sx={{
                              backgroundColor: "#eeeeee",
                              padding: 1,
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle2">
                              {formatDate(transaction.timestamp) || "N/A"}
                            </Typography>
                            <Typography variant="caption">
                              {transaction.transactionId || "N/A"}
                            </Typography>
                          </Box>
                          <Stack
                            sx={{ padding: 2, backgroundColor: "#f5f5f5" }}
                          >
                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Stack>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    paddingY: 1,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  TXN Type :{" "}
                                  {transaction.transactionType || "N/A"}
                                </Typography>
                                <Typography variant="subtitle2">
                                  TO:{" "}
                                  {transaction.receiverBankAccountNumber ||
                                    "N/A"}
                                </Typography>
                              </Stack>
                              <Stack>
                                <Typography variant="subtitle2">
                                  FROM:{" "}
                                  {transaction.senderBankAccountNumber || "N/A"}
                                </Typography>
                                <Typography variant="caption">
                                  Receiver name:{" "}
                                  {`${
                                    transaction.receiverUserId?.firstName ||
                                    "N/A"
                                  } ${
                                    transaction.receiverUserId?.lastName ||
                                    "N/A"
                                  }`}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Typography
                                variant="caption"
                                sx={{ paddingY: 1 }}
                              >
                                Amount
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{ paddingY: 1 }}
                              >
                                -PHP {transaction.amount || "N/A"}
                              </Typography>
                            </Stack>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              justifyContent={"center"}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  color:
                                    transaction.status === "completed"
                                      ? "green"
                                      : "red",
                                }}
                              >
                                {transaction.status}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      )
                    )
                  ) : (
                    <Typography variant="body2">
                      No transactions found.
                    </Typography> // Fallback if no data
                  )}
                </Collapse> */}
                <Collapse in={collapse}>
                {hasMobTransaction ? (
    myAllTransactions?.homeBankTransactions?.length > 0 ? (
      myAllTransactions.homeBankTransactions.map((transaction) => (
        <Box sx={{ boxShadow: 3, paddingBottom: 1 }} key={transaction._id}>
          <Box
            sx={{
              backgroundColor: "#eeeeee",
              padding: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle2">
              {formatDate(transaction.timestamp) || "N/A"}
            </Typography>
            <Typography variant="caption">
              {transaction.transactionId || "N/A"}
            </Typography>
          </Box>
          <Stack sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Stack>
                <Typography variant="subtitle2" sx={{ paddingY: 1, textTransform: "capitalize" }}>
                  TXN Type : {transaction.transactionType || "N/A"}
                </Typography>
                <Typography variant="subtitle2">
                  TO: {transaction.receiverBankAccountNumber || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  FROM: {transaction.senderBankAccountNumber || "N/A"}
                </Typography>
                <Typography variant="caption">
                  Receiver name: {`${transaction.receiverUserId?.firstName || "N/A"} ${transaction.receiverUserId?.lastName || "N/A"}`}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography variant="caption" sx={{ paddingY: 1 }}>
                Amount
              </Typography>
              <Typography variant="subtitle2" sx={{ paddingY: 1 }}>
                -PHP {transaction.amount || "N/A"}
              </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
              <Typography variant="caption" sx={{ color: transaction.status === "completed" ? "green" : "red" }}>
                {transaction.status}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      ))
    ) : (
      <Typography variant="body2">No home bank transactions found.</Typography>
    )
  ) : (
    <Typography variant="body2">No transactions found.</Typography> // Fallback if no data
  )}
</Collapse>
              </Paper>
            </Box>

            <Typography variant="h5" sx={{ paddingLeft: 2 }}>
              All Another Bank Transactions
            </Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ marginTop: 2, px: 2 }}
            >
              <Typography variant="subtitle2">
                {collapse1 ? "Hide Details" : "Show Another Bank Details"}
              </Typography>
              <IconButton onClick={() => setCollapse1((prev) => !prev)}>
                {collapse1 ? <CaretDown /> : <CaretUp />}
              </IconButton>
            </Stack>
            <Box sx={{ marginTop: 3, paddingTop: 5 }}>
              <Paper
                sx={{ width: "100%", overflow: "hidden", marginBottom: 5 }}
              >
                {/* <Collapse in={collapse1}>
                  {hasMobTransaction ? (
                    myAllTransactions?.anotherBankTransactions?.map(
                      (transaction) => (
                        <Box
                          sx={{ boxShadow: 3, paddingBottom: 1 }}
                          key={transaction.key}
                        >
                          <Box
                            sx={{
                              backgroundColor: "#eeeeee",
                              padding: 1,
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle2">
                              {formatDate(transaction.timestamp) || "N/A"}
                            </Typography>
                            <Typography variant="caption">
                              {transaction.transactionId || "N/A"}
                            </Typography>
                          </Box>
                          <Stack
                            sx={{ padding: 2, backgroundColor: "#f5f5f5" }}
                          >
                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Stack>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    paddingY: 1,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  TXN Type :{" "}
                                  {transaction.transactionType || "N/A"}
                                </Typography>
                                <Typography variant="subtitle2">
                                  TO:{" "}
                                  {transaction.receiverAccountNumber || "N/A"}
                                </Typography>
                              </Stack>
                              <Stack>
                                <Typography variant="subtitle2">
                                  FROM:{" "}
                                  {transaction.senderAccountNumber || "N/A"}
                                </Typography>
                                <Typography variant="caption">
                                  Receiver name:{" "}
                                  {`${
                                    transaction.anotherBankDetails
                                      ?.accountHolderName || "N/A"
                                  }`}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Typography
                                variant="caption"
                                sx={{ paddingY: 1 }}
                              >
                                Amount
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{ paddingY: 1 }}
                              >
                                -PHP {transaction.amount || "N/A"}
                              </Typography>
                            </Stack>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              justifyContent={"center"}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  color:
                                    transaction.status === "completed"
                                      ? "green"
                                      : "red",
                                  textTransform: "capitalize",
                                }}
                              >
                                {transaction.status}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      )
                    )
                  ) : (
                    <Typography variant="body2">
                      No transactions found.
                    </Typography> // Fallback if no data
                  )}
                </Collapse> */}
                <Collapse in={collapse1}>
                {hasMobTransaction ? (
    myAllTransactions?.anotherBankTransactions?.length > 0 ? (
      myAllTransactions.anotherBankTransactions.map((transaction) => (
        <Box sx={{ boxShadow: 3, paddingBottom: 1 }} key={transaction._id}>
          <Box
            sx={{
              backgroundColor: "#eeeeee",
              padding: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle2">
              {formatDate(transaction.timestamp) || "N/A"}
            </Typography>
            <Typography variant="caption">
              {transaction.transactionId || "N/A"}
            </Typography>
          </Box>
          <Stack sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Stack>
                <Typography variant="subtitle2" sx={{ paddingY: 1, textTransform: "capitalize" }}>
                  TXN Type : {transaction.transactionType || "N/A"}
                </Typography>
                <Typography variant="subtitle2">
                  TO: {transaction.receiverAccountNumber || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="subtitle2">
                  FROM: {transaction.senderAccountNumber || "N/A"}
                </Typography>
                <Typography variant="caption">
                  Receiver name: {`${transaction.anotherBankDetails?.accountHolderName || "N/A"}`}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography variant="caption" sx={{ paddingY: 1 }}>
                Amount
              </Typography>
              <Typography variant="subtitle2" sx={{ paddingY: 1 }}>
                -PHP {transaction.amount || "N/A"}
              </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
              <Typography
                variant="caption"
                sx={{
                  color: transaction.status === "completed" ? "green" : "red",
                  textTransform: "capitalize",
                }}
              >
                {transaction.status}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      ))
    ) : (
      <Typography variant="body2">No another bank transactions found.</Typography>
    )
  ) : (
    <Typography variant="body2">No transactions found.</Typography> // Fallback if no data
  )}
</Collapse>

              </Paper>
            </Box>
            <Stack
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography sx={{ fontSize: "60px" }}>🔒</Typography>
              <Typography variant="subtitle2">
                😆Happy and Safe Banking With Us
              </Typography>
            </Stack>
          </HiddenScrollbarContainer>
        </Box>
      ) : (
        <HiddenScrollbarContainer
          sx={{ overflowY: "scroll", width: "100%", height: "100%" }}
        >
          <Typography variant="h5">All Home Bank Transactions</Typography>

          <Box sx={{ marginTop: 3 }}>
            <Paper sx={{ width: "100%", overflow: "hidden", marginBottom: 5 }}>
              {/* <TableContainer sx={{ maxHeight: 440 }}>
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
                    {hasTransactions ? (
                      rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.key}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{ fontSize: 12 }}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} align="center">
                          <Typography variant="h6" color="textSecondary">
                            😢 No Data Available
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer> */}
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
              {loading ? (
                // Show loading message
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography variant="h6" color="textSecondary">
                      Loading...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : hasTransactions ? (
                // Show table rows when data is available
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ fontSize: 12 }}>
                            {column.format && typeof value === "number" ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              ) : (
                // Show "No Data Available" message when no transactions exist
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography variant="h6" color="textSecondary">
                      😢 No Data Available
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

          <Typography variant="h5">All Another Bank Transactions</Typography>

          <Box sx={{ marginTop: 3, paddingTop: 5 }}>
            <Paper sx={{ width: "100%", overflow: "hidden", marginBottom: 5 }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns1.map((column) => (
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
                    {hasTransactions ? (
                      rows1
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.key}
                            >
                              {columns1.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{ fontSize: 12 }}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns1.length} align="center">
                          <Typography variant="h6" color="textSecondary">
                            😢 No Data Available
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
        </HiddenScrollbarContainer>
      )}
    </>
  );
};

export default AllTransactions;
