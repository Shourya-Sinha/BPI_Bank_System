import { Box, Button, Container, Link, Stack, TextField, Typography } from '@mui/material'
import { CaretRight } from 'phosphor-react'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom';
const UserForgotPass = () => {
  return (
    <>
    <Container maxWidth='lg'>
        <Box sx={{marginTop:3}}>
           <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Stack>
                <Typography variant='h3' sx={{color:'#c62828',fontWeight:800}}>BPI</Typography>
            </Stack>

            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Typography variant='body2' component={RouterLink} to={'/app'}>Home</Typography>
                <Typography variant='body2'>Contact Us</Typography>
                <Typography variant='body2'>Privacy Policy</Typography>
            </Stack>
           </Stack>
        </Box>
        <Box sx={{marginTop:5,maxWidth:900,marginX:'auto'}}>
              <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                 <Typography variant='caption'>Login</Typography>
                 <CaretRight />
                 <Typography variant='subtitle2'>Forgot Passowrd</Typography>
              </Stack>

              <Box sx={{boxShadow:3}}>
               
                <Box sx={{borderBottom:'2px solid #ddd',display:'flex',justifyContent:'center'}}>
                    <Typography variant='h3' sx={{fontWeight:800,color:'#c62828'}}>BPI</Typography>
                </Box>
                <Box sx={{maxWidth:600}}>
                <Stack sx={{marginTop:5,paddingX:5}}>
                     <Typography variant='h5' sx={{color:'#233840'}}>Forgot your password?</Typography>
                     <Typography variant='body2' sx={{paddingTop:2,color:'#3D5159'}}>To reset your password, we need some information to verify
                        your identity. If you need further assistance, <Link sx={{color:'#20A39E'}}>contact us</Link>
                     </Typography>
                </Stack>

                <Stack sx={{paddingX:5,marginTop:2,paddingBottom:5}} spacing={2}>
                <TextField
                  fullWidth
                  variant="outlined" // or "filled", "standard"
                  placeholder="Username or Email"
                  autoComplete="off"
                //   value={username}
                //   onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    padding: 0.2, // TextField's internal padding
                    borderRadius: 0.5,
                    fontSize: 16,
                    backgroundColor: "#eeeeee",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // Hide border
                      },
                    },
                  }}
                />

                <Typography variant='h6'>What type of product do you have with us?</Typography>
                <TextField
                  fullWidth
                  variant="outlined" // or "filled", "standard"
                  placeholder="Account No"
                  autoComplete="off"
                //   value={username}
                //   onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    padding: 0.2, // TextField's internal padding
                    borderRadius: 0.5,
                    fontSize: 16,
                    backgroundColor: "#eeeeee",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // Hide border
                      },
                    },
                  }}
                />

                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Typography component={RouterLink} to={'/login'}>Go back to Login</Typography>
                  <Stack sx={{justifyContent:'flex-end'}}>
                  <Button variant='contained' sx={{paddingX:5,borderRadius:0.5}}>SEND REQUEST</Button>
                  </Stack>
                </Stack>
                </Stack>
                </Box>
                
              </Box>
        </Box>
         
    </Container>
    </>
  )
}

export default UserForgotPass