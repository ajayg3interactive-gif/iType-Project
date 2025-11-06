import { Box } from "@mui/material";
import React from "react";

export default function LeftSide() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right,#F4EAF3,#FAFBFF)",
        display: { xs: "none", md: "block" },
      }}
    />
  );
}
