import { Box, Button, Checkbox, Typography } from "@mui/material";
import { useState } from "react";
import itype4logo from "../assets/itype4home logo 1.svg";
import { InputField } from "./InputFields";

export default function RightSide() {
  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phnRegex = /^[0-9]{10}$/;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = "This field is required";
    });
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.phoneNumber && !phnRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    console.log(formData);
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
        onSubmit={handleRegister}
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
            Sign Up for an Account
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <InputField
            name={"fullname"}
            label={"Full Name"}
            onChange={handleOnChange}
            error={!!errors.fullname}
            helperText={errors.fullname}
          />
          <InputField
            name={"phoneNumber"}
            label={"Phone Number"}
            onChange={handleOnChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />

          <InputField
            name={"email"}
            label={"Email Address"}
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
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "400px",
              fontSize: "13px",
              lineHeight: "20px",
            }}
          >
            Your password must have at least 8 characters
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Checkbox
            defaultChecked
            value=""
            // checked={}
            // onChange={}
            sx={{
              color: "#922C88",
              "&.Mui-checked": {
                color: "#922C88",
              },
            }}
          />
          <Typography
            sx={{ fontFamily: "Poppins", fontWeight: 400, fontSize: "13px" }}
          >
            By creating an account means you agree to the <br />{" "}
            <span style={{ color: "#922C88" }}>Terms & Conditions</span> and our{" "}
            <span style={{ color: "#922C88" }}>Privacy Policy</span>
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
          Register
        </Button>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            textAlign: "center",
            color: "#09070580",
          }}
        >
          Already have an account?{" "}
          <span
            style={{ color: "#922C88", fontWeight: "450", cursor: "pointer" }}
          >
            Sign In
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
