import { Box, Button, Checkbox, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import itype4logo from "../assets/itype4home logo 1.svg";
import { postRequestRegister } from "../Hooks/axiosRequests";
import { InputField } from "./InputFields";
import LeftSide from "./LeftSide";
import {
  EmailIcon,
  LockIcon,
  PhoneIcon,
  UserIcon,
  ZipCodeIcon,
} from "./SvgIcons";

export default function Register() {
  // const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    postal_code: "",
    email: "",
    password: "",
    checkbox: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validationCheck = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phnRegex = /^[0-9]{10}$/;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = "This field is required";
    });
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.phone && !phnRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (formData.postal_code && formData.postal_code < 6) {
      newErrors.postal_code = "ZIP Code must be at least 6 Numbers";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validate = validationCheck();
    if (!formData.checkbox) {
      setCheckboxError("You must agree to the Terms & Conditions");
      return;
    }
    if (!validate) return;
    try {
      const res = await postRequestRegister("/register", formData);
      console.log("Registration success", res);
      if (res.data) {
        toast.success("Registration success");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error", err);
    }
    console.log(formData);
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
          m: { xs: "20px 20px", md: "0px" },
        }}
      >
        <Box
          component={"form"}
          onSubmit={handleRegister}
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
              Sign Up for an Account
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <InputField
              name={"first_name"}
              label={"First Name"}
              onChange={handleOnChange}
              error={!!errors.first_name}
              helperText={errors.first_name}
              icon={<UserIcon />}
            />
            <InputField
              name={"last_name"}
              label={"Last Name"}
              onChange={handleOnChange}
              error={!!errors.last_name}
              helperText={errors.last_name}
              icon={<UserIcon />}
            />

            <InputField
              name={"phone"}
              label={"Phone Number"}
              onChange={handleOnChange}
              error={!!errors.phone}
              helperText={errors.phone}
              icon={<PhoneIcon />}
            />
            <InputField
              name={"postal_code"}
              label={"ZIP Code"}
              onChange={handleOnChange}
              error={!!errors.postal_code}
              helperText={errors.postal_code}
              icon={<ZipCodeIcon />}
            />
            <InputField
              name={"email"}
              label={"Email Address"}
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

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex" }}>
              <Checkbox
                checked={formData.checkbox}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFormData((prev) => ({ ...prev, checkbox: checked }));
                  if (checked) setCheckboxError("");
                }}
                sx={{
                  color: "#922C88",
                  "&.Mui-checked": {
                    color: "#922C88",
                  },
                }}
              />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "13px",
                }}
              >
                By creating an account means you agree to the <br />{" "}
                <span style={{ color: "#922C88" }}>Terms & Conditions</span> and
                our <span style={{ color: "#922C88" }}>Privacy Policy</span>
              </Typography>
            </Box>
            {checkboxError && (
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  color: "#d32f2f",
                  m: "5px 40px",
                }}
              >
                {checkboxError}
              </Typography>
            )}
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
              mb: "10px",
            }}
            onClick={() => navigate("/")}
          >
            Already have an account? Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
