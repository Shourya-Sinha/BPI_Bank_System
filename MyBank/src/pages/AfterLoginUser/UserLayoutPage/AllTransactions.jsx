import {
  Box,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMyTransactionHistory } from "../../../Redux/UserAuth/Auth";

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


const AllTransactions = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { myAllTransactions } = useSelector(
    (state) => state.auth || { myAllTransactions: [] }
  );
  // const { userBnakDetails } = useSelector( (state) => state.auth || { userBnakDetails: {}});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(GetMyTransactionHistory());
  }, [dispatch]);

  const rows = myAllTransactions?.homeBankTransactions.map((data) => {
    const row = createData(
      data.transactionId ? data.transactionId : "N/A",
      data.amount ? data.amount : "N/A",
      data.currency ? data.currency : "N/A",
      data.receiverUserId?._id ? data.receiverUserId?._id : "N/A",
      `${data.receiverUserId?.firstName || "N/A"} ${
        data.receiverUserId?.lastName || "N/A"
      }`,
      data.receiverUserId?.email ? data.receiverUserId?.email : "N/A",
      data.receiverBankAccountNumber ? data.receiverBankAccountNumber : "N/A",
      data.senderBankAccountNumber ? data.senderBankAccountNumber : "N/A",
      data.status ? data.status : "N/A",
      data.transactionType ? data.transactionType : "N/A",
      formatDateTime(data.timestamp) // Created date
    );

    // Return the row with the key
    return { ...row, key: data._id }; // Use a unique key for each row
  });

  const rows1 = myAllTransactions?.anotherBankTransactions.map((data) => {
    const row = createData1(
      data.transactionId ? data.transactionId : "N/A",
      data.amount ? data.amount : "N/A",
      data.currency ? data.currency : "N/A",
      data.receiverUserId?._id ? data.receiverUserId?._id : "N/A",
      `${data.anotherBankDetails?.accountHolderName || "N/A"}`,
      data.receiverBankAccountNumber ? data.receiverBankAccountNumber : "N/A",
      data.anotherBankDetails?.bankName
        ? data.anotherBankDetails?.bankName
        : "N/A",
      data.anotherBankDetails?.swiftCode
        ? data.anotherBankDetails?.swiftCode
        : "N/A",
      data.senderBankAccountNumber ? data.senderBankAccountNumber : "N/A",
      data.status ? data.status : "N/A",
      data.transactionType ? data.transactionType : "N/A",
      formatDateTime(data.timestamp) // Created date
    );

    // Return the row with the key
    return { ...row, key: data._id }; // Use a unique key for each row
  });

  const hasTransactions =
    rows.length > 0 || rows1.length > 0;
  return (
    <>
      <HiddenScrollbarContainer
        sx={{ overflowY: "scroll", width: "100%", height: "100%" }}
      >
        <Typography variant="h5">All Home Bank Transactions</Typography>

        <Box sx={{ marginTop: 3 }}>
          <Paper sx={{ width: "100%", overflow: "hidden", marginBottom: 5 }}>
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                    })} */}
                     {hasTransactions ? (
                    rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                  {/* {rows1
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                    })} */}
                     {hasTransactions ? (
                    rows1
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
    </>
  );
};

export default AllTransactions;
