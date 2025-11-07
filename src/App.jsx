import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChildLogin from "./Compoents/ChildLogin";
import LoginPage from "./Compoents/LoginPage";
import OtpVerifyPage from "./Compoents/OtpVerifyPage";
import Register from "./Compoents/Register";
import DashBoard from "./Dashboard/DashBoard";
import ForgotPassword from "./Compoents/ForgotPassword";

function App() {
  return (
    <Box>
      <Toaster />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/child-login" element={<ChildLogin />} />
        <Route path="/otp-verify" element={<OtpVerifyPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Box>
  );
}

export default App;
