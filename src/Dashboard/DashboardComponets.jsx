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
  StarIcon,
  TextIcon,
} from "../Compoents/SvgIcons";
import defaultAvatar from "../assets/Frame 2.png";
import giftBG from "../assets/GiftBg.png";
import dp from "../assets/image 3.png";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getRequest } from "../Hooks/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudent } from "../Store/studentSlice";
import { setSelectedChild, setSelectedDate } from "../Store/helperSlices";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { getCurrentUser } from "../Hooks/HelperFunctions";

export const UserLog = () => {
  const currentUser = getCurrentUser();

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
              textTransform: "none",
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
  const childId = useSelector((state) => state.selectedChild.childId);
  const [taskCount, setTaskCount] = useState([]);

  const selectedID = async () => {
    const res = await getRequest(`get-tasks-count/${childId}`);
    setTaskCount(res.data.data);
    // console.log(res.data);
  };
  useEffect(() => {
    if (childId) {
      selectedID();
    }
  }, [childId]);

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
          value={(taskCount.completed_count / taskCount.total_count) * 100}
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
            {taskCount?.completed_count || 0}
            <Typography
              sx={{
                fontFamily: "Urbanist",
                fontWeight: "600",
                fontSize: "14px",
                color: "#828392",
              }}
            >
              /{taskCount.total_count || 0} <br /> completed
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

export const TotalPoints = () => {
  const childId = useSelector((state) => state.selectedChild.childId);
  const [pointsData, setPointsData] = useState([]);

  const fetchTotalPoints = async () => {
    try {
      const res = await getRequest(`/student-points/${childId}`);
      // console.log(res.data);
      setPointsData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (childId) {
      fetchTotalPoints();
    }
  }, [childId]);
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: "24px",
        p: "10px 20px",
        display: "flex",
        // justifyContent:'center',
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          bgcolor: "#FFC63A",
          p: "10px",
          borderRadius: "50px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <StarIcon />
      </Box>
      <Box>
        <Typography
          sx={{ fontFamily: "Urbanist", fontWeight: "700", fontSize: "18px" }}
        >
          Total Points Collected
        </Typography>
        <Typography
          sx={{
            fontFamily: "Urbanist",
            fontWeight: "800",
            fontSize: "28px",
            color: "#FFC63A",
          }}
        >
          {pointsData?.usedpoints?.points || 0} Points
        </Typography>
      </Box>
    </Box>
  );
};

export const ProgressLayout = () => {
  const childId = useSelector((state) => state.selectedChild.childId);
  const [drils, setDrils] = useState([]);

  const parsedData = Object.fromEntries(
    Object.entries(drils).map(([key, value]) => [key, parseFloat(value)])
  );

  const selectedID = async () => {
    // console.log(childId);

    const res = await getRequest(`/parent/drill-score/${childId}`);
    // console.log(res);
    setDrils(res.data.data);
  };

  useEffect(() => {
    if (childId) {
      selectedID();
    }
  }, [childId]);

  const listOfProgress = [
    {
      icon: <SpeedIcon fill={"#fff"} />,
      bgcolor: "#01A8DF",
      border: "#c6f1ffff",
      head: "Speed Drills",
      subHead: "Measuring your learning outcome.",
      value: parsedData?.speedAccDrillCount || 0,
    },
    // {
    //   icon: <AccuracyIcon />,
    //   bgcolor: "#E52293",
    //   border: "#ffa2d8ff",
    //   head: "Accuracy Drills",
    //   subHead: "Measuring your learning outcome.",
    //   // value:,
    // },
    {
      icon: <TextIcon />,
      bgcolor: "#FF6928",
      border: "#ffb18fff",
      head: "Text Drills",
      subHead: "Practice improves your touch typing.",
      value: parsedData?.textDrillCount || 0,
    },
    {
      icon: <GameIcon />,
      bgcolor: "#93C83C",
      border: "#e3ffb5ff",
      head: "Games",
      subHead: "Learning and having fun at the same time.",
      value: parsedData?.gameDrillCount || 0,
    },
  ];
  return (
    <Box sx={{ m: "0px 20px 0px 20px", color: "#242530" }}>
      {listOfProgress.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            p: "13px",
            justifyContent: "space-between",
            // alignItems:'center',
            borderBottom: "1px solid #ECECF3 ",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
              {/* {console.log(drils)} */}
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
                  mt: "-20px",
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
  const [activeChild, setActiveChild] = useState(0);

  const {
    data: students,
    status,
    error,
  } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudent());
    }
  }, []);

  useEffect(() => {
    if (activeChild === 0) dispatch(setSelectedChild(students[0]?.id));
  }, [status]);

  if (status === "loading") {
    return <p>Loading users....</p>;
  }

  if (status === "failed") {
    return <p>Error:{error}</p>;
  }
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
      {/* {console.log(students)} */}
      {students.length ? (
        students.map((child, index) => {
          const isActive = index === activeChild;
          return (
            <Box
              key={index}
              onClick={() => {
                setActiveChild(index);
                dispatch(setSelectedChild(child.id));
              }}
              sx={{
                p: "0 16px 0 16px",
                height: "86px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "20px",
                border: "1px solid #ECECF3",
                backgroundImage: isActive
                  ? "linear-gradient(180deg,#922C8880,#922C88)"
                  : "#fff",
              }}
            >
              <Box sx={{ display: "flex", gap: "14px" }}>
                <Box
                  sx={{
                    backgroundColor: "#EDF0F2",
                    backgroundImage: `url(${child.profile_image_url || dp})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius: "54px",
                    height: "54px",
                    width: "54px",
                  }}
                ></Box>
                <Box sx={{ color: isActive ? "#fff" : "#000" }}>
                  <Typography
                    sx={{
                      fontFamily: "Urbanist",
                      fontWeight: "700",
                      fontSize: "16px",
                    }}
                  >
                    {child.full_name}
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
                    {child.student_code}
                    <span
                      style={{
                        fontFamily: "Urbanist",
                        color: index === 0 ? "#FFFFFF66" : "#828392",
                      }}
                    >
                      &#x2022; Age:
                    </span>
                    {child.age}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  display: "flex",
                  textAlign: "center",
                  bgcolor: "#FFFFFF",
                  borderRadius: "15px",
                  border: child.status
                    ? "1px solid #008000"
                    : "1px solid #DB0000ed",
                  color: child.status ? "#008000" : "#DB0000ed",
                  width: "61px",
                  fontWeight: "600",
                  fontSize: "12px",
                  p: "6px",
                  fontFamily: "Urbanist",
                }}
              >
                &#x2022; {child.status ? "Active" : "Inactive"}
              </Typography>
            </Box>
          );
        })
      ) : (
        <>
          <Box
            sx={{
              p: "0 16px 0 16px",
              height: "86px",
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "20px",
              border: "1px solid #ECECF3",
              backgroundImage: "linear-gradient(180deg,#922C8880,#922C88)",
            }}
          >
            <Typography
              sx={{ bgcolor: "#fff", borderRadius: "18px", p: "10px" }}
            >
              Add Child
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export const Calender = () => {
  const [selected, setSelected] = useState(dayjs());
  const [datesFetch, setDatesFetch] = useState([]);
  const dispatch = useDispatch();
  const childId = useSelector((state) => state.selectedChild.childId);

  const handleDateChange = (newValue) => {
    if (!newValue) return;
    setSelected(newValue);
    const formatted = dayjs(newValue).format("YYYY-MM-DD");
    dispatch(setSelectedDate(formatted));
  };

  useEffect(() => {
    if (childId) {
      fetchActiveDates();
    }
  }, [selected, childId]);

  const fetchActiveDates = async () => {
    const date = selected.format("YYYY-MM-DD");
    try {
      const res = await getRequest(
        `get-activity-dates/${childId}?date=${date}`
      );
      const dates = res?.data?.data || [];
      setDatesFetch(dates);
    } catch (error) {
      console.log(error);
    }
  };

  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const formattedDay = day.format("YYYY-MM-DD");
    const isActive = datesFetch.includes(formattedDay);

    return (
      <Box sx={{ position: "relative" }}>
        <PickersDay
          day={day}
          outsideCurrentMonth={outsideCurrentMonth}
          {...other}
        />
        {isActive && (
          <CheckCircleIcon
            sx={{
              position: "absolute",
              bottom: 0,
              right: "50%",
              transform: "translateX(50%)",
              fontSize: 13,
              color: "green",
              bgcolor: "#fff",
              borderRadius: "20px",
            }}
          />
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ borderBottom: "1px solid #ECECF3" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selected}
          onChange={handleDateChange}
          slots={{
            day: CustomDay,
          }}
          sx={{
            "& .MuiPickersDay-today": {
              background: "#922C88",
              color: "white",
              "&:hover": { bgcolor: "#922C88" },
            },
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: "purple",
              color: "white",
              "&:hover": {
                backgroundColor: "darkpurple",
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export const PerformanceDetails = () => {
  const dateString = useSelector((state) => state.selectedDate.date);
  const date = dayjs(dateString);
  const formattedDate = date.format("YYYY-MM-DD");
  const childId = useSelector((state) => state.selectedChild.childId);
  const [performanceData, setPerformanceData] = useState([]);
  // console.log("----", date);

  useEffect(() => {
    if (childId) {
      fetchActivityPerformance();
    }
  }, [childId, dateString]);
  const fetchActivityPerformance = async () => {
    try {
      const res = await getRequest(
        `get-activity-performance/${childId}/${formattedDate}`
      );
      // console.log(res.data);
      setPerformanceData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const second =
    performanceData?.text_drill_counts?.total_spend_time_seconds || 0;
  const mins = Math.floor(second / 60);
  const sec = second % 60;
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
        Today, {date.format("DD-MMM-YY")}
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
              fontWeight: "650",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Total time spent
            <span style={{ fontFamily: "Urbanist", fontWeight: "700" }}>
              ( {mins} min: {sec} s )
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
              {performanceData?.text_drill_counts?.word_per_min || 0}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: "84px",
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
              {performanceData?.text_drill_counts?.avg_wrong_key || 0}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: "84px",
            }}
          >
            <Typography sx={{ fontFamily: "Urbanist" }}>Accuracy</Typography>
            <Box sx={{ width: "58px", mt: "10px" }}>
              <CircularProgressbarWithChildren
                value={performanceData?.text_drill_counts?.accuracy_percentage}
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
                    fontWeight: "600",
                    fontSize: "12px",
                    mt: "-17px",
                  }}
                >
                  {performanceData?.text_drill_counts?.accuracy_percentage || 0}
                  %
                </Typography>
              </CircularProgressbarWithChildren>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
