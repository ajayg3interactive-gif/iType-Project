import { useState } from "react";
import "./App.css";
import { Box } from "@mui/material";
import LeftSide from "./Compoents/LeftSide";
import RightSide from "./Compoents/RightSide";
import LoginPage from "./Compoents/LoginPage";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Box
      sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100vh" }}
    >
      <Toaster />
      <LeftSide />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RightSide />} />
      </Routes>

    </Box>
  );
}

export default App;
