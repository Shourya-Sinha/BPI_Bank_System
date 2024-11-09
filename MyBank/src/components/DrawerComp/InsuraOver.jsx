import { Box, Container, Stack, Typography } from "@mui/material";
import { ArrowRight, CaretRight } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";

const InsuraOver = () => {
  return (
    <Container maxWidth={"lg"}>
      {/* <Header2 /> */}

      <Box sx={{ marginTop: 10, py: 3 }} marginBottom={3}>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography variant="h3" fontWeight={700} sx={{ paddingRight: 5 }}>
            Insurance overview
          </Typography>

          <ArrowRight size={30} color="#b11116" />
        </Stack>
        <Typography variant="body2" sx={{ marginBottom: 5 }}>
          Feel safe and secure whether it's for your future, health, travels, or
          assets.
        </Typography>

        <Box sx={{ paddingTop: 5 }}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography
              variant="body2"
              component={Link}
              to={"/maintain"}
              sx={{
                textDecoration: "none",
                color: "#212B36",
                "&:hover": { color: "#000", textDecoration: "underline" },
              }}
            >
              Apply Plans, Inc.
            </Typography>

            <CaretRight style={{ color: "#b11116" }} />
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default InsuraOver;
