import { useState } from "react";
import "./App.css";
import { Box } from "@mui/material";
import LoginPage from "./Compoents/LoginPage";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ChildLogin from "./Compoents/ChildLogin";
import OtpVerifyPage from "./Compoents/OtpVerifyPage";
import Dashboard from "./Compoents/Dashboard";
import Register from "./Compoents/Register";

function App() {
  return (
    <Box>
      <Toaster />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/child-login" element={<ChildLogin />} />
        <Route path="/otp-verify" element={<OtpVerifyPage />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
