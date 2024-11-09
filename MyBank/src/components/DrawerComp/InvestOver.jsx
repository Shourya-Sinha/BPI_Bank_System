import React from "react";
import Personal from "../../assets/invest.jpg";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { ArrowRight } from "phosphor-react";
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

const InvestOver = () => {
  return (
    <Container maxWidth={"lg"}>
      {/* <Header2 /> */}

      <Box sx={{ marginTop: 10 }}>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography variant="h3" fontWeight={700} sx={{ paddingRight: 5 }}>
            Investments overview
          </Typography>

          <ArrowRight size={30} color="#b11116" />
        </Stack>
        <Typography variant="body2" sx={{ marginBottom: 5 }}>
          Invest today and be ready tomorrow. Let BPI help you reach your dreams
          with our wide array of investment options and expert financial advice.
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
                  Investment Solutions
                </Typography>
                <ul style={{ listStyle: "none", color: "#5d5d5d" }}>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">
                      {" "}
                      Fixed Income Securities
                    </StyledLink>
                  </li>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">
                      {" "}
                      Unit Investment Trust Funds
                    </StyledLink>
                  </li>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain"> Mutual Funds</StyledLink>
                  </li>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain"> Equities</StyledLink>
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
                  Economic updates
                </Typography>
                <ul style={{ listStyle: "none", color: "#5d5d5d" }}>
                  <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain"> Market insights</StyledLink>
                  </li>
                </ul>
              </Box>
            </Grid>

            <Grid item xs={12} md={2.5}></Grid>

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
                  Learn how you can grow your money to its full potential
                  through investing. Start your investment journey today.
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

export default InvestOver;
