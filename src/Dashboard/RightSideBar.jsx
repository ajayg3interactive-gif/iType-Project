import { Box } from "@mui/material";
import React from "react";
import { Calender, StudentList, TodayDetails } from "./DashboardComponets";

export default function RightSideBar() {
  return (
    <Box
      sx={{
        m: "24px 20px 0px",
        display: "flex",
        justifyContent:'space-between',
        flexDirection: "column",
      }}
    >
        <StudentList/>
        <Calender/>
        <TodayDetails/>
    </Box>
  );
}
