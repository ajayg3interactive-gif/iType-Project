import { Box, Checkbox, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { EyeClose, EyeOpen } from "./SvgIcons";
import { warnOnce } from "./../../node_modules/@mui/x-internals/esm/warning/warning";

export const InputField = ({
  name,
  label,
  onChange,
  error,
  helperText,
  icon,
}) => {
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
        {icon}
      </Box>
      <TextField
        error={error}
        helperText={helperText}
        type={name === "password" ? (eyeOpen ? "text" : "password") : "text"}
        name={name}
        onChange={onChange}
        placeholder={label}
        fullWidth
        sx={{
          position: "relative",
          fontFamily: "Poppins",
          mixWidth: "476px",
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

export const RememberMe = ({ onChange }) => {
  return (
    <>
      <Checkbox
        sx={{
          color: "#922C88",
          "&.Mui-checked": {
            color: "#922C88",
          },
        }}
        onChange={onChange}
      />
      <Typography sx={{ fontFamily: "Poppins" }}>Remember me</Typography>
    </>
  );
};
