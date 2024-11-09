import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { ArrowRight } from "phosphor-react";
import React from "react";
import Personal from "../../assets/hero.jpg";
import { styled } from "@mui/system";

const StyledLink = styled("a")`
  cursor: pointer;
  text-decoration: none;
  color: #5d5d5d;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
    color: #000;
  }
`;

const LoansOver = () => {
  return (
    <Container maxWidth={"lg"}>
      {/* <Header2 /> */}

      <Box sx={{ marginTop: 10 }}>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography variant="h3" fontWeight={700} sx={{ paddingRight: 5 }}>
            Loans overview
          </Typography>

          <ArrowRight size={30} color="#b11116" />
        </Stack>
        <Typography variant="body2" sx={{ marginBottom: 5 }}>
          Achieve your dream car, house, or vacation with the help of our loan
          products.
        </Typography>

        <Box width={"100%"}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Box sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  color={"#000"}
                  sx={{ paddingBottom: 2 }}
                >
                  Types of Loans
                </Typography>
                <ul style={{ listStyle: "none", color: "#5d5d5d" }}>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain"> Auto Loan</StyledLink>
                  </li>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain"> MotorSiklo Loan</StyledLink>
                  </li>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain"> Housing Loan</StyledLink>
                  </li>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain"> Personal Loan</StyledLink>
                  </li>
                </ul>
              </Box>
            </Grid>

            <Grid item xs={12} md={2.5}>
              <Box sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  color={"#000"}
                  sx={{ paddingBottom: 2 }}
                >
                  Services
                </Typography>
                <ul style={{ listStyle: "none", color: "#5d5d5d" }}>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">
                      Auto Loan Payment Solutions
                    </StyledLink>
                  </li>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">
                      {" "}
                      Housing Loan Payment Solutions
                    </StyledLink>
                  </li>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">
                      {" "}
                      Auto Loan After-Sales Services
                    </StyledLink>
                  </li>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">
                      {" "}
                      Housing Loan After-Sales Services
                    </StyledLink>
                  </li>
                </ul>
              </Box>
            </Grid>

            <Grid item xs={12} md={2.5}>
              <Box sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  color={"#000"}
                  sx={{ paddingBottom: 2 }}
                >
                  Marketplace
                </Typography>
                <ul style={{ listStyle: "none", color: "#5d5d5d" }}>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">Vehicle</StyledLink>
                  </li>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">Properties</StyledLink>
                  </li>
                </ul>
              </Box>
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
                  Easy, affordable, and accessible financing solutions for our
                  modern day OFW heroes and their loved ones.
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
  );
};

export default LoansOver;
