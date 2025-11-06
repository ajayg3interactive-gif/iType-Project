import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import itype4logo from "../assets/itype4home logo 1.svg";
import { InputField } from "./InputFields";
import { useNavigate } from "react-router-dom";
import { postRequestRegister } from "../Hooks/axiosRequests";
import LeftSide from "./LeftSide";

export default function ChildLogin() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [childLoginData, setChildLoginData] = useState({
    unique_code: "",
    user_name: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setChildLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validationCheck = () => {
    const newErrors = {};
    Object.entries(childLoginData).forEach(([key, value]) => {
      if (!value) newErrors[key] = "This Field is required ";
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    validationCheck();

    try {
      const res = await postRequestRegister("/student-login", childLoginData);
      console.log(res);
    } catch (err) {
      console.log(err);
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
              Child Login
            </Typography>
            <Box>
              <Typography
                sx={{
                  //   color: "#09070580",
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "28px",
                }}
              >
                Login with your parent Code, Child Username, and Child Password.
              </Typography>
              <Typography
                sx={{
                  //   color: "#09070580",
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "28px",
                }}
              >
                All details can be accessed from the Parent Portal.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Box>
              <FormLabel sx={{ fontFamily: "Poppins", color: "#000" }}>
                Parent Code (from Parent Portal)
              </FormLabel>
              <InputField
                name={"unique_code"}
                label={"From Parent Portal"}
                onChange={handleOnChange}
                error={!!errors.unique_code}
                helperText={errors.unique_code}
              />
            </Box>
            <Box>
              <FormLabel sx={{ fontFamily: "Poppins", color: "#000" }}>
                Child Username (e.g.johnsmith - not your email)
              </FormLabel>
              <InputField
                name={"user_name"}
                label={"Child Username"}
                onChange={handleOnChange}
                error={!!errors.user_name}
                helperText={errors.user_name}
              />
            </Box>
            <Box>
              <FormLabel sx={{ fontFamily: "Poppins", color: "#000" }}>
                Child Password (from Parent Portal)
              </FormLabel>
              <InputField
                name={"password"}
                label={"Child Password"}
                onChange={handleOnChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
              Sign Up
            </Button>
            <Typography
              sx={{
                fontFamily: "Poppins",
                color: "#922C88",
                cursor: "pointer",
              }}
            >
              Forgot Password
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
          <Box />
        </Box>
      </Box>
    </Box>
  );
}
