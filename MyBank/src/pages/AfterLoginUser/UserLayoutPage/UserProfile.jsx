import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography, Avatar, styled,Input, CircularProgress, Stack } from "@mui/material";
import { GetMyDetails, UpdateDetails, uploadUserAvatar } from "../../../Redux/UserAuth/Auth";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Alert } from "antd";
const HiddenScrollbarContainer = styled("div")({
    overflow: "hidden", // Prevent scrolling
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for webkit browsers
    },
    scrollbarWidth: "none", // Hide scrollbar for Firefox
  });

  const ProfileContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  }));
  
  const ProfileImageContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }));
  
  const ProfileDetailsContainer = styled(Grid)(({ theme }) => ({
    flex: 1,
    marginLeft: "20px",
  }));
  
  const ImagePreview = styled(Avatar)(({ theme }) => ({
    width: "150px",
    height: "150px",
    borderRadius: "50%",
  }));

  const formatBalance = (balance) => {
    return balance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

const UserProfile = () => {
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state)=>state.auth);
    const [userDetails, setUserDetails] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName:'',
        email: "",
        phoneNo: "",
        dateOfBirth:"",
        gender:"",
        profileImage: "https://via.placeholder.com/150", // Placeholder image
        bankAccount: "",
        balance: "",
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setIsLoading(true);
        if (file) {
          try {
            // Call API to upload avatar
            const response = await uploadUserAvatar(file);
            if (response.status === 'success') {
              // Update profile image in formData with new avatar URL
              setFormData({
                ...formData,
                profileImage: response?.data?.avatar?.secure_url,
              });
              setIsLoading(false);
            }
          } catch (error) {
            console.error("Failed to upload avatar:", error);
            setIsLoading(false);
          }
        }
      };
    
      const handleUpdate = async () => {
        try {
          setIsLoading(true);

          const filteredData = Object.fromEntries(
            Object.entries(formData).filter(
              ([key, value]) =>
                value && value !== "N/A" && (key !== 'dateOfBirth' || moment(value, 'YYYY-MM-DD', true).isValid())
            )
          );
      
          // Optional: Convert `dateOfBirth` to a date object or null if it's empty
          if (filteredData.dateOfBirth) {
            filteredData.dateOfBirth = moment(filteredData.dateOfBirth, 'YYYY-MM-DD').toDate();
          }

          const response = await UpdateDetails(filteredData);
        // console.log('response data in page',formData);
          if (response.status === "success") {
            console.log("Details updated successfully:", response.data);
            // Optionally update local state with the new data
            setFormData({
              ...formData,
                 dateOfBirth:response.data.dateOfBirth, // update with latest data if needed
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
        const fetchUserDetails = async () => {
          try {
            const details = await GetMyDetails();
            // Set user details state
            setUserDetails(details?.data ? details?.data : "N/A");
    
            // Set formData based on the response
            setFormData({
              firstName:details?.data?.user?.firstName,
              lastName:details?.data?.user?.lastName,
              email: details?.data?.user?.email ? details?.data?.user?.email : 'N/A',
              phoneNo: details?.data?.user?.phoneNo ? details?.data?.user?.phoneNo : 'N/A',
              profileImage: details?.data?.user?.avatar?.secure_url ? details?.data?.user?.avatar?.secure_url :"https://via.placeholder.com/150",
              bankAccount: details?.data?.bankAccount?.accountNumber ? details?.data?.bankAccount?.accountNumber :'N/A',
              balance: formatBalance(details?.data?.bankAccount?.balance ? details?.data?.bankAccount?.balance : 'N/A'),
              gender: details?.data?.user?.gender,
              dateOfBirth: formatDate(details?.data?.user?.dateOfBirth)
            });
          } catch (error) {
            console.error("Failed to fetch user details:", error);
          }
        };
    
        fetchUserDetails();
      }, []); // Empty dependency array so it runs only once on mount
    
      console.log("Fetching user details",userDetails);
      if (!userDetails) {
        return (
          <div>
            <CircularProgress sx={{ fontSize: 40 }} /> Loading...
          </div>
        );
      }


  return (
    <>
    <HiddenScrollbarContainer sx={{width:'100%',height:'100%',overflowY:'scroll'}}>
        <Typography variant='h5'>My Profile</Typography>

        <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Profile Details
        </Typography>

        <ProfileContainer container spacing={3}>
          {/* Left side: Image & Upload Button */}
          <ProfileImageContainer item xs={12} md={6}>
            <ImagePreview
              src={formData.profileImage}
              alt="Profile Picture"
            />
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleImageUpload}
              sx={{ marginTop: 2 }}
            />
            <Button variant="outlined" component="label" sx={{ marginTop: 2 }}>
             {isloading ? <CircularProgress /> : ' Upload Image'}
            </Button>
          </ProfileImageContainer>

          {/* Right side: User Details */}
          <ProfileDetailsContainer item xs={12} md={6}>
           <Stack direction={'row'} alignItems={'center'} spacing={2} sx={{paddingBottom:2}}>
           <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
             <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
           </Stack>
            <TextField
              label="Email"
              name="email"
              disabled
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
             <Stack direction={'row'} alignItems={'center'} spacing={1} sx={{paddingBottom:2}}>
             <TextField
              label="Phone Number"
              name="phoneNo"
              onChange={handleInputChange}
              value={formData.phoneNo}
              fullWidth
              sx={{ marginBottom: 2 }}
            /> <TextField
            label="Gender"
            name="gender"
            onChange={handleInputChange}
            value={formData.gender}
            fullWidth
            sx={{ marginBottom: 2 }}
          /> <TextField
          label="Date of Birth"
          name="dateOfBirth"
           type="date"
          onChange={handleInputChange}
          value={formData.dateOfBirth}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
             </Stack>
           
            <TextField
              label="Bank Account Number"
              fullWidth
              disabled
              value={formData.bankAccount}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Balance"
              value={formData.balance}
              fullWidth
              disabled
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              sx={{ marginTop: 2 }}
            >
              {isloading ? <CircularProgress /> :'Update Details'}
            </Button>
          </ProfileDetailsContainer>
        </ProfileContainer>
      </Paper>
    </Box>
    </HiddenScrollbarContainer>
    </>
  )
}

export default UserProfile