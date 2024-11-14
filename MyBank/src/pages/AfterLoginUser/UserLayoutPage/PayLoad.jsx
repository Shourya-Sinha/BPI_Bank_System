import React, { useEffect, useState } from "react";
import MaintainImage from "../../../assets/maintan.png";
import { Box, Button, CircularProgress, Collapse, Container, IconButton, Paper, Stack, styled, Table,TableBody ,TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DepositeRequestAmount, GetDepositeRequest } from "../../../Redux/UserAuth/Auth";
import { Calendar, CaretDown, EyeSlash } from "phosphor-react";
import { EmojiEmotions } from "@mui/icons-material";


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

const PayLoad = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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

  useEffect(() => {
    dispatch(GetDepositeRequest());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeposite = (e) => {
    e.preventDefault();
    // console.log('formValues deposit',formValues);
    dispatch(DepositeRequestAmount(formValues))
  };

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

  return (
    <>
      <HiddenScrollbarContainer sx={{height:'85vh'}}>
        <Box sx={{ textAlign: "left", padding: 3 }}>
          <Box>
            <Typography variant="subtitle2">Send Request For Admin To Deposite Money in your Bank</Typography>
          </Box>
        </Box>

        <Box sx={{marginTop:5}}>
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
        </Box>

        <Box sx={{marginTop:5}}>
          <Stack>
            <Typography variant="h6">Transactions Details</Typography>
          </Stack>
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

        </Box>
      </HiddenScrollbarContainer>
    </>
  );
};

export default PayLoad;
