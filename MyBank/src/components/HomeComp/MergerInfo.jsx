import React from "react";

import Image1 from "../../assets/imge1.jpg";
import Image2 from "../../assets/imge2.jpg";
import Image3 from "../../assets/imge3.jpg";
import Image4 from "../../assets/imge4.jpg";
import Image5 from "../../assets/imge5.jpg";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { ArrowRight } from "phosphor-react";
import { Link } from "react-router-dom";

const MergerInfo = () => {
  return (
    <>
      {/* <Container maxWidth={"lg"} sx={{ marginTop: 5, paddingTop: 5 }}>
        <Box width={"100%"}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <img
                src={Image1}
                alt="First Image"
                style={{ objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "100%", paddingLeft: 5 }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#5D5D5D" }}
                >
                  Merger information
                </Typography>
                <Typography
                  sx={{ fontSize: "39px", color: "#1A1A1A", fontWeight: 700 }}
                >
                  BPI and Robinsons Bank have entered into a merger
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "20px", color: "#1A1A1A" }}
                >
                  Find out what you need to know
                </Typography>
                <Box sx={{ paddingTop: 4 }}>
                  <Button
                    component={Link}
                    to="/maintain"
                    sx={{
                      background:
                        "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
                      fontWeight: 500,
                      color: "#FFFFFF",
                      padding: "13px 45px",
                      borderRadius: "4px",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      '&:hover':{
                        background:
                        "linear-gradient(73.49deg, #fff 0%, #fff 98.48%)",
                        color:'#b11116',
                        border:'2px solid #b11116',
                      }
                    }}
                    endIcon={<ArrowRight style={{ marginLeft: 15 }} />}
                  >
                    LEARN MORE
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "100%", paddingLeft: 5 }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#5D5D5D" }}
                >
                  Cards
                </Typography>
                <Typography
                  sx={{ fontSize: "39px", color: "#1A1A1A", fontWeight: 700 }}
                >
                  Choose a BPI card that suits your lifestyle
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "20px", color: "#1A1A1A" }}
                >
                  Get the best value from spending through our various cards
                  packed with exiciting deals and features you will love
                </Typography>
                <Box sx={{ paddingTop: 4 }}>
                  <Button
                    component={Link}
                    to="/maintain"
                    sx={{
                      background:
                        "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
                      fontWeight: 500,
                      color: "#FFFFFF",
                      padding: "13px 45px",
                      borderRadius: "4px",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      '&:hover':{
                        background:
                        "linear-gradient(73.49deg, #fff 0%, #fff 98.48%)",
                        color:'#b11116',
                        border:'2px solid #b11116',
                      }
                    }}
                    endIcon={<ArrowRight style={{ marginLeft: 15 }} />}
                  >
                    LEARN MORE
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={Image2}
                alt="First Image"
                style={{ objectFit: "cover" }}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <img
                src={Image3}
                alt="First Image"
                style={{ objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "100%", paddingLeft: 5 }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#5D5D5D" }}
                >
                  Loans
                </Typography>
                <Typography
                  sx={{ fontSize: "39px", color: "#1A1A1A", fontWeight: 700 }}
                >
                  Fullfill your dreams with a BPI loan
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "20px", color: "#1A1A1A" }}
                >
                  Achieve your dream car, house or vacation with the help of our
                  loan products.
                </Typography>
                <Box sx={{ paddingTop: 4 }}>
                  <Button
                    component={Link}
                    to="/maintain"
                    sx={{
                      background:
                        "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
                      fontWeight: 500,
                      color: "#FFFFFF",
                      padding: "13px 45px",
                      borderRadius: "4px",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      '&:hover':{
                        background:
                        "linear-gradient(73.49deg, #fff 0%, #fff 98.48%)",
                        color:'#b11116',
                        border:'2px solid #b11116',
                      }
                    }}
                    endIcon={<ArrowRight style={{ marginLeft: 15 }} />}
                  >
                    LEARN MORE
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "100%", paddingLeft: 5 }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#5D5D5D" }}
                >
                  Investments
                </Typography>
                <Typography
                  sx={{ fontSize: "39px", color: "#1A1A1A", fontWeight: 700 }}
                >
                  Invest for your future
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "20px", color: "#1A1A1A" }}
                >
                  Reach your dreams with our wide array of investment options
                  and expert financial advice
                </Typography>
                <Box sx={{ paddingTop: 4 }}>
                  <Button
                    component={Link}
                    to="/maintain"
                    sx={{
                      background:
                        "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
                      fontWeight: 500,
                      color: "#FFFFFF",
                      padding: "13px 45px",
                      borderRadius: "4px",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      '&:hover':{
                        background:
                        "linear-gradient(73.49deg, #fff 0%, #fff 98.48%)",
                        color:'#b11116',
                        border:'2px solid #b11116',
                      }
                    }}
                    endIcon={<ArrowRight style={{ marginLeft: 15 }} />}
                  >
                    LEARN MORE
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={Image4}
                alt="First Image"
                style={{ objectFit: "cover" }}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <img
                src={Image5}
                alt="First Image"
                style={{ objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "100%", paddingLeft: 5 }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#5D5D5D" }}
                >
                  Advisory
                </Typography>
                <Typography
                  sx={{ fontSize: "39px", color: "#1A1A1A", fontWeight: 700 }}
                >
                  Update your client information at any BPI branch
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "20px", color: "#1A1A1A" }}
                >
                  With one government-issued ID, you can update your records to
                  ensure you receive advisories,offers and alerts
                </Typography>
                <Box sx={{ paddingTop: 4 }}>
                  <Button
                    component={Link}
                    to="/maintain"
                    sx={{
                      background:
                        "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
                      fontWeight: 500,
                      color: "#FFFFFF",
                      padding: "13px 45px",
                      borderRadius: "4px",
                      fontSize: "16px",
                      textTransform: "uppercase",
                      '&:hover':{
                        background:
                        "linear-gradient(73.49deg, #fff 0%, #fff 98.48%)",
                        color:'#b11116',
                        border:'2px solid #b11116',
                      }
                    }}
                    endIcon={<ArrowRight style={{ marginLeft: 15 }} />}
                  >
                    LEARN MORE
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container> */}
            <Container maxWidth={"lg"} sx={{ marginTop: 5, paddingTop: 5 }}>
        <Box width={"100%"}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <img
                src={Image1}
                alt="First Image"
                style={{ objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "100%", paddingLeft: 5 }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "clamp(10px, 2vw, 16px)", color: "#5D5D5D" }}
                >
                  Merger information
                </Typography>
                <Typography
                  sx={{ fontSize: "clamp(14px, 2vw, 39px)", color: "#1A1A1A", fontWeight: 700 }}
                >
                  BPI and Robinsons Bank have entered into a merger
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "clamp(12px, 2vw, 20px)", color: "#1A1A1A" }}
                >
                  Find out what you need to know
                </Typography>
                <Box sx={{ paddingTop: 4 }}>
                  <Button
                    component={Link}
                    to="/maintain"
                    sx={{
                      background:
                        "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
                      fontWeight: 500,
                      color: "#FFFFFF",
                      // padding: "13px 45px",
                      paddingX:"clamp(12px, 2vw, 45px)",
                      paddingY:"clamp(5px, 2vw, 13px)",
                      borderRadius: "4px",
                      fontSize: "clamp(8px, 2vw, 16px)",
                      textTransform: "uppercase",
                      '&:hover':{
                        background:
                        "linear-gradient(73.49deg, #fff 0%, #fff 98.48%)",
                        color:'#b11116',
                        border:'2px solid #b11116',
                      }
                    }}
                    endIcon={<ArrowRight style={{ marginLeft: 15 }} />}
                  >
                    LEARN MORE
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "100%", paddingLeft: 5 }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#5D5D5D" }}
                >
                  Cards
                </Typography>
                <Typography
                  sx={{ fontSize: "clamp(14px, 2vw, 39px)", color: "#1A1A1A", fontWeight: 700 }}
                >
                  Choose a BPI card that suits your lifestyle
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "clamp(12px, 2vw, 20px)", color: "#1A1A1A" }}
                >
                  Get the best value from spending through our various cards
                  packed with exiciting deals and features you will love
                </Typography>
                <Box sx={{ paddingTop: 4 }}>
                  <Button
                    component={Link}
                    to="/maintain"
                    sx={{
                      background:
                        "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
                      fontWeight: 500,
                      color: "#FFFFFF",
                      paddingX:"clamp(12px, 2vw, 45px)",
                      paddingY:"clamp(5px, 2vw, 13px)",
                      borderRadius: "4px",
                      fontSize: "clamp(8px, 2vw, 16px)",
                      textTransform: "uppercase",
                      '&:hover':{
                        background:
                        "linear-gradient(73.49deg, #fff 0%, #fff 98.48%)",
                        color:'#b11116',
                        border:'2px solid #b11116',
                      }
                    }}
                    endIcon={<ArrowRight style={{ marginLeft: 15 }} />}
                  >
                    LEARN MORE
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={Image2}
                alt="First Image"
                style={{ objectFit: "cover" }}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <img
                src={Image3}
                alt="First Image"
                style={{ objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "100%", paddingLeft: 5 }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "clamp(12px, 2vw, 20px)", color: "#5D5D5D" }}
                >
                  Loans
                </Typography>
                <Typography
                  sx={{ fontSize: "clamp(14px, 2vw, 39px)", color: "#1A1A1A", fontWeight: 700 }}
                >
                  Fullfill your dreams with a BPI loan
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "20px", color: "#1A1A1A" }}
                >
                  Achieve your dream car, house or vacation with the help of our
                  loan products.
                </Typography>
                <Box sx={{ paddingTop: 4 }}>
                  <Button
                    component={Link}
                    to="/maintain"
                    sx={{
                      background:
                        "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
                      fontWeight: 500,
                      color: "#FFFFFF",
                      paddingX:"clamp(12px, 2vw, 45px)",
                      paddingY:"clamp(5px, 2vw, 13px)",
                      borderRadius: "4px",
                      fontSize: "clamp(8px, 2vw, 16px)",
                      textTransform: "uppercase",
                      '&:hover':{
                        background:
                        "linear-gradient(73.49deg, #fff 0%, #fff 98.48%)",
                        color:'#b11116',
                        border:'2px solid #b11116',
                      }
                    }}
                    endIcon={<ArrowRight style={{ marginLeft: 15 }} />}
                  >
                    LEARN MORE
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "100%", paddingLeft: 5 }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#5D5D5D" }}
                >
                  Investments
                </Typography>
                <Typography
                  sx={{ fontSize: "clamp(14px, 2vw, 39px)", color: "#1A1A1A", fontWeight: 700 }}
                >
                  Invest for your future
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "clamp(12px, 2vw, 20px)", color: "#1A1A1A" }}
                >
                  Reach your dreams with our wide array of investment options
                  and expert financial advice
                </Typography>
                <Box sx={{ paddingTop: 4 }}>
                  <Button
                    component={Link}
                    to="/maintain"
                    sx={{
                      background:
                        "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
                      fontWeight: 500,
                      color: "#FFFFFF",
                      paddingX:"clamp(12px, 2vw, 45px)",
                      paddingY:"clamp(5px, 2vw, 13px)",
                      borderRadius: "4px",
                      fontSize: "clamp(8px, 2vw, 16px)",
                      textTransform: "uppercase",
                      '&:hover':{
                        background:
                        "linear-gradient(73.49deg, #fff 0%, #fff 98.48%)",
                        color:'#b11116',
                        border:'2px solid #b11116',
                      }
                    }}
                    endIcon={<ArrowRight style={{ marginLeft: 15 }} />}
                  >
                    LEARN MORE
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={Image4}
                alt="First Image"
                style={{ objectFit: "cover" }}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <img
                src={Image5}
                alt="First Image"
                style={{ objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                sx={{ width: "100%", height: "100%", paddingLeft: 5 }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#5D5D5D" }}
                >
                  Advisory
                </Typography>
                <Typography
                  sx={{ fontSize: "clamp(14px, 2vw, 39px)", color: "#1A1A1A", fontWeight: 700 }}
                >
                  Update your client information at any BPI branch
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "clamp(12px, 2vw, 20px)", color: "#1A1A1A" }}
                >
                  With one government-issued ID, you can update your records to
                  ensure you receive advisories,offers and alerts
                </Typography>
                <Box sx={{ paddingTop: 4 }}>
                  <Button
                    component={Link}
                    to="/maintain"
                    sx={{
                      background:
                        "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
                      fontWeight: 500,
                      color: "#FFFFFF",
                      paddingX:"clamp(12px, 2vw, 45px)",
                      paddingY:"clamp(5px, 2vw, 13px)",
                      borderRadius: "4px",
                      fontSize: "clamp(8px, 2vw, 16px)",
                      textTransform: "uppercase",
                      '&:hover':{
                        background:
                        "linear-gradient(73.49deg, #fff 0%, #fff 98.48%)",
                        color:'#b11116',
                        border:'2px solid #b11116',
                      }
                    }}
                    endIcon={<ArrowRight style={{ marginLeft: 15 }} />}
                  >
                    LEARN MORE
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default MergerInfo;
