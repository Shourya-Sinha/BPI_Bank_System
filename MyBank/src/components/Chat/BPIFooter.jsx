import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import Logo from "../../assets/logo.svg";
import { FacebookLogo, InstagramLogo, LinkedinLogo, TwitterLogo, YoutubeLogo } from "phosphor-react";
import Play from '../../assets/playstore.png';
import Apple from '../../assets/Apple_Store.svg';


const BPIFooter = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#5D5D5D",
          borderTop: "4px solid #DCB91C",
        }}
      >
        <Container maxWidth="lg" sx={{marginTop:10}}>
          <Grid container>
            <Grid item xs={12} md={2.5}>
              <Box>
                <img src={Logo} alt="BPI lOGO" />
              </Box>
            </Grid>

            <Grid item xs={12} md={2.5}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "24px",
                    lineHeight: "14px",
                    color: "#fff",
                  }}
                >
                  ABOUT - BPI
                </Typography>
                <ul
                  style={{
                    listStyle: "none",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "38px",
                    cursor: "pointer",
                  }}
                >
                  <li>Who we are</li>
                  <li>Investor Relations</li>
                  <li>Governance</li>
                  <li>News</li>
                  <li>Sustainability</li>
                  <li>Careers</li>
                </ul>
              </Box>
            </Grid>

            <Grid item xs={12} md={2.5}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "24px",
                    lineHeight: "14px",
                    color: "#fff",
                  }}
                >
                  SITE LINKS
                </Typography>
                <ul
                  style={{
                    listStyle: "none",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "38px",
                    cursor: "pointer",
                  }}
                >
                  <li>Data Privacy</li>
                  <li>Financial Consumer Protection</li>
                </ul>
              </Box>
            </Grid>

            <Grid item xs={12} md={4.5}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "24px",
                    lineHeight: "14px",
                    color: "#fff",
                  }}
                >
                  CORPORATE OFFICE
                </Typography>
                <ul
                  style={{
                    listStyle: "none",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    cursor: "pointer",
                  }}
                >
                  <li style={{color:'#dddddd !important',paddingBottom:5}}>Bank of the Phillippines Islands</li>
                  <li style={{color:'#ddd !important'}}>
                    Ayala Triangle Gardens Tower 2, Paseo de Roxas corner Makati
                    Avenue, Makati City 1226{" "}
                  </li>
                </ul>
                <Box sx={{width:'100%'}}>
                   <Stack direction={'row'} alignItems={'center'} spacing={2} sx={{color:'#fff',marginTop:8}}>
                    <Typography sx={{fontSize:'13px',fontWeight:700}}>FOLLOW US</Typography>

                    <FacebookLogo size={30} color="#fff" />
                    <InstagramLogo size={30} color="#fff" />
                    <YoutubeLogo size={30} color="#fff" />
                    <TwitterLogo size={30} color="#fff" />
                    <LinkedinLogo size={30} color="#fff" />
                   </Stack>
                   <Stack direction={'row'} alignItems={'center'} spacing={2} sx={{marginTop:3}}>
                     <img src={Apple} alt="Apple Store" />
                     <img src={Play} alt="Play Store" />
                   </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{borderTop:'1px solid #999'}} py={2} marginTop={8}>
           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography sx={{fontSize:'10px',fontWeight:400,color:'#fff'}}>
            BPI is a proud member of | Deposits are insured by PDIC up to P500,000 per depositor. BPI is regulated by the Bangko Sentral ng Pilipinas https://www.bsp.gov.ph
            </Typography>
            <Typography sx={{fontSize:'10px',fontWeight:400,color:'#fff'}}>© Copyright {new Date().getFullYear()}. All rights reserved.</Typography>
           </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BPIFooter;
