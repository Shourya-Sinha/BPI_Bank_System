import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Box, Stack, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {FormatListBulleted} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../../Redux/Admin/AdminFunction';
import { updateAccStatus } from '../../../Redux/UserAuth/Auth';


const HiddenScrollbarContainer = styled("div")({
  overflow: "hidden", // Prevent scrolling
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for webkit browsers
  },
  scrollbarWidth: "none", // Hide scrollbar for Firefox
});

const BankUsers = () => {
  const userList = useSelector((state) => state.admin?.userList || []);
  const recentUsers = useSelector((state) => state.admin?.recentUsers || []);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllUser());
  },[dispatch]);
  const [status, setStatus] = useState(userList?.bankDetails?.isAccountPending || 'N/A');

  const handleStatusChange = async (e, userId) => {
    const newStatus = e.target.value;
    setStatus(newStatus); // Update the status in local state for local UI
  
    // console.log('Updating status:', { userId, status: newStatus });
  
    // Dispatch the action to update status on the server
    dispatch(updateAccStatus({ userId, status: newStatus }));
  };

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },

    {
      id: 'block',
      label: 'Blocked.',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'verified',
      label: 'Verified',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'accNo',
      label: 'Account No.',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'balance',
      label: 'Balance',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'accType',
      label: 'Account Type',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'accverified',
      label: 'Acc Verified',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'verifyDoc',
      label: 'Verification Doc',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'accstatus',
      label: 'Acc Status',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'accpending',
      label: 'Change Status',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'created',
      label: 'Created',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  
  function createData(name, email, block, verified, accNo, balance, accType, accverified,verifyDoc,accstatus, accpending, created) {
    return {name, email, block, verified, accNo, balance, accType, accverified,verifyDoc,accstatus, accpending, created };
  }
  
  const rows = userList.map((data) => {
    const row = createData(
      `${data.firstName || "N/A"} ${data.lastName || "N/A"}`, // Full name
      data.email, // Email of the user
      data.isBlocked ? "Blocked" : "Active", // Block status
      data.isVerified ? "Verified" : "Unverified", // Verification status
      data.bankDetails?.accountNumber || 'N/A', // Account number
      data.bankDetails?.balance || 'N/A', // Account balance
      data.bankDetails?.accountType || 'N/A', // Account type
      data.bankDetails?.isVerifiedAccount ? "Verified" : 'UnVerified' || 'N/A',
      data.bankDetails?.accountVerificationDocuments?.[0]?.documentUrl ? (
        <a
          href={data.bankDetails.accountVerificationDocuments[0].documentUrl.secure_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {data.bankDetails.accountVerificationDocuments[0].documentType || 'View Document'}
        </a>
      ) : 'N/A',  // Verification document
      data.bankDetails?.isAccountPending || 'N/A', // Account verification status
      data.bankDetails?.accountNumber ? (
        <div style={{ marginTop: "10px" }}>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e, data._id)}
            style={{ marginLeft: "10px" }}
          >
            <option value="Pending">Pending</option>
            <option value="Working">Working</option>
            <option value="Verified">Verified</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      ) : (
        <span>N/A</span>
      ),
      // Account pending status
      new Date(data.createdAt).toLocaleDateString('en-CA') || 'N/A'  // Created date
    );
  
    // Return the row with the key
    return { ...row, key: data._id }; // Use a unique key for each row
  });

  const rows2 = recentUsers.map((data) => {
    const row = createData(
      `${data.firstName || "N/A"} ${data.lastName || "N/A"}`, // Full name
      data.email, // Email of the user
      data.isBlocked ? "Blocked" : "Active", // Block status
      data.isVerified ? "Verified" : "Unverified", // Verification status
      data.bankDetails?.accountNumber || 'N/A', // Account number
      data.bankDetails?.balance || 'N/A', // Account balance
      data.bankDetails?.accountType || 'N/A', // Account type
      data.bankDetails?.isVerifiedAccount ? "Verified" : 'UnVerified' || 'N/A',
      data.bankDetails?.accountVerificationDocuments?.[0]?.documentUrl ? (
        <a
          href={data.bankDetails.accountVerificationDocuments[0].documentUrl.secure_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {data.bankDetails.accountVerificationDocuments[0].documentType || 'View Document'}
        </a>
      ) : 'N/A',
      data.bankDetails?.isAccountPending || 'N/A', 
      data.bankDetails?.accountNumber ? (
        <div style={{ marginTop: "10px" }}>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e, data._id)}
            style={{ marginLeft: "10px" }}
          >
            <option value="Pending">Pending</option>
            <option value="Working">Working</option>
            <option value="Verified">Verified</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      ) : (
        <span>N/A</span>
      ),
      new Date(data.createdAt).toLocaleDateString('en-CA') || 'N/A'  // Created date
    );
  
    // Return the row with the key
    return { ...row, key: data._id }; // Use a unique key for each row
  });
  

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <HiddenScrollbarContainer sx={{width:'100%',height:'100%',overflowY:'scroll'}}>
      <Stack direction={'row'} alignItems={'center'} spacing={4}>
      <Typography variant='h4' color='#000'>All Users List</Typography>

      <FormatListBulleted />
      </Stack>


       <Box sx={{marginTop:5}}>
        <Typography variant='h6'>Current Joined Users</Typography>
        {/* List */}
        <Box sx={{marginTop:3}}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
          {rows2.length === 0 ? (
    <TableRow>
      <TableCell colSpan={columns.length} align="center">
        <span role="img" aria-label="weeping emoji" style={{ fontSize: '2rem' }}>
          😭
        </span>
        <p>No data available</p>
      </TableCell>
    </TableRow>
  ) : (
    rows2
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
          {columns.map((column) => {
            const value = row[column.id];
            return (
              <TableCell key={column.id} align={column.align}>
                {column.format && typeof value === 'number'
                  ? column.format(value)
                  : value}
              </TableCell>
            );
          })}
        </TableRow>
      ))
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

       <Box sx={{marginTop:5}}>
        <Typography variant='h6'>All Previous Users</Typography>
        {/* List */}
        <Box sx={{marginTop:3}}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
          {rows.length === 0 ? (
    <TableRow>
      <TableCell colSpan={columns.length} align="center">
        <span role="img" aria-label="weeping emoji" style={{ fontSize: '2rem' }}>
          😭
        </span>
        <p>No data available</p>
      </TableCell>
    </TableRow>
  ) : (
    rows
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {column.format && typeof value === 'number'
                    ? column.format(value)
                    : value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })
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
  )
}

export default BankUsers