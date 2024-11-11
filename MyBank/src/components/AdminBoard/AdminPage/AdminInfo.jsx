import React, { useEffect, useState } from "react";
import {
  Alert,
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
import { showSnackbar, UpdateDetails } from "../../../Redux/UserAuth/Auth";
import {
  fetchAdminDetails,
  updateIsLoading,
} from "../../../Redux/Admin/AdminFunction";

const AdminInfo = () => {
  const [isloading,setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { adminDetails, isAdminLoading } = useSelector(
    (state) => state.admin || {}
  );
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (adminDetails) {
      setFormData({
        firstName: adminDetails.firstName || "",
        lastName: adminDetails.lastName || "",
        phoneNo: adminDetails.phoneNo || "",
      });
    }
  }, [adminDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);

      const response = await UpdateDetails(formData);
    // console.log('response data in page',formData);
      if (response.status === "success") {
        console.log("Details updated successfully:", response.data);
        // Optionally update local state with the new data
        setFormData({
          ...formData,// update with latest data if needed
        });
        
      }
      <Alert type="success" message="Deatils Update Successfully" />
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to update details:", error);
      setIsLoading(false);
    }
  };

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
                      name="firstName"
                      onChange={handleInputChange}
                      // value={adminDetails?.firstName || "N/A"}
                      value={formData.firstName}
                    />
                    <TextField fullWidth
                    name='lastName'
                      placeholder="Last Name"
                      onChange={handleInputChange}
                      // value={adminDetails?.lastName || "N/A"}
                      value={formData.lastName}
                    />
                  </Stack>
                  <Stack sx={{ padding: 2 }} direction={"row"} spacing={2}>
                    <TextField fullWidth
                    disabled
                      placeholder="E-mail address"
                      value={adminDetails?.email || "N/A"}
                    />
                    <TextField fullWidth
                      placeholder="Phone No."
                      name="phoneNo"
                      onChange={handleInputChange}
                      // value={adminDetails?.phoneNo || "N/A"}
                      value={formData.phoneNo}
                    />
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight: 11,
                    }}
                  >
                    <Button variant="contained" onClick={handleUpdate}>{isloading ? <CircularProgress /> :"Update Details"}</Button>
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
