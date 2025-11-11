import { Box, Button, Checkbox, FormLabel, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequestRegister } from "../Hooks/axiosRequests";
import { InputField, ItypeImg, RememberMe } from "./InputFields";
import LeftSide from "./LeftSide";
import { KeyIcon, LockIcon, UserIcon } from "./SvgIcons";

export default function ChildLogin() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [checkBox, setCheckBox] = useState(false);
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

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validate = validationCheck();

    if (!validate) return;

    try {
      const res = await postRequestRegister("/student-login", childLoginData);
      // console.log(res);
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
                icon={<KeyIcon />}
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
                icon={<UserIcon />}
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
                icon={<LockIcon />}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <RememberMe onChange={() => setCheckBox(!checkBox)} />
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
              onClick={() => navigate("/forgotPassword")}
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
