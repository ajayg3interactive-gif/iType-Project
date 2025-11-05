import { Box, TextField } from "@mui/material";
import { useState } from "react";
import {
  EmailIcon,
  EyeClose,
  EyeOpen,
  KeyIcon,
  LockIcon,
  PhoneIcon,
  UserIcon,
  ZipCodeIcon,
} from "./SvgIcons";

export const InputField = ({ name, label, onChange, error, helperText }) => {
  const [type, setType] = useState("");
  const getIcon = () => {
    switch (name) {
      case "first_name":
      case "user_name":
      case "last_name":
        return <UserIcon />;
      case "unique_code":
        return <KeyIcon />;
      case "phone":
        return <PhoneIcon />;
      case "postal_code":
        return <ZipCodeIcon />;
      case "email":
        return <EmailIcon />;
      case "password":
        return <LockIcon />;
    }
  };
  const [eyeOpen, setEyeOpen] = useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          m: "7px 12px",
          zIndex: 1,
        }}
      >
        {getIcon()}
      </Box>
      <TextField
        error={error}
        helperText={helperText}
        type={name === "password" ? (eyeOpen ? "text" : "password") : "text"}
        // type={type}
        name={name}
        onChange={onChange}
        placeholder={label}
        sx={{
          width: "476px",

          position: "relative",
          fontFamily: "Poppins",
          "& fieldset": {
            borderRadius: "10px",
          },
          "& .MuiInputBase-input": {
            pt: "16px",
            borderRadius: "10px",
            backgroundColor: "#F5F6FA",
            fontFamily: "Poppins",
            pl: "52px",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#090705B2",
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "24px",
          },
          "& .MuiFormHelperText-root": {
            fontFamily: "Poppins",
          },
        }}
      />
      {name === "password" ? (
        <Box
          sx={{
            position: "absolute",
            top: "16px",
            right: "16px",
            cursor: "pointer",
          }}
          onClick={() => setEyeOpen(!eyeOpen)}
        >
          {eyeOpen ? <EyeOpen /> : <EyeClose />}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};
