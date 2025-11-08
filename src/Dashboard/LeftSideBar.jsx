import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { ItypeImg } from "../Compoents/InputFields";
import { ClamePrize, MenuIcons, UserLog } from "./DashboardComponets";

export default function LeftSideBar() {
  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ItypeImg width="164px" height="40px" />
        </Box>
        <UserLog />
        <MenuIcons />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ClamePrize />
      </Box>
    </Box>
  );
}
