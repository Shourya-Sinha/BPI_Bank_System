import React from 'react';
import Maintain from '../../assets/maintan.jpg';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Maintanance = () => {
  return (
    <>
        {/* <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
      padding: '20px',
    }}
  >
    <img
      src={Maintain} // Use a relevant image
      alt="Under Maintenance"
      style={{ width: '200px', marginBottom: '20px' }} // Image styles
    />
    <Typography variant="h4" gutterBottom>
      Under Maintenance
    </Typography>
    <Typography variant="body1" gutterBottom>
     We are currently making some improvements. Please check back later!
    </Typography>
    <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/app" // This is where you want to redirect
        sx={{ marginTop: '30px' }}
      >
        Go to Home
      </Button>
  </Box> */}
      <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
      padding: '20px',
    }}
  >
    <img
      src={Maintain} // Use a relevant image
      alt="Under Maintenance"
      style={{ width: '200px', marginBottom: '20px' }} // Image styles
    />
    <Typography variant="h4" gutterBottom>
      Under Maintenance
    </Typography>
    <Typography variant="body1" gutterBottom>
     We are currently making some improvements. Please check back later!
    </Typography>
    <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/app" // This is where you want to redirect
        sx={{ marginTop: '30px' }}
      >
        Go to Home
      </Button>
  </Box>
    </>

  )
}

export default Maintanance