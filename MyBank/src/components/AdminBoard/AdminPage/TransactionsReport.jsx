import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Box,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserTransactions } from "../../../Redux/Admin/AdminFunction";

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

const TransactionsReport = () => {
  const dispatch = useDispatch();
  const { allUserTransactions } = useSelector(
    (state) => state.admin || { allUserTransactions: {} }
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const columns = [
    { id: "txnid", label: "TXN-ID" },
    { id: "amount", label: "Amount" },
    {
      id: "currency",
      label: "Currency",
      align: "center",
    },
    {
      id: "username",
      label: "User Name",
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      align: "center",
    },
    {
      id: "senderacc",
      label: "Sender Acc. No.",
      align: "center",
    },
    {
      id: "reciveracc",
      label: "Receiver Acc. No.",
      align: "center",
    },
    {
      id: "bankname",
      label: "Bank Name",
      align: "center",
    },
    {
      id: "created",
      label: "Craeted At",
      align: "center",
    },
  ];

  function createData(
    txnid,
    amount,
    currency,
    username,
    email,
    senderacc,
    reciveracc,
    bankname,
    created
  ) {
    return {
      txnid,
      amount,
      currency,
      username,
      email,
      senderacc,
      reciveracc,
      bankname,
      created,
    };
  }
  const rows = [
    ...(allUserTransactions?.homeBank || []).map((data) => {
      return createData(
        data.transactionId ? data.transactionId : "N/A",
        data.amount ? data.amount : "N/A",
        data.currency ? data.currency : "N/A",
        `${data.receiverUserId?.firstName || "N/A"} ${
          data.receiverUserId?.lastName || "N/A"
        }`,
        data.receiverUserId?.email ? data.receiverUserId?.email : "N/A",
        data.senderBankAccountNumber ? data.senderBankAccountNumber : "N/A",
        data.receiverBankAccountNumber ? data.receiverBankAccountNumber : "N/A",
        data.transactionType ? data.transactionType : "N/A",
        formatDateTime(data.timestamp), // Created date
        "Home Bank" // Bank name for homeBank
      );
    }),
    ...(allUserTransactions?.anotherBank || []).map((data) => {
      return createData(
        data.transactionId ? data.transactionId : "N/A",
        data.amount ? data.amount : "N/A",
        data.currency ? data.currency : "N/A",
        data.anotherBankDetails?.accountHolderName
          ? data.anotherBankDetails?.accountHolderName
          : "N/A",
        data.receiverUserId?.email ? data.receiverUserId?.email : "N/A",
        data.senderBankAccountId ? data.senderBankAccountId : "N/A", // Adjust according to actual data structure
        data.receiverBankAccountId ? data.receiverBankAccountId : "N/A", // Adjust according to actual data structure
        data.transactionType ? data.transactionType : "N/A",
        formatDateTime(data.timestamp), // Created date
        data.anotherBankDetails?.bankName || "N/A" // Bank name for anotherBank
      );
    }),
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchAllUserTransactions());
  }, [dispatch]);

  return (
    <>
      <HiddenScrollbarContainer
        sx={{ width: "100%", height: "100%", overflowY: "scroll" }}
      >
        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h5">All Transactions</Typography>

          <Box sx={{ marginTop: 3 }}>
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
                    {/* {rows
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
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })} */}
                    {rows.length > 0 ? (
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
                              key={row.code}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
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
                      // Show fallback message if no data is available
                      <TableRow>
                        <TableCell colSpan={columns.length} align="center">
                          <span role="img" aria-label="weeping emoji">
                            😭
                          </span>{" "}
                          No Data Available
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
      </HiddenScrollbarContainer>
    </>
  );
};

export default TransactionsReport;
