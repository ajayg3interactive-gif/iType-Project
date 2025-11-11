import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentSlice";
import {selectedChildReducer ,selectedDateReducer} from "./helperSlices";

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    selectedChild: selectedChildReducer,
    selectedDate: selectedDateReducer,
  },
});
