import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UserImage from "../../../assets/user.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../utils/axios";
import { showSnackbar } from "../../../Redux/UserAuth/Auth";
import {
  fetchAdminDetails,
  updateIsLoading,
} from "../../../Redux/Admin/AdminFunction";

const AdminInfo = () => {
  const dispatch = useDispatch();
  const { adminDetails, isAdminLoading } = useSelector(
    (state) => state.admin || {}
  );
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminDetails());
  }, [dispatch]);

  if (!adminDetails) {
    // Fallback while waiting for data to fetch
    return <Typography variant="h6">Loading...</Typography>;
  }

  // Fallback while waiting for data to fetch
  if (!adminDetails) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  // Upload avatar function
  const uploadAvatar = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    dispatch(updateIsLoading({ isAdminLoading: true }));
    try {
      const response = await axios.post("/user/update-image", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(
        showSnackbar({ status: "success", message: response.data.message })
      );
      dispatch(updateIsLoading({ isAdminLoading: false }));
      dispatch(fetchAdminDetails());
      setFile(null);
    } catch (error) {
      dispatch(showSnackbar({ status: "error", message: error.message }));
      console.error("Error uploading avatar", error);
      dispatch(updateIsLoading({ isAdminLoading: false }));
    }
  };

  // Handle file selection change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Box sx={{ padding: 5 }}>
        <Container>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  padding: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <img
                    src={adminDetails.avatar?.secure_url || UserImage}
                    alt="User Image"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: 5,
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ padding: 2 }}>
                <Typography variant="h5">{`${
                  adminDetails.firstName || "First Name"
                } ${adminDetails.lastName || "Last Name"}`}</Typography>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ marginTop: 3 }}
                  spacing={2}
                >
                  <Avatar
                    src={adminDetails.avatar?.secure_url || UserImage}
                    sx={{ width: 70, height: 70 }}
                  />
                  <Stack direction={"column"}>
                    <Typography variant="body2">
                      {adminDetails.firstName || "N/A"}
                    </Typography>
                    {/* <Button
                    onClick={uploadAvatar}
                    variant="outlined"
                    component="label"
                    sx={{
                      borderRadius: "4px",
                      padding: "8px 16px",
                      textTransform: "none",
                      fontWeight: "bold",
                      backgroundColor: "#f0f0f0", // Light background
                      "&:hover": {
                        backgroundColor: "#dcdcdc", // Hover effect
                      },
                    }}
                  >
                   {isAdminLoading ? <CircularProgress /> : 'Change Avatar'}
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange} // This now only changes the file, not triggering upload
                    />
                  </Button> */}
                    <Stack direction={"row"} spacing={2}>
                      <input
                        type="file"
                        onChange={handleFileChange} // This now only changes the file, not triggering upload
                        style={{
                          borderRadius: "5px",
                          border: "1px solid #ccc", // Light gray border
                          padding: "8px 12px",
                          backgroundColor: "#f9f9f9", // Light background
                          fontSize: "14px",
                          cursor: "pointer",
                          width: "auto", // You can set a fixed width if desired
                          outline: "none",
                          transition: "background-color 0.3s ease", // Smooth transition on hover
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#f9f9f9")}
                      />
                      <Button
                        variant="outlined"
                        component="label"
                        sx={{
                          borderRadius: "4px",
                          padding: "8px 16px",
                          textTransform: "none",
                          fontWeight: "bold",
                          backgroundColor: "#f0f0f0", // Light background
                          "&:hover": {
                            backgroundColor: "#dcdcdc", // Hover effect
                          },
                        }}
                        onClick={uploadAvatar}
                      >
                        {isAdminLoading ? <CircularProgress /> : 'Change Avatar'}
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>

                <Box sx={{ width: "100%", marginTop: 2 }}>
                  <Stack sx={{ padding: 2 }} direction={"row"} spacing={2}>
                    <TextField fullWidth
                      placeholder="First Name"
                      value={adminDetails?.firstName || "N/A"}
                    />
                    <TextField fullWidth
                      placeholder="Last Name"
                      value={adminDetails?.lastName || "N/A"}
                    />
                  </Stack>
                  <Stack sx={{ padding: 2 }} direction={"row"} spacing={2}>
                    <TextField fullWidth
                      placeholder="E-mail address"
                      value={adminDetails?.email || "N/A"}
                    />
                    <TextField fullWidth
                      placeholder="Phone No."
                      value={adminDetails?.phoneNo || "N/A"}
                    />
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight: 11,
                    }}
                  >
                    <Button variant="contained">Update Details</Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AdminInfo;
