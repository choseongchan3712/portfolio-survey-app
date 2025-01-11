import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClickedType {
  name: string;
}

const initialState: ClickedType = {
  name: "question_0",
};

const newPageClickedSlice = createSlice({
  name: "newPageClicked",
  initialState,
  reducers: {
    titleClicked: (state) => {
      state.name = "title";
    },
    answerClicked: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    spaceClicked: (state) => {
      state.name = "space";
    },
    reset: (state) => {
      state.name = `${initialState}`;
    },
  },
});

export const { titleClicked, answerClicked, reset, spaceClicked } =
  newPageClickedSlice.actions;
export default newPageClickedSlice.reducer;
