import { Box, Typography } from "@mui/material";
import React from "react";
import childImgae from "../assets/13586805_34..02 1.png";
import {
  CenterFooter,
  CircularProgressbar,
  ProgressLayout,
  TotalPoints,
} from "./DashboardComponets";
import { getCurrentUser } from "../Hooks/HelperFunctions";

export default function CenterLayout() {
  const currentUser = getCurrentUser();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box
        sx={{
          background: "#922C88",
          height: "314px",
          width: "full",
          borderRadius: "24px",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "44px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "800",
              color: "#fff",
              fontStyle: "ExtraBold",
              fontSize: "32px",
              fontFamily: "Urbanist",
            }}
          >
            Welcome back {currentUser.first_name}
          </Typography>
          <Typography sx={{ color: "#FFFFFFB2", fontFamily: "Urbanist" }}>
            Exciting news! You’ve won a prize. <br /> Tap the button below to
            claim your prize!
          </Typography>
        </Box>
        <Box
          px={{
            backgroundImage: `url(${childImgae})`,
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "31px",
            width: "421px",
            height: "421px",
            position: "absolute",
            right: "0px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "-2px",
          }}
        >
          <img src="src/assets/Group 18392.png" alt="" />
        </Box>
      </Box>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1.26fr", gap: "20px" }}
      >
        <Box sx={{ bgcolor: "#fff", height: "376px", borderRadius: "24px" }}>
          <CircularProgressbar />
        </Box>
        <Box
          sx={{
            bgcolor: "#F7F7F7",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            height: "376px",
          }}
        >
          <TotalPoints />
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: "24px",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                // here i make the scrollbar hidden -------------------------------------------------------
                display: "none",
              },
            }}
          >
            <ProgressLayout />
          </Box>
        </Box>
      </Box>
      <CenterFooter />
    </Box>
  );
}
