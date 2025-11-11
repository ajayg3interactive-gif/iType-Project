import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const selectedChildSlice = createSlice({
  name: "selectedChild",
  initialState: {
    childId: 0,
  },
  reducers: {
    setSelectedChild: (state, action) => {
      state.childId = action.payload;
    },
  },
});

const selectedDateSlice = createSlice({
  name: "selectedDate",
  initialState: {
    date: dayjs().format("YYYY-MM-DD"),
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const selectedChildReducer = selectedChildSlice.reducer;
export const selectedDateReducer = selectedDateSlice.reducer;

export const { setSelectedChild } = selectedChildSlice.actions;
export const { setSelectedDate } = selectedDateSlice.actions;
