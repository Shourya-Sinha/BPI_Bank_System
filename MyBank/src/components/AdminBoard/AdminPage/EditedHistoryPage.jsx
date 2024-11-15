import { Avatar, Box, Grid, IconButton, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserEditedDataHistory, getALLUserForAdmin, getUserEditedDataHistory } from '../../../Redux/Admin/AdminFunction';
import { Delete } from '@mui/icons-material';
import axiosInstance from '../../../utils/axios';


const HiddenScrollbarContainer = styled("div")({
  overflow: "hidden", // Prevent scrolling
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for webkit browsers
  },
  scrollbarWidth: "none", // Hide scrollbar for Firefox
});

const EditedHistoryPage = () => {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [remainBalance, setRemainBalance] = useState();
  const { getAllUserOfAdmin,getUserEditedDat } = useSelector(
    (state) => state.admin || { getAllUserOfAdmin: [],getUserEditedDat:[] }
  );

  useEffect(() => {
    dispatch(getALLUserForAdmin());
  }, [dispatch]);

  useEffect(()=>{
    if(selectedUserId){
      const user = getAllUserOfAdmin.find(user=>user._id === selectedUserId);
      setRemainBalance(user?.balance);
    }
  });

  useEffect(() => {
    if (selectedUserId) {
      const user = getAllUserOfAdmin.find(user => user._id === selectedUserId);
      setRemainBalance(user?.balance || 0);
      dispatch(getUserEditedDataHistory(selectedUserId)); // Fetch edited data for the selected user
    } else {
      setRemainBalance(null); // Clear balance if no user is selected
      dispatch(getUserEditedDataHistory(null)); // Clear edited data if no user is selected
    }
  }, [selectedUserId, getAllUserOfAdmin, dispatch]);


  const hasDataAvailable = getAllUserOfAdmin?.length > 0;

  const handleFetchUserDat = (userid) => {
    setSelectedUserId(userid); // Set the selected user ID
  };

  // console.log('get details edited data',getUserEditedDat);

  const hasEditedData = Array.isArray(getUserEditedDat) && getUserEditedDat.length > 0;

  const handleDeleteEditedHistory=async(userId,editedHistoryId)=>{
    // console.log('delete edited history',userId,editedHistoryId);
     dispatch(deleteUserEditedDataHistory(userId,editedHistoryId));
     dispatch(getUserEditedDataHistory(userId));
  }


  return (
    <>
    <Box sx={{width:'100%'}}>
          <Grid container spacing={2}>
            {/* Left Side */}
            <Grid item xs={12} md={3}> 
               <Box sx={{padding:2,boxShadow:2,paddingBottom:8}}>
                   <Typography variant='h6'>User List</Typography>
                   <Stack sx={{paddingX:2}}>
                   {hasDataAvailable ? (
              getAllUserOfAdmin.map((user) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  key={user._id}
                  padding={1}
                  // paddingLeft={2}
                  paddingBottom={2}
                  sx={{
                    borderBottom: "2px solid #ddd",
                    cursor: "pointer",
                    backgroundColor:
                      selectedUserId === user._id ? "#f0f0f0" : "transparent", // Conditional background color
                    "&:hover": {
                      backgroundColor: "#e0e0e0", // Hover effect
                    },
                  }}
                  onClick={(e) => handleFetchUserDat(user._id, e)}
                >
                  <Avatar />
                  <Stack sx={{width:'100%',paddingX:3}}>
                    <Typography variant="caption">{`${
                      user?.firstName || "N/A"
                    } ${user?.lastName || "N/A"}`}</Typography>
                    <Typography variant="subtitle2" sx={{
        wordWrap: "break-word", // Allows text to wrap within the container
        overflow: "hidden", // Ensures it won't overflow
        textOverflow: "ellipsis", // Adds ellipsis for overflowed text (optional)
        maxWidth: "100%", // Ensures the email doesn't exceed the container's width
      }}>
                      {user?.email || "N/A"}
                    </Typography>
                  </Stack>
                </Stack>
              ))
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 2 }}
              >
                <Typography>No data available</Typography>
              </Stack>
            )}
                   </Stack>
                  
               </Box>
            </Grid>


            {/* Right Side */}
            <Grid item xs={12} md={9}>
      <HiddenScrollbarContainer sx={{ width: '100%',height:'85vh',paddingX:2,overflowY:'scroll' }}>
        <TableContainer component={Paper} sx={{ width: '100%', marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" >Date</TableCell>
                <TableCell align="left" >Name</TableCell>
                <TableCell align="right" >Debit/Credit</TableCell>
                <TableCell align="left" >Running balance</TableCell>
                <TableCell align="right" >Edit</TableCell>
              </TableRow>
            </TableHead>
           
            <TableBody>
                    {selectedUserId && (
                      <>
                        {hasEditedData ? (
                          getUserEditedDat.map((history) => (
                            <TableRow key={history._id} >
                              {/* Date Column */}
                              <TableCell align="left">{new Date(history.editedTimestamp).toLocaleDateString() || 'Unknown'}</TableCell>
                              
                              {/* Name Column */}
                              <TableCell align="left">
                                <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                                  {history.title || 'User'}
                                </Typography>
                                <Typography variant="caption" sx={{ textAlign: 'left' }}>
                                  {history.description || 'Edited Title'}
                                </Typography>
                              </TableCell>
                              
                              {/* Debit/Credit Column */}
                              <TableCell align="right">
                                <Typography sx={{ textAlign: 'right' }}>
                                {history?.transType === "debit"
    ? `-PHP ${history.editedAmount || "N/A"}`
    : history?.editedAmount.toFixed(2)
    ? `PHP ${history.editedAmount.toFixed(2)}`
    : "PHP N/A"}
                                  {/* {`- PHP ${history.editedAmount.toFixed(2)}`} */}
                                </Typography>
                              </TableCell>
                              
                              {/* Running Balance Column */}
                              <TableCell align="left">
                                <Typography sx={{ textAlign: 'left' }}>
                                  {remainBalance ? remainBalance.toFixed(2) : 'N/A'}
                                </Typography>
                              </TableCell>
                              <TableCell align='right'>
                                <IconButton onClick={() => handleDeleteEditedHistory(selectedUserId, history._id)}>
                                  <Delete sx={{color:'#B30018'}} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} align="center">
                              <Typography variant="body2" color="textSecondary">
                                No edited data available for this user.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    )}
                  </TableBody>
           
          </Table>
        </TableContainer>
      </HiddenScrollbarContainer>
    </Grid>
          </Grid>
    </Box>
    </>
  )
}

export default EditedHistoryPage