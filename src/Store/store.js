import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentSlice";
import selectedChildIdReducer from "./selectedChildSlice";

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    selectedChild: selectedChildIdReducer,
  },
});
