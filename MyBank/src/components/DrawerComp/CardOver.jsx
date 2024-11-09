import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import {
  CreditCard,
  FilePlus,
  Cardholder,
  SquareLogo,
  ArrowRight,
} from "phosphor-react";
import React from "react";

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

const Links_Data = [
  {
    id: 1,
    title: "credit card activation",
    icon: <CreditCard style={{ color: "#b11116" }} size={20} />,
  },
  {
    id: 2,
    title: "online payment channel",
    icon: <SquareLogo style={{ color: "#b11116" }} size={20} />,
  },
  {
    id: 3,
    title: "credit card terms and conditions",
    icon: <FilePlus style={{ color: "#b11116" }} size={20} />,
  },
  {
    id: 4,
    title: "debit card request",
    icon: <Cardholder style={{ color: "#b11116" }} size={20} />,
  },
];

const CardOver = () => {
  return (
    <>
      <Container maxWidth={"lg"}>
        {/* <Header2 /> */}

        <Box sx={{ marginTop: 10 }}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h3" fontWeight={700} sx={{ paddingRight: 5 }}>
              Cards overview
            </Typography>

            <ArrowRight size={30} color="#b11116" />
          </Stack>
          <Typography variant="body2" sx={{ marginBottom: 5 }}>
            Get the best value from all your spending through our various cards
            packed with exciting deals and features you will love.
          </Typography>

          <Box width={"100%"}>
            <Grid container paddingBottom={3}>
              <Grid item xs={12} md={3}>
                <Box sx={{ padding: 2 }}>
                  <Typography
                    variant="h6"
                    color={"#000"}
                    sx={{ paddingBottom: 2 }}
                  >
                    Types of Cards
                  </Typography>
                  <ul style={{ listStyle: "none", color: "#5d5d5d" }}>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                      <StyledLink href="/maintain"> Credit Cards</StyledLink>
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                      <StyledLink href="/maintain"> Debit Cards</StyledLink>
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                      <StyledLink href="/maintain"> Prepaid Cards</StyledLink>
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
                      <StyledLink href="/maintain"> Card Activation</StyledLink>
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                      <StyledLink href="/maintain"> SIP Loans</StyledLink>
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                      <StyledLink href="/maintain"> Bills Payment</StyledLink>
                    </li>
                    <li style={{ paddingBottom: 15, fontWeight: 700 }}>
                      <StyledLink href="/maintain"> E-statements</StyledLink>
                    </li>
                  </ul>
                </Box>
              </Grid>

              <Grid item xs={12} md={2.5}></Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    padding: 2,
                    backgroundColor: "#eeeeee",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">Quick Links</Typography>
                  {Links_Data.map((item) => (
                    <Box key={item.id}>
                      <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                      >
                        {item.icon}

                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "16px", py: 1 }}
                        >
                          {" "}
                          {item.title}{" "}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CardOver;
