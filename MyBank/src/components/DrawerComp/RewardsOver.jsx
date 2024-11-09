import React from 'react';
import Personal from '../../assets/resize.jpg'; 
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { ArrowRight, CaretRight } from 'phosphor-react';
import { Link } from 'react-router-dom';

const RewardsOver = () => {
  return (
    <Container maxWidth={"lg"}>
    {/* <Header2 /> */}

    <Box sx={{ marginTop: 10 }}>
      <Stack direction={"row"} alignItems={"center"}>
        <Typography variant="h3" fontWeight={700} sx={{ paddingRight: 5 }}>
          Rewards and Promotions overview
        </Typography>

        <ArrowRight size={30} color="#b11116" />
      </Stack>
      <Typography variant="body2" sx={{ marginBottom: 5 }}>
      Rewards made easy.
      </Typography>

      <Box width={"100%"}>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Box sx={{ padding: 2 ,display:'flex',flexDirection:'row',alignItems:'center'}}>
              <Typography
                variant="h6"
                color={"#000"}
               paddingRight={2}
               component={Link}
                to={'/maintain'}
                sx={{textDecoration:'none',"&:hover":{textDecoration:'underline'}}}
              >
               BPI Rewards
              </Typography>
             
             <CaretRight style={{color:'#b11116'}} />
            </Box>
          </Grid>

          <Grid item xs={12} md={2.5}>
          <Box sx={{ padding: 2,display:'flex',flexDirection:'row',alignItems:'center' }}>
              <Typography
                variant="h6"
                color={"#000"}
                paddingRight={2}
                component={Link}
                to={'/maintain'}
                sx={{textDecoration:'none',"&:hover":{textDecoration:'underline'}}}
              >
               BPI Promos
              </Typography>
             
             <CaretRight style={{color:'#b11116'}} />
            </Box>
          </Grid>

          <Grid item xs={12} md={2.5}>

          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ padding: 2 }}>
              <img
                src={Personal}
                alt="Personal Banking Image"
                style={{ borderRadius: 10 }}
              />
              <Typography
                variant="body2"
                sx={{ paddingTop: 3, paddingBottom: 3 }}
              >
              Your new one-stop app for everyday cashless transactions and rewards.
              </Typography>

              <a
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "underline",
                  paddingTop: 2,
                }}
              >
                Learn more
              </a>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  )
}

export default RewardsOver