import { Box, Button, Typography } from "@mui/material";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  AccountingIcon,
  AccuracyIcon,
  BookIcon,
  ClockIcon,
  DownIcon,
  GameIcon,
  GiftIcon,
  HomeIcon,
  ManWithQusMark,
  Settings,
  SpeedIcon,
  TextIcon,
} from "../Compoents/SvgIcons";
import defaultAvatar from "../assets/Frame 2.png";
import giftBG from "../assets/GiftBg.png";
import dp from "../assets/image 3.png";
import { useState } from "react";
import dayjs from "dayjs";

export const UserLog = () => {
  const currentUser = JSON.parse(localStorage.getItem("userData"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#ECECF3", //ECECF3
        border: "1px",
        borderRadius: "12px",
        p: "12px",
        mt: "26px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8.5px",
          width: "218px",
        }}
      >
        <img
          src={currentUser?.profile_image_url || defaultAvatar}
          alt=""
          width={30}
          height={30}
        />
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "13px",
              fontStyle: "semiBold",
              fontFamily: "Urbanist",
            }}
          >
            {currentUser.first_name}
            {currentUser.last_name}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "11px",
              fontFamily: "Urbanist",
            }}
          >
            {currentUser.email}
          </Typography>
        </Box>
      </Box>
      <DownIcon />
    </Box>
  );
};

export const MenuIcons = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const menuList = [
    {
      icon: (isActive) => <HomeIcon fill={isActive ? "#fff" : "#828392"} />,
      name: "Homepage",
    },
    {
      icon: (isActive) => <SpeedIcon fill={isActive ? "#fff" : "#828392"} />,
      name: "Speed and Accuracy",
    },
    {
      icon: (isActive) => <BookIcon fill={isActive ? "#fff" : "#828392"} />,
      name: "User Guide",
    },
    {
      icon: (isActive) => (
        <AccountingIcon fill={isActive ? "#fff" : "#828392"} />
      ),
      name: "Accounting",
    },
    {
      icon: (isActive) => <Settings fill={isActive ? "#fff" : "#828392"} />,
      name: "Settings",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginTop: "24px",
      }}
    >
      {menuList.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <Button
            key={index}
            onClick={() => setActiveIndex(index)}
            sx={{
              display: "flex",
              justifyContent: "start",
              gap: "12px",
              padding: "10px 12px",
              border: "1px",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              color: isActive ? "#fff" : "#828392",
              bgcolor: isActive ? "#922C88" : "#fff",
              textTransform:"none",
            }}
          >
            {item.icon(isActive)}
            <Typography
              sx={{
                fontFamily: "Urbanist",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              {item.name}
            </Typography>
          </Button>
        );
      })}
    </Box>
  );
};

export const ClamePrize = () => {
  return (
    <Box
      sx={{
        background: "#922C88",
        backgroundImage: `url(${giftBG})`,
        backgroundPositionY: "50px",
        backgroundPositionX: "20px",
        backgroundRepeat: "no-repeat",
        width: "218px",
        pt: "83px",
        textAlign: "center",
        borderRadius: "12px",
        position: "relative",
        marginTop: "34.5px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "15px",
            color: "#fff",
            fontWeight: "700",
            fontFamily: "Urbanist",
          }}
        >
          You didn’t claim your prize
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#fff",
            fontWeight: "500",
            mb: "15px",
            fontFamily: "Urbanist",
          }}
        >
          Tap the button below to claim your prize!
        </Typography>
        <Button
          sx={{
            bgcolor: "#FFC63A",
            borderRadius: "24px",
            color: "#242530",
            fontWeight: "800",
            fontSize: "14px",
            p: "8px 56.5px ",
            fontStyle: "extra-bold",
            mb: "16px",
            textTransform: "none",
            fontFamily: "Urbanist",
          }}
        >
          Claim Prize
        </Button>
      </Box>

      <Box
        sx={{
          bgcolor: "#FFC63A",
          width: "69px",
          height: "69px",
          borderRadius: "100px",
          border: "4px solid #fff",
          position: "absolute",
          top: "-34.5px",
          left: "0",
          right: "0",
          margin: "auto",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GiftIcon />
      </Box>
    </Box>
  );
};

export const CircularProgressbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        p: "28px",
      }}
    >
      <Typography
        sx={{ fontFamily: "Urbanist", fontWeight: "700", fontSize: "18px" }}
      >
        Overall Task Progress
      </Typography>
      <Box sx={{ width: "177px", ml: "16px", height: "177px" }}>
        <CircularProgressbarWithChildren
          value={73}
          strokeWidth={14}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: `#922C88`,
            trailColor: "#d6d6d6",
          })}
        >
          <span
            style={{
              fontFamily: "Urbanist",
              fontWeight: "700",
              fontSize: "32px",
              textAlign: "center",
            }}
          >
            73
            <Typography
              sx={{
                fontFamily: "Urbanist",
                fontWeight: "600",
                fontSize: "14px",
                color: "#828392",
              }}
            >
              /100 <br /> completed
            </Typography>
          </span>
        </CircularProgressbarWithChildren>
      </Box>
      <Button
        sx={{
          bgcolor: "#922C88",
          color: "#fff",
          borderRadius: "100px",
          height: "37px",
          p: "8px 60px",
          textTransform: "none",
          fontFamily: "Urbanist",
        }}
      >
        View here
      </Button>
    </Box>
  );
};

export const ProgressLayout = () => {
  const listOfProgress = [
    {
      icon: <SpeedIcon fill={"#fff"} />,
      bgcolor: "#01A8DF",
      border: "#c6f1ffff",
      head: "Speed Drills",
      subHead: "Measuring your learning outcome.",
      value: 16,
    },
    {
      icon: <AccuracyIcon />,
      bgcolor: "#E52293",
      border: "#ffa2d8ff",
      head: "Accuracy Drills",
      subHead: "Measuring your learning outcome.",
      value: 31,
    },
    {
      icon: <TextIcon />,
      bgcolor: "#FF6928",
      border: "#ffb18fff",
      head: "Text Drills",
      subHead: "Practice improves your touch typing.",
      value: 54,
    },
    {
      icon: <GameIcon />,
      bgcolor: "#93C83C",
      border: "#e3ffb5ff",
      head: "Games",
      subHead: "Learning and having fun at the same time.",
      value: 75,
    },
  ];
  return (
    <Box sx={{ m: "0px 20px 0px 20px", color: "#242530" }}>
      {listOfProgress.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            p: "16px",
            justifyContent: "space-between",
            borderBottom: "1px solid #ECECF3 ",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box
              sx={{
                bgcolor: item.bgcolor,
                width: "44px",
                height: "44px",
                border: `4px solid ${item.border}`,
                borderRadius: "44px ",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.icon}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#242530",
                  fontFamily: "Urbanist",
                }}
              >
                {item.head}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Urbanist",
                  color: "#828392",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                {item.subHead}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "54px", ml: "16px" }}>
            <CircularProgressbarWithChildren
              value={item.value}
              strokeWidth={13}
              styles={buildStyles({
                strokeLinecap: "round",
                pathColor: `${item.bgcolor}`,
                trailColor: "#F5F7F9",
              })}
            >
              <Typography
                sx={{
                  fontFamily: "Urbanist",
                  fontWeight: "700",
                  fontSize: "14px",
                  mt: "-12px",
                }}
              >
                {item.value}%
              </Typography>
            </CircularProgressbarWithChildren>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export const CenterFooter = () => {
  const list = [
    {
      icon: <SpeedIcon fill={"#242530"} />,
      name: "See Progress",
      content: "Speed and Accuracy result",
    },
    {
      icon: <ManWithQusMark />,
      name: "Something broken?",
      content: "Get technical support here",
    },
    {
      icon: <BookIcon fill={"#242530"} />,
      name: "Lost your way?",
      content: "Read guidelines here",
    },
  ];
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        color: "#242530",
        gap: "20px",
      }}
    >
      {list.map((item, key) => (
        <Box
          key={key}
          sx={{
            bgcolor: "#fff",
            borderRadius: "24px",
            p: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "19px",
          }}
        >
          <Box
            sx={{
              height: "44px",
              width: "44px",
              bgcolor: "#EDF0F2",
              borderRadius: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.icon}
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "16px",
                fontFamily: "Urbanist",
              }}
            >
              {item.name}
            </Typography>
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                color: "#828392",
                fontFamily: "Urbanist",
              }}
            >
              {item.content}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export const StudentList = () => {
  const studentList = [
    {
      name: "James Cooper",
      studentId: "ST001",
      age: 14,
      status: "Active",
    },
    {
      name: "Lisa Bryson",
      studentId: "ST002",
      age: 10,
      status: "Inactive",
    },
    {
      name: "John Carter",
      studentId: "ST003",
      age: 12,
      status: "Active",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        borderBottom: "1px solid #ECECF3",
      }}
    >
      <Typography
        sx={{ fontFamily: "Urbanist", fontWeight: "700", fontSize: "18px" }}
      >
        Student list
      </Typography>
      {studentList.map((student, index) => (
        <Box
          key={index}
          sx={{
            p: "0 16px 0 16px",
            height: "86px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "20px",
            border: "1px solid #ECECF3",
            backgroundImage:
              index === 0
                ? "linear-gradient(180deg,#922C8880,#922C88)"
                : "#fff",
          }}
        >
          <Box sx={{ display: "flex", gap: "14px" }}>
            <Box
              sx={{
                backgroundColor: "#EDF0F2",
                backgroundImage: `url(${dp})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "54px",
                height: "54px",
                width: "54px",
              }}
            ></Box>
            <Box sx={{ color: index === 0 ? "#fff" : "#000" }}>
              <Typography
                sx={{
                  fontFamily: "Urbanist",
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                {student.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Urbanist",
                  display: "flex",
                  gap: "6px",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {student.studentId}
                <span
                  style={{
                    fontFamily: "Urbanist",
                    color: index === 0 ? "#FFFFFF66" : "#828392",
                  }}
                >
                  &#x2022; Age:
                </span>
                {student.age} Yrs
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              display: "flex",
              textAlign: "center",
              bgcolor: "#FFFFFF",
              borderRadius: "15px",
              border:
                student.status === "Active"
                  ? "1px solid #008000"
                  : "1px solid #DB0000ed",
              color: student.status === "Active" ? "#008000" : "#DB0000ed",
              // width: "61px",
              fontWeight: "600",
              fontSize: "12px",
              p: "6px",
              fontFamily: "Urbanist",
            }}
          >
            &#x2022; {student.status}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export const Calender = () => {
  return (
    <Box sx={{ borderBottom: "1px solid #ECECF3" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            "& .MuiPickersDay-today": {
              background: "#922C88",
              //   borderColor: "#922C88", // Example: blue border for today
              color: "white", // Example: blue text for today
              "&:hover": { bgcolor: "#922C88" },
            },
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: "purple", // Your desired color
              color: "white", // Text color for contrast
              "&:hover": {
                backgroundColor: "darkpurple", // Hover color for selected date
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export const TodayDetails = () => {
  const [date] = useState(dayjs());
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: "20px" }}>
      <Typography
        sx={{
          fontFamily: "Urbanist",
          fontWeight: "700",
          fontSize: "18px",
          pt: "20px",
        }}
      >
        Today, {date.format("DD MMM YYYY")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ECECF3",
          borderRadius: "20px",
          overflow: "hidden",
          height: "161px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            p: "12.5px 0px 12.5px 16px",
            backgroundColor: "#F7F7F7",
          }}
        >
          <ClockIcon />
          <Typography
            sx={{
              fontFamily: "Urbanist",
              fontWeight: "500",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            10:32:10 - 10:32:50
            <span style={{ fontFamily: "Urbanist", fontWeight: "700" }}>
              (0m 40s)
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: "84px",
            }}
          >
            <Typography sx={{ fontFamily: "Urbanist" }}>WPM</Typography>
            <Typography
              sx={{
                fontFamily: "Urbanist",
                fontWeight: "700",
                fontSize: "28px",
              }}
            >
              50
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              // height:'84px'
            }}
          >
            <Typography sx={{ fontFamily: "Urbanist" }}>Error</Typography>
            <Typography
              sx={{
                fontFamily: "Urbanist",
                fontWeight: "700",
                fontSize: "28px",
              }}
            >
              8
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              // height:'84px'
            }}
          >
            <Typography sx={{ fontFamily: "Urbanist" }}>Accuracy</Typography>
            <Box sx={{ height: "54px", width: "54px" }}>
              <CircularProgressbarWithChildren
                value={8}
                // text={`${80}%`}
                strokeWidth={10}
                styles={buildStyles({
                  strokeLinecap: "round",
                  pathColor: `#ff6666`,
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              >
                <Typography
                  sx={{
                    fontFamily: "Urbanist",
                    fontWeight: "700",
                    fontSize: "14px",
                    mt: "-12px",
                  }}
                >
                  8%
                </Typography>
              </CircularProgressbarWithChildren>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
