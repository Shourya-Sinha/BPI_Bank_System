import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  IconButton,
  Paper,
  Popper,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Check, CodeSimple } from "phosphor-react";
import { useSearchParams, Link } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Conversation_Menu = [
  {
    title: "Investor Relations",
  },
  {
    title: "Governance",
  },
  {
    title: "Sustainability",
  },
  {
    title: "News",
  },
];

const Popper_Menu = () => {
  return (
    <Paper
      sx={{
        height: "400px",
        overflowY: "auto",
        padding: 2,
        px: 3,
        zIndex: 1000,
        position: "relative",
      }}
      elevation={4}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
          Personal Banking
        </Typography>

        <IconButton sx={{ color: "#b11116" }}>
          <Check />
        </IconButton>
      </Stack>

      <Stack sx={{ marginTop: 1 }} spacing={1}>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: "16px", textDecoration: "none", color: "#000" }}
          component={Link}
          to="/maintain"
        >
          Wealth Management
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          Preferred Banking
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          Asset and Wealth
        </Typography>
      </Stack>
      <Stack spacing={2} mt={2}>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: "16px", textDecoration: "none", color: "#000" }}
          component={Link}
          to="/maintain"
        >
          SME Banking
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: "16px", textDecoration: "none", color: "#000" }}
          component={Link}
          to="/maintain"
        >
          Institutional Banking
        </Typography>
      </Stack>
      <Stack mt={2} spacing={1}>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: "16px", textDecoration: "none", color: "#000" }}
          component={Link}
          to="/maintain"
        >
          BPI Group
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          About BPI
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          ALFM Mutual Funds
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          Ayala Plans, inc.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          BanKo
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          BPI AIA Life Assurance Corporation
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          BPI Capital Corporation
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          BPI Europe
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          BPI Foundation
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          BPI Wealth Hong Kong
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          BPI MS Insurance
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          BPI Tokyo Century Rental
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          BPI Trade
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            paddingLeft: 2,
            textDecoration: "none",
            color: "#000",
          }}
          component={Link}
          to="/maintain"
        >
          BPI Mano
        </Typography>
      </Stack>
    </Paper>
  );
};

const ChatHeader = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleCloseConversationMenu = () => {
    setConversationMenuAnchorEl(null);
  };

  const [popperOpen, setPopperOpen] = useState(false);
  const [popperAnchorel, setPopperAnchorEl] = useState(null);

  const handleClickPopper = (e) => {
    setPopperAnchorEl(e.currentTarget);
    setPopperOpen((prev) => !prev);
  };

  const handleClosePopper = () => {
    setPopperOpen(false);
    setPopperAnchorEl(null);
  };

  return (
    <>
        {/* <Box
      p={2}
      width={"100%"}
      sx={{
        borderBottom: "1px solid #ddd",
      }}
    >
      <Stack
        alignItems={"center"}
        direction={"row"}
        sx={{ width: "100%", height: "100%" }}
        justifyContent="space-between"
      >
        <Stack
          onClick={() => {
            searchParams.set("open", true);
            setSearchParams(searchParams);
          }}
          spacing={2}
          direction="row"
        >
          <Stack direction={"row"} spacing={2}>
            <Typography sx={{ fontSize: "16px" }}>You are in</Typography>
            <Typography
              variant="body2"
              sx={{ color: "#1A1A1A", fontSize: "17px" }}
            >
              Personal Banking
            </Typography>
          </Stack>
          <IconButton sx={{ padding: 0 }} onClick={handleClickPopper}>
            <Box sx={{ transform: "rotate(90deg)", color: "#b11116" }}>
              <CodeSimple />
            </Box>
          </IconButton>
        </Stack>
        <Stack direction={"row"} alignItems="center" spacing={isMobile ? 1 : 3}>
          {Conversation_Menu.map((conv, index) => (
            <Typography
              variant="caption"
              key={index}
              component={Link}
              to={"/maintain"}
              sx={{ textDecoration: "none", color: "#1A1A1A" }}
            >
              {conv.title}{" "}
            </Typography>
          ))}

          <Button
            component={Link}
            to="/login"
            sx={{
              textDecoration: "none",
              padding: "9px 16px",
              fontSize: "13px",
              color: "#fff",
              borderRadius: "4px",
              background:
                "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
            }}
          >
            LOGIN
          </Button>
        </Stack>
      </Stack>
      <Popper
        open={popperOpen}
        anchorEl={popperAnchorel}
        onClose={handleClosePopper}
      >
        <Popper_Menu />
      </Popper>
    </Box> */}
    {isSmallScreen ? (
        <Box
        width={"100%"}
        sx={{
          borderBottom: "1px solid #ddd",
          paddingX:isSmallScreen ? '5px' : '50px',
          paddingY:isSmallScreen ? '7px' : '16px'
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          sx={{ width: "100%", height: "100%" }}
          justifyContent="space-between"
        >
          <Stack
            onClick={() => {
              searchParams.set("open", true);
              setSearchParams(searchParams);
            }}
            spacing={2}
            direction="row"
          >
            <Stack direction={"row"} spacing={2}>
              <Typography sx={{ fontSize: "16px",display:isSmallScreen ? 'none':'block' }}>You are in</Typography>
              <Typography
                variant="body2"
                sx={{ color: "#1A1A1A",fontSize: isMediumScreen ? "0.8rem":"17px" }}
              >
                Personal Banking
              </Typography>
            </Stack>
            <IconButton sx={{ padding: 0 }} onClick={handleClickPopper}>
              <Box sx={{ transform: "rotate(90deg)", color: "#b11116" }}>
                <CodeSimple style={{fontSize: isMediumScreen ? "0.9rem":""}} />
              </Box>
            </IconButton>
          </Stack>
          <Stack direction={"row"} alignItems="center" spacing={isMobile ? 1 : 3}>
            {Conversation_Menu.map((conv, index) => (
              <Typography
                variant="caption"
                key={index}
                component={Link}
                to={"/maintain"}
                sx={{ textDecoration: "none", color: "#1A1A1A",display: isMediumScreen ? 'none' : 'block', }}
              >
                {conv.title}{" "}
              </Typography>
            ))}

            <Stack sx={{cursor:'pointer',marginTop:2}}  component={Link}
              to="/login">
            <Button
             
              sx={{
                textDecoration: "none",
                // padding: "9px 16px",
                paddingX:isMediumScreen ? '39px' : '16px',
                paddingY:isMediumScreen ? '15px' :'9px',
                fontSize:isMediumScreen ?  '12px' : "13px",
                color: "#fff",
                borderRadius: "4px",
                background:
                  "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
              }}
            >
              LOGIN
            </Button>
            </Stack>
  
           
          </Stack>
        </Stack>
        {/* <Popper
          open={popperOpen}
          anchorEl={popperAnchorel}
          onClose={handleClosePopper}
        >
          <Popper_Menu />
        </Popper> */}
      </Box>
    ):(
      <Box
      width={"100%"}
      sx={{
        borderBottom: "1px solid #ddd",
        paddingX:isSmallScreen ? '5px' : '50px',
        paddingY:isSmallScreen ? '7px' : '16px'
      }}
    >
      <Stack
        alignItems={"center"}
        direction={"row"}
        sx={{ width: "100%", height: "100%" }}
        justifyContent="space-between"
      >
        <Stack
          onClick={() => {
            searchParams.set("open", true);
            setSearchParams(searchParams);
          }}
          spacing={2}
          direction="row"
        >
          <Stack direction={"row"} spacing={2}>
            <Typography sx={{ fontSize: "16px",display:isSmallScreen ? 'none':'block' }}>You are in</Typography>
            <Typography
              variant="body2"
              sx={{ color: "#1A1A1A",fontSize: isMediumScreen ? "0.8rem":"17px" }}
            >
              Personal Banking
            </Typography>
          </Stack>
          <IconButton sx={{ padding: 0 }} onClick={handleClickPopper}>
            <Box sx={{ transform: "rotate(90deg)", color: "#b11116" }}>
              <CodeSimple style={{fontSize: isMediumScreen ? "0.9rem":""}} />
            </Box>
          </IconButton>
        </Stack>
        <Stack direction={"row"} alignItems="center" spacing={isMobile ? 1 : 3}>
          {Conversation_Menu.map((conv, index) => (
            <Typography
              variant="caption"
              key={index}
              component={Link}
              to={"/maintain"}
              sx={{ textDecoration: "none", color: "#1A1A1A",display: isMediumScreen ? 'none' : 'block', }}
            >
              {conv.title}{" "}
            </Typography>
          ))}

          <Button
            component={Link}
            to="/login"
            sx={{
              textDecoration: "none",
              // padding: "9px 16px",
              paddingX:isMediumScreen ? '30px' : '16px',
              paddingY:isMediumScreen ? '10px' :'9px',
              fontSize:isMediumScreen ?  '12px' : "13px",
              color: "#fff",
              borderRadius: "4px",
              background:
                "linear-gradient(73.49deg, #b11116 0%, #ee4f53 98.48%)",
            }}
          >
            LOGIN
          </Button>
        </Stack>
      </Stack>
      <Popper
        open={popperOpen}
        anchorEl={popperAnchorel}
        onClose={handleClosePopper}
      >
        <Popper_Menu />
      </Popper>
    </Box>
    )}

    </>

  );
};

export default ChatHeader;
