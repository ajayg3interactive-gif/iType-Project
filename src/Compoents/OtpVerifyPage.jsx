import { Box, Button, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequestRegister } from "../Hooks/axiosRequests";

export default function OtpVerifyPage() {
  const [open, setOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, rememberMe } = location.state || {};
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await fetch("https://geolocation-db.com/json/");
        // console.log(response);
        const data = await response.json();
        // console.log(data.IPv4);
        setIpAddress(data.IPv4);
        // console.log(ipAddress);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };
    getIpAddress();
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const payload = {
      id: userData.id,
      otp: otp,
      ip_address: ipAddress,
    };
    try {
      const res = await postRequestRegister("/verify-otp", payload);
      console.log(res);
      if (res.status === 200 && res.data?.success) {
        if (rememberMe) {
          localStorage.setItem("userData", userData);
        } else {
          sessionStorage.setItem("userData", userData);
        }
        navigate("/dashboard");
      }
    } catch (err) {
      navigate("/dashboard");
      console.log(err);
    }
  };

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
              Your verification code has been sent to{" "}
              <span style={{ color: "#53a9feff" }}>{userData.email}</span>.
              Please enter it below to login to the dashboard
            </Typography>
          </Box>
          <Box sx={{ m: "25px" }}>
            <OtpInput
              //   name="otp"
              value={otp}
              onChange={setOtp}
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
              onClick={handleVerifyOtp}
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
