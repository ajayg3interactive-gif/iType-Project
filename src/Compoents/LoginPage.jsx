import { Box, Button, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import itype4logo from "../assets/itype4home logo 1.svg";
import { InputField } from "./InputFields";
import { useNavigate } from "react-router-dom";
import axios from "./../../node_modules/axios/lib/axios";
import { postRequestLogin } from "../Hooks/axiosRequests";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    Object.entries(loginData).forEach(([key, value]) => {
      if (!value) newErrors[key] = "This field is required";
    });
    if (loginData.email && !emailRegex.test(loginData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await postRequestLogin("/login", loginData);
      console.log(res);
      if (res.data) {
        toast.success("Login success");
      }
    } catch (err) {
      console.log("Login Error", err);
      toast.error("Login Error", err);
    }
    // console.log(loginData);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <Box
      sx={{
        // height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={"form"}
        onSubmit={handleLogin}
        sx={{ display: "flex", flexDirection: "column", gap: "32px" }}
      >
        <Box
          sx={{
            backgroundImage: `url(${itype4logo})`,
            backgroundRepeat: "no-repeat",
            width: "131px",
            height: "32px",
          }}
        />
        <Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "32px",
              lineHeight: "44px",
            }}
          >
            Sign In to Your Account
          </Typography>
          <Typography
            sx={{
              color: "#09070580",
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "28px",
            }}
          >
            Welcome back! please enter your detail{" "}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <InputField
            name={"email"}
            label={"Email"}
            onChange={handleOnChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <InputField
            name={"password"}
            label={"Password"}
            onChange={handleOnChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                sx={{
                  color: "#922C88",
                  "&.Mui-checked": {
                    color: "#922C88",
                  },
                }}
              />
              <Typography sx={{ fontFamily: "Poppins" }}>
                Remember me
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: "Poppins", color: "#922C88" }}>
              Forgot Password
            </Typography>
          </Box>
        </Box>
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
          Login
        </Button>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#09070580",
          }}
        >
          Logging in as a child ?{" "}
          <span
            style={{ color: "#922C88", cursor: "pointer" }}
            onClick={() => navigate("/child-login")}
          >
            Click Here
          </span>
        </Typography>
        <Button
          variant="outlined"
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            textAlign: "center",
            color: "#09070580",
            textTransform: "none",
            borderColor: "#922C88",
            borderRadius: "10px",
            padding: "12px",
            color: "#922C88",
            cursor: "pointer",
          }}
          onClick={() => navigate("/signup")}
        >
          Don’t have an account yet? Sign Up
        </Button>
      </Box>
    </Box>
  );
}
