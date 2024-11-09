import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { ArrowRight } from "phosphor-react";
import Personal from "../../assets/personal.jpg";
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
const BankOver = () => {

  return (
    <>
      <Container maxWidth={"lg"}>
        {/* <Header2 /> */}

        <Box sx={{ marginTop: 10 }}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h3" fontWeight={700} sx={{ paddingRight: 5 }}>
              Bank overview
            </Typography>

            <ArrowRight size={30} color="#b11116" />
          </Stack>
          <Typography variant="body2" sx={{ marginBottom: 5 }}>
            Get the account for all your banking needs.
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
                    Types of Accounts
                  </Typography>
                  <ul style={{ listStyle: "none", color: "#5d5d5d" }}>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">Savings</StyledLink>
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">Checking</StyledLink>
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">Time Deposite</StyledLink>
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
                    <StyledLink href="/maintain">Forex</StyledLink>
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">Fund Transfer</StyledLink>                    
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">Bills Payment</StyledLink>                    
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">Remittance</StyledLink>                    
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
                    Ways to Bank
                  </Typography>
                  <ul style={{ listStyle: "none", color: "#5d5d5d" }}>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">Digital Banking</StyledLink>                    
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">Through ATMs and CAMs</StyledLink>                    
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                    <StyledLink href="/maintain">Partner Stores</StyledLink>                    
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
                    Open a deposite account within 5 minutes.
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
    </>
  );
};

export default BankOver;
