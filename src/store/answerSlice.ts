import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnswerSliceType, AnswerType } from "../types";

const initialState: AnswerSliceType = {
  answers: [{ id: 1, question: "", value: "" }],
};

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    resetAnswer: (state, action) => {
      const datas = action.payload;
      const updateDatas = datas.map((data: any) => ({
        id: data.number,
        question: data.name,
        value: "",
      }));
      state.answers = updateDatas;
    },
    updateAnswer: (state, action) => {
      const { id, value } = action.payload;
      const updateData = state.answers.map((data) =>
        data.id === id ? { ...data, value: value } : data
      );
      state.answers = updateData;
    },
  },
});

export const {resetAnswer, updateAnswer} = answerSlice.actions;
export default answerSlice.reducer;
