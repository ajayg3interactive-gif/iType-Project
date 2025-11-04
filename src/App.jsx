import { useState } from "react";
import "./App.css";
import { Box } from "@mui/material";
import LeftSide from "./Compoents/LeftSide";
import RightSide from "./Compoents/RightSide";

function App() {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr",  height: "100vh" }}>
      <LeftSide />
      <RightSide />
    </Box>
  );
}

export default App;
