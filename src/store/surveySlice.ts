import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewPageType, Question } from "../types";

const initialState: NewPageType = {
  survey: {
    title: {
      detail: "제목 없는 설문지",
      text: "normal",
    },
    titleExplain: {
      detail: "",
      text: "normal",
    },
    question: [
      {
        number: 1,
        name: "",
        type: "choice",
        option: [{ number: 1, name: "옵션1" }],
        isRequired: false,
      },
    ],
  },
};

const surverySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    wirteTitle: (state, action: PayloadAction<string>) => {
      state.survey.title.detail = action.payload;
    },
    titleType: (state, action: PayloadAction<string>) => {
      state.survey.title.text = action.payload;
    },
    writeExplain: (state, action: PayloadAction<string>) => {
      state.survey.titleExplain.detail = action.payload;
    },
    explainType: (state, action: PayloadAction<string>) => {
      state.survey.titleExplain.text = action.payload;
    },
    questionChange: (state, action: PayloadAction<Question[]>) => {
      state.survey.question = action.payload;
    },
    reorderQuestion: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const updatedQuestions = [...state.survey.question];
      const [removed] = updatedQuestions.splice(dragIndex, 1);
      updatedQuestions.splice(hoverIndex, 0, removed);
      state.survey.question = updatedQuestions.map((question, index) => ({
        ...question,
        number: index + 1,
      }));
    },
  },
});

export const {
  wirteTitle,
  titleType,
  writeExplain,
  explainType,
  questionChange,
  reorderQuestion,
} = surverySlice.actions;
export default surverySlice.reducer;
