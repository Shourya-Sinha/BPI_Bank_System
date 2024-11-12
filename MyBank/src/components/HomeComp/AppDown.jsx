import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react';
import images from '../../assets/bpidown.jpg';
import { ArrowUpRight } from 'phosphor-react';
import { Link } from 'react-router-dom';

const AppDown = () => {
  return (
    <>
{/* <Container maxWidth="lg">
  <Box sx={{ display: 'flex', width: '100%', minHeight: '454px', position: 'relative' }}>
    
    <Box
      sx={{
        width: '50%',         // Take 40% width for the content box
        paddingLeft: '8%',
        marginRight: '-20%',  // Negative margin to overlap into the right side
        display: 'flex',
        alignItems: 'center',
        zIndex: 2,
        paddingTop:10
      }}
    >
      <Box 
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0 20px 70px 0 #1A1A1A14',
          padding: '30px',
          borderRadius: '8px',
          height:'470px',
          paddingTop:10
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '39px', marginTop: '16px' }}>
          Download the BPI app now
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: '20px', marginTop: '8px' }}>
          Available on the App Store, Google Play Store, and AppGallery.
        </Typography>
        <Button
        component={Link}
        to='/maintain'
          sx={{
            background: 'white',
            borderColor: 'white',
            color: '#b11116',
            marginTop: 5,
            marginLeft:5,
            padding:3,
            '&:hover':{
              backgroundColor: '#b11116',
              color: '#ffffff',
            }
          }}
          endIcon={<ArrowUpRight style={{paddingLeft:3}} size={25} />}
        >
          DOWNLOAD NOW
        </Button>
      </Box>
    </Box>
    
    <Box
      sx={{
        width: '70%',             // Take 60% width for the image box
        position: 'relative',      // To contain the image within this section
        display: 'flex',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
            paddingTop:'8%',
          width: '100%', 
          maxHeight: '75%', 
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <img
          src={images}
          alt="Right Image"
          style={{
            width: '100%',    // Full width within the 60% container
            height: '100%',   // Full height within the 60% container
            objectFit: 'cover',
            borderRadius: '16px',
          }}
        />
      </Box>
    </Box>
  </Box>
</Container> */}
<Container maxWidth="lg">
  <Box sx={{ display: 'flex', width: '100%', minHeight: '454px', position: 'relative' }}>
    
    {/* Left Content Box */}
    <Box
      sx={{
        width: '50%',         // Take 40% width for the content box
        paddingLeft: '8%',
        marginRight: '-20%',  // Negative margin to overlap into the right side
        display: 'flex',
        alignItems: 'center',
        zIndex: 2,
        paddingTop:10
      }}
    >
      <Box 
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0 20px 70px 0 #1A1A1A14',
          padding: '30px',
          borderRadius: '8px',
          height:'470px',
          paddingTop:10
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "clamp(15px, 2vw, 39px)", marginTop: '16px' }}>
          Download the BPI app now
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: "clamp(17px, 2vw, 20px)", marginTop: '8px' }}>
          Available on the App Store, Google Play Store, and AppGallery.
        </Typography>
        <Button
        component={Link}
        to='/maintain'
          sx={{
            background: 'white',
            borderColor: 'white',
            color: '#b11116',
            marginTop: 5,
            marginLeft:5,
            padding:3,
            '&:hover':{
              backgroundColor: '#b11116',
              color: '#ffffff',
            }
          }}
          endIcon={<ArrowUpRight style={{paddingLeft:3}} size={25} />}
        >
          DOWNLOAD NOW
        </Button>
      </Box>
    </Box>
    
    {/* Right Image Box */}
    <Box
      sx={{
        width: '70%',             // Take 60% width for the image box
        position: 'relative',      // To contain the image within this section
        display: 'flex',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
            paddingTop:'8%',
          width: '100%', 
          maxHeight: '75%', 
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <img
          src={images}
          alt="Right Image"
          style={{
            width: '100%',    // Full width within the 60% container
            height: '100%',   // Full height within the 60% container
            objectFit: 'cover',
            borderRadius: '16px',
          }}
        />
      </Box>
    </Box>
  </Box>
</Container>

    </>
  )
}

export default AppDown