// const fetchStudents =

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRequest } from "../Hooks/axiosRequests";
import { getCurrentUser } from "../Hooks/HelperFunctions";

export const fetchStudent = createAsyncThunk("student/fetch", async () => {
  const currentUser = getCurrentUser();
  const id = currentUser.parent_id;
  const res = await getRequest(`parent/${id}/student-list`);
  return res.data.data;
});

const studentSlice = createSlice({
  name: "studentList",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudent.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.status = "Successed";
        state.data = action.payload;
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
