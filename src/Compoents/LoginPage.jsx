import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { postRequestRegister } from "../Hooks/axiosRequests";
import { InputField, ItypeImg, RememberMe } from "./InputFields";
import LeftSide from "./LeftSide";
import { EmailIcon, LockIcon } from "./SvgIcons";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // const userData = JSON.parse(localStorage.getItem("userData"));

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [checkBox, setCheckBox] = useState(false);

  const validationCheck = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    Object.entries(loginData).forEach(([key, value]) => {
      if (!value) newErrors[key] = "This field is required";
    });

    if (loginData.email && !emailRegex.test(loginData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validate = validationCheck();
    if (!validate) return;
    try {
      const res = await postRequestRegister("/login", loginData);
      console.log(res.data);
      localStorage.setItem("userData", JSON.stringify(res.data));
      if (res.status === 200) {
        navigate("/otp-verify", {
          state: { userData: res.data, rememberMe: checkBox },
        });
      } else {
        console.log(res.response.data.message);
        const message = res.response.data.message;
        toast.error(message);
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
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        height: "100vh",
      }}
    >
      <LeftSide />
      <Box
        sx={{
          // height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: { xs: "20px 20px ", md: "0px" },
        }}
      >
        <Box
          component={"form"}
          onSubmit={handleLogin}
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
              icon={<EmailIcon />}
            />
            <InputField
              name={"password"}
              label={"Password"}
              onChange={handleOnChange}
              error={!!errors.password}
              helperText={errors.password}
              icon={<LockIcon />}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <RememberMe onChange={() => setCheckBox(!checkBox)} />
              </Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  color: "#922C88",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/forgotPassword")}
              >
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
    </Box>
  );
}
