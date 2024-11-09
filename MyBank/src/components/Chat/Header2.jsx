import React, { useState } from "react";
import Logo from "../../assets/logo-desktop.jpg";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CaretDown, MagnifyingGlass } from "phosphor-react";
import DrawerComponent from "../DrawerComponent";
import BankOver from "../DrawerComp/BankOver";
import CardOver from "../DrawerComp/CardOver";
import LoansOver from "../DrawerComp/LoansOver";
import InvestOver from "../DrawerComp/InvestOver";
import InsuraOver from "../DrawerComp/InsuraOver";
import RewardsOver from "../DrawerComp/RewardsOver";
import { Link } from "react-router-dom";

const HedaerMenu = [
  { label: "Bank", items: <BankOver /> },
  { label: "Cards", items: <CardOver /> },
  { label: "Loans", items: <LoansOver /> },
  { label: "Investments", items: <InvestOver /> },
  { label: "Insurance", items: <InsuraOver /> },
  { label: "Rewards and Promotions", items: <RewardsOver /> },
];

const Header2 = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(HedaerMenu[0].items);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu.items); // Set to items only
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingTop={2}
        >
          <Stack direction="row" alignItems={"center"} spacing={2}>
            {/* Logo */}
            <Stack alignItems={"center"} sx={{ width: "120px" }} component={Link} to="/app">
              <img src={Logo} alt="Logo" />
            </Stack>

            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              {/* Menu */}
              {HedaerMenu.map((menu, index) => (
                <Stack
                  key={index}
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  onClick={() => handleMenuClick(menu)}
                >
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    {menu.label}
                  </Typography>
                  {/* Render CaretDown only if it's not the last item */}
                  {index !== HedaerMenu.length - 1 && <CaretDown />}
                </Stack>
              ))}
            </Stack>
          </Stack>

          {/* Search */}
          <Stack>
            <IconButton sx={{ color: "#b11116" }}>
              <MagnifyingGlass />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      <DrawerComponent
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        content={selectedMenu}
      />
    </>
  );
};

export default Header2;
