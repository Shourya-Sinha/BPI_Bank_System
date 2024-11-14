import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { East } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  CreteEditedTransaction,
  getALLUserForAdmin,
  getSingleUserForAdmin,
} from "../../../Redux/Admin/AdminFunction";

const HiddenScrollbarContainer = styled("div")({
  overflow: "hidden", // Prevent scrolling
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for webkit browsers
  },
  scrollbarWidth: "none", // Hide scrollbar for Firefox
});

const CredyCardUser = () => {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { getAllUserOfAdmin, getSingleUserData } = useSelector(
    (state) => state.admin || { getAllUserOfAdmin: [], getSingleUserData: {} }
  );
  const [formData, setFormData] = useState({
    userId: selectedUserId,
    title: "",
    description: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    dispatch(getALLUserForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUserId !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: selectedUserId,
      }));
    }
  }, [selectedUserId]);

  // console.log("get single user data for admin in page", getSingleUserData);

  const handleSelectedUser = (userId, e) => {
    e.preventDefault();
    // console.log('selected user id ',userId)
    setSelectedUserId(userId);
    dispatch(getSingleUserForAdmin(userId));
  };

  const hasDataAvailable = getAllUserOfAdmin?.length > 0;

  const userData = getSingleUserData?.user || {};
  const userName =
    userData.firstName && userData.lastName
      ? `${userData.firstName} ${userData.lastName}`
      : "N/A";
  const userEmail = userData.email || "N/A";
  const userBalance = getSingleUserData?.balance || "N/A";

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    console.log("submitted data", formData);
    dispatch(CreteEditedTransaction(formData));
    // setFormData({
    //   userId: selectedUserId,
    //   title: "",
    //   description: "",
    //   amount: "",
    //   date: "",
    // });
  };
  return (
    <>
      <HiddenScrollbarContainer
        sx={{ width: "100%", overflowY: "auto", height: "85vh" }}
      >
        <Typography variant="h5" sx={{ paddingY: 4 }}>
          Edit OR Create History for Each User
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            padding: 2,
            width: "100%",
          }}
        >
          {/* Left Sider UserList */}
          <HiddenScrollbarContainer
            sx={{
              width: "30%",
              boxShadow: 3,
              borderRadius: 2,
              overflowY: "scroll",
              maxHeight: "80vh",
            }}
          >
            <Typography variant="h5" sx={{ padding: 3 }}>
              User List
            </Typography>
            <Divider />
            {hasDataAvailable ? (
              getAllUserOfAdmin.map((user) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={3}
                  key={user._id}
                  padding={1}
                  paddingLeft={2}
                  sx={{
                    borderBottom: "2px solid #ddd",
                    cursor: "pointer",
                    backgroundColor:
                      selectedUserId === user._id ? "#f0f0f0" : "transparent", // Conditional background color
                    "&:hover": {
                      backgroundColor: "#e0e0e0", // Hover effect
                    },
                  }}
                  onClick={(e) => handleSelectedUser(user._id, e)}
                >
                  <Avatar />
                  <Stack>
                    <Typography variant="caption">{`${
                      user?.firstName || "N/A"
                    } ${user?.lastName || "N/A"}`}</Typography>
                    <Typography variant="subtitle2">
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
          </HiddenScrollbarContainer>

          {/* Right Side Create History */}

          <Box sx={{ padding: 2, width: "60%" }}>
            <Stack
              spacing={2}
              sx={{ boxShadow: 2, paddingX: 3, paddingY: 1, borderRadius: 1 }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h6">Selected User</Typography>
                <East />
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Typography variant="caption">
                    User Name - {userName}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="caption">
                    User Email - {userEmail}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="caption">
                    Remaining Balance - {userBalance.toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Typography variant="h5" sx={{ padding: 3 }}>
              Create History
            </Typography>
            <form onSubmit={handleSubmitData}>
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {/* First Row of TextFields */}

                  <Stack spacing={2} sx={{ boxShadow: 1, flexGrow: 1 }}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Transaction Title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      required
                      placeholder="Transaction Description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </Stack>

                  {/* Second Row of TextFields */}
                  <Stack spacing={2} sx={{ boxShadow: 1, flexGrow: 1 }}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Transaction Amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      required
                      placeholder="Transaction Date"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Stack sx={{ marginTop: 5 }}>
              <Button
                variant="contained"
                sx={{ borderRadius: 0.5 }}
                onClick={(e) => handleSubmitData(e)}
              >
                Create Transaction
              </Button>
            </Stack>
            </form>
           
          </Box>
        </Box>
      </HiddenScrollbarContainer>
    </>
  );
};

export default CredyCardUser;
