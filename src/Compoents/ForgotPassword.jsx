import { Box, Button, Typography, useScrollTrigger } from "@mui/material";
import React, { useState } from "react";
import LeftSide from "./LeftSide";
import { InputField, ItypeImg } from "./InputFields";
import { EmailIcon } from "./SvgIcons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validationCheck = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "This field is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const validate = validationCheck();
    if (!validate) return;
    try {
      // console.log("check your mail...");
      toast.success("Check your email");
    } catch (err) {
      // console.log("Email is not registered");
      toast.error("Email is not registered");
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        height: "100vh",
      }}
    >
      <LeftSide />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: { xs: "20px 20px", md: "0px" },
        }}
      >
        <Box
          component={"form"}
          onSubmit={handleContinue}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "14px", md: "32px" },
          }}
        >
          <ItypeImg />
          <Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "32px",
                lineHeight: "44px",
              }}
            >
              Forgot Password
            </Typography>
            <Typography
              sx={{
                //   color: "#09070580",
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "28px",
                 maxWidth:"477px" 
              }}
            >
              Enter the email address associated with your account and we will
              send you a link to reset your password.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth:"477px" }}>
            <InputField
              name={"email"}
              label={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              icon={<EmailIcon />}
            />
            <Button
              type="submit"
              style={{
                color: "#fff",
                backgroundColor: "#922C88",
                textTransform: "none",
                borderRadius: "10px",
                padding: "12px",
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              Continue
            </Button>
            <Button
              sx={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                textAlign: "center",
                textTransform: "none",
                borderColor: "#922C88",
                borderRadius: "10px",
                padding: "12px",
                color: "#922C88",
                cursor: "pointer",
                mb: "10px",
              }}
              onClick={() => navigate("/")}
            >
              Back to Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
