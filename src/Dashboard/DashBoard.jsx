import { Box } from "@mui/material";
import React from "react";
import LeftSideBar from "./LeftSideBar";
import CenterLayout from "./CenterLayout";
import RightSideBar from "./RightSideBar";

export default function DashBoard() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 3.28fr 1.48fr",
        height: "100vh",
      }}
    >
      <LeftSideBar />
      <Box
        sx={{
          bgcolor: "#F7F7F7",
          borderRadius: "32px",
          border: "9px soild #fff",
          p: "22px",
          m: "8px",
          overflow: "auto",
          // scrollbarWidth: "0px",
          "&::-webkit-scrollbar": {
            // here i make the scrollbar hidden -------------------------------------------------------
            display: "none",
          },
        }}
      >
        <CenterLayout />
      </Box>
      <RightSideBar />
    </Box>
  );
}
