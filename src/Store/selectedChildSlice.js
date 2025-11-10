import { createSlice } from "@reduxjs/toolkit";

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
export default selectedChildSlice.reducer;
export const { setSelectedChild } = selectedChildSlice.actions;
