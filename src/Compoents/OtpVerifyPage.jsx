import { Box, Button, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { postRequestRegister } from "../Hooks/axiosRequests";

export default function OtpVerifyPage() {
  const [open, setOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const [ipAddress, setIpAddress] = useState("");
  const [payload, setPayload] = useState({
    id: user_id,
    otp: "",
    ip_address: ipAddress,
  });
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await postRequestRegister("/verify-otp", payload);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const handleOtp = (value) => {
    setOtp(value);
    setPayload((prev) => ({
      ...prev,
      otp: value,
    }));
  };
  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await fetch("https://geolocation-db.com/json/");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };
    getIpAddress();
  }, []);

  return (
    <Box>
      <Dialog
        maxWidth
        open={open}
        PaperProps={{
          sx: {
            maxWidth: "908px",
            width: "100%",
            height: "100vh",
            margin: "24px",
            borderRadius: "12px",
          },
        }}
      >
        <Box
          component={"form"}
          onSubmit={handleVerifyOtp}
          sx={{
            display: "flex",
            height: "100vh",
            // width:"100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="src/assets/otp-img.png" alt="" height={"250px"} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "700", fontSize: "28px" }}>
              Email two factor authentication
            </Typography>
            <Typography sx={{ fontSize: "15px" }}>
              Your verification code has been sent to (given email). Please
              enter it below to login to the dashboard
            </Typography>
          </Box>
          <Box sx={{ m: "25px" }}>
            <OtpInput
              //   name="otp"
              value={otp}
              onChange={handleOtp}
              numInputs={6}
              renderSeparator={
                <span style={{ padding: "10px", margin: "10px" }}>-</span>
              }
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                height: "55px",
                width: "55px",
                // padding:"10px",
                border: "1px solid #88888880",
                borderRadius: "8px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: "25px",
              gap: "400px",
            }}
          >
            <Button
              sx={{
                color: "orange",
                cursor: "pointer",
                textTransform: "none",
                fontSize: "18px",
              }}
              onClick={() => navigate("/")}
            >
              Back to Login
            </Button>
            <Button
              sx={{
                color: "green",
                cursor: "pointer",
                textTransform: "none",
                fontSize: "18px",
              }}
            >
              Resend verification code
            </Button>
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
            Verify and Login
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}
