import { createSlice } from "@reduxjs/toolkit";

interface IsWritingType {
  isWriting: boolean;
}

const initialState: IsWritingType = {
  isWriting: false,
};

const isWritingSlice = createSlice({
  name: "isWriting",
  initialState,
  reducers: {
    writing: (state) => {
      state.isWriting = true;
    },
    writed: (state) => {
      state.isWriting = false;
    },
  },
});

export const { writing, writed } = isWritingSlice.actions;
export default isWritingSlice.reducer;
