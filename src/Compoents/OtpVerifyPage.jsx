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
      id: userData.id || userData.user_id,
      otp: otp,
      ip_address: ipAddress,
    };
    try {
      const res = await postRequestRegister("/verify-otp", payload);
      // console.log(res);
      // localStorage.setItem("userData", JSON.stringify(res));
      if (res.status === 200) {
        if (rememberMe) {
          localStorage.setItem("userData", JSON.stringify(res.data));
        } else {
          sessionStorage.setItem("userData", JSON.stringify(res.data));
        }
        navigate("/dashboard");
      }
    } catch (err) {
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
              textAlign: "center",
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
          <Box sx={{ m: { xs: "10px", md: "25px" } }}>
            <OtpInput
              //   name="otp"
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={
                <Box
                  component={"span"}
                  sx={{
                    padding: { xs: "1px", sm: "5px", md: "10px" },
                    margin: { xs: "1px", sm: "5px", lg: "10px" },
                  }}
                >
                  -
                </Box>
              }
              renderInput={(props) => (
                <Box
                  component={"input"}
                  {...props}
                  style={{
                    height: "38px",
                    width: "38px",
                    // padding:"10px",
                    textAlign: "center",
                    border: "1px solid #88888880",
                    borderRadius: "8px",
                  }}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: { xs: "3px", md: "25px" },
              maxWidth: "908px",
              width: "100%",
              // gap: "400px",
            }}
          >
            <Button
              sx={{
                color: "orange",
                cursor: "pointer",
                textTransform: "none",
                fontSize: { xs: "12px", md: "18px" },
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
                fontSize: { xs: "12px", md: "18px" },
              }}
              onClick={() => navigate("/dashboard")}
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
              fontSize: { xs: "12px", md: "18px" },
            }}
          >
            Verify and Login
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}
