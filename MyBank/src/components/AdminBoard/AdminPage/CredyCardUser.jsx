import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
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
import { Delete, East } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  CreteCreditEditedTransaction,
  CreteEditedTransaction,
  deleteUserData,
  getALLUserForAdmin,
  getSingleUserForAdmin,
} from "../../../Redux/Admin/AdminFunction";
import { CaretDown, CaretUp } from "phosphor-react";

const HiddenScrollbarContainer = styled("div")({
  overflow: "hidden", // Prevent scrolling
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for webkit browsers
  },
  scrollbarWidth: "none", // Hide scrollbar for Firefox
});

const CredyCardUser = () => {
  const dispatch = useDispatch();
  const [collapase, setCollapsed] = useState();
  const [collapase1, setCollapsed1] = useState();
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

  const [formData1, setFormData1] = useState({
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

      setFormData1((prevFormData) => ({
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
    userData?.firstName && userData?.lastName
      ? `${userData?.firstName} ${userData?.lastName}`
      : "N/A";
  const userEmail = userData?.email || "N/A";
  const userBalance = getSingleUserData?.balance || "N/A";

  const handleInputChange = (e, formName) => {
    const { name, value } = e.target;

    if (formName === "formData") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (formName === "formData1") {
      setFormData1((prevFormData1) => ({
        ...prevFormData1,
        [name]: value,
      }));
    }
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

  const handleSubmitData2 = (e) => {
    e.preventDefault();
    // console.log("submitted data for formData1", formData1);
    dispatch(CreteCreditEditedTransaction(formData1));

    // Reset form data after submission
    setFormData1({
      userId: selectedUserId,
      title: "",
      description: "",
      amount: "",
      date: "",
    });
  };

  const handleCollapseSate = () => {
    setCollapsed((prev) => !prev);
  };
  const handleCollapseSate1 = () => {
    setCollapsed1((prev) => !prev);
  };
  const handleDeleteUser=(userId)=>{
    dispatch(deleteUserData(userId));
  }
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ paddingY: 4 }}>
          Edit OR Create History for Each User
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            // alignItems: "center",
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
              maxHeight: "70vh",
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
                  spacing={1}
                  key={user._id}
                  padding={1}
                  // paddingLeft={2}
                  paddingX={3}
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
                  <Avatar>
                    {user?.firstName && user?.lastName
                      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() // Generate initials
                      : "N/A"}{" "}
                    {/* Default text if no name */}
                  </Avatar>
                  <Stack sx={{ width: "100%", paddingRight: 3 }}>
                    <Typography variant="caption">{`${
                      user?.firstName || "N/A"
                    } ${user?.lastName || "N/A"}`}</Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        wordWrap: "break-word", // Allows text to wrap within the container
                        overflow: "hidden", // Ensures it won't overflow
                        textOverflow: "ellipsis", // Adds ellipsis for overflowed text (optional)
                        maxWidth: "100%", // Ensures the email doesn't exceed the container's width
                      }}
                    >
                      {user?.email || "N/A"}
                    </Typography>
                  </Stack>
                  <Stack>
                    <IconButton onClick={()=>handleDeleteUser(user._id)}>
                      <Delete sx={{color:'#e53935'}} />
                    </IconButton>
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

          <HiddenScrollbarContainer
            sx={{ width: "60%", height: "70vh", overflowY: "scroll" }}
          >
            <Box sx={{ padding: 2, width: "100%" }}>
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
                      Remaining Balance -&gt;{" "}
                      {typeof userBalance === "number" && !isNaN(userBalance)
                        ? userBalance.toFixed(2)
                        : "N/A"}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={5}>
                <Typography variant="h5" sx={{ padding: 3 }}>
                  Create Debit History
                </Typography>

                <IconButton onClick={handleCollapseSate}>
                  {collapase ? <CaretDown /> : <CaretUp />}
                </IconButton>
              </Stack>

              <Collapse in={collapase}>
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
                          onChange={(e) => handleInputChange(e, "formData")}
                        />
                        <TextField
                          fullWidth
                          required
                          placeholder="Transaction Description"
                          name="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange(e, "formData")}
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
                          onChange={(e) => handleInputChange(e, "formData")}
                        />
                        <TextField
                          fullWidth
                          required
                          placeholder="Transaction Date"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange(e, "formData")}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Stack sx={{ marginTop: 5 }}>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: 0.5 }}
                      type="submit"
                    >
                      Create Transaction
                    </Button>
                  </Stack>
                </form>
              </Collapse>
            </Box>
            <Box sx={{ width: "100%", marginTop: 3, marginBottom: 3 }}>
              <Divider> OR </Divider>
            </Box>

            <Box sx={{ padding: 2, width: "100%" }}>
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
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={5}>
                <Typography variant="h5" sx={{ padding: 3 }}>
                  Create Credit History
                </Typography>
                <IconButton onClick={handleCollapseSate1}>
                  {collapase1 ? <CaretDown /> : <CaretUp />}
                </IconButton>
              </Stack>
              <Collapse in={collapase1}>
                <form onSubmit={handleSubmitData2}>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Stack spacing={2} sx={{ boxShadow: 1, flexGrow: 1 }}>
                        <TextField
                          fullWidth
                          required
                          placeholder="Transaction Title"
                          name="title"
                          value={formData1.title}
                          onChange={(e) => handleInputChange(e, "formData1")}
                        />
                        <TextField
                          fullWidth
                          required
                          placeholder="Transaction Description"
                          name="description"
                          value={formData1.description}
                          onChange={(e) => handleInputChange(e, "formData1")}
                        />
                      </Stack>

                      <Stack spacing={2} sx={{ boxShadow: 1, flexGrow: 1 }}>
                        <TextField
                          fullWidth
                          required
                          placeholder="Transaction Amount"
                          name="amount"
                          value={formData1.amount}
                          onChange={(e) => handleInputChange(e, "formData1")}
                        />
                        <TextField
                          fullWidth
                          required
                          placeholder="Transaction Date"
                          type="date"
                          name="date"
                          value={formData1.date}
                          onChange={(e) => handleInputChange(e, "formData1")}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Stack sx={{ marginTop: 5 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ borderRadius: 0.5 }}
                    >
                      Create Transaction
                    </Button>
                  </Stack>
                </form>
              </Collapse>
            </Box>
          </HiddenScrollbarContainer>
        </Box>
      </Box>
    </>
  );
};

export default CredyCardUser;
