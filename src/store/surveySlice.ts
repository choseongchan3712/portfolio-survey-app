import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewPageType, Question } from "../types";

const initialState: NewPageType = {
  survey: {
    title: {
      detail: "제목 없는 설문지",
      isItalic: false,
      isBold: false,
      isUnderLine: false,
    },
    titleExplain: {
      detail: "",
      isItalic: false,
      isBold: false,
      isUnderLine: false,
    },
    question: [
      {
        number: 1,
        name: "",
        isItalic: false,
        isBold: false,
        isUnderLine: false,
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
    titleBold: (state) => {
      state.survey.title.isBold = true;
    },
    titleNotBold: (state) => {
      state.survey.title.isBold = false;
    },
    titleItalic: (state) => {
      state.survey.title.isItalic = true;
    },
    titleNotItalic: (state) => {
      state.survey.title.isItalic = false;
    },
    titleUnderLine: (state) => {
      state.survey.title.isUnderLine = true;
    },
    titleNotUnderLine: (state) => {
      state.survey.title.isUnderLine = false;
    },
    writeExplain: (state, action: PayloadAction<string>) => {
      state.survey.titleExplain.detail = action.payload;
    },
    explainBold: (state) => {
      state.survey.titleExplain.isBold = true;
    },
    explainNotBold: (state) => {
      state.survey.titleExplain.isBold = false;
    },
    explainItalic: (state) => {
      state.survey.titleExplain.isItalic = true;
    },
    explainNotItalic: (state) => {
      state.survey.titleExplain.isItalic = false;
    },
    explainUnderLine: (state) => {
      state.survey.titleExplain.isUnderLine = true;
    },
    explainNotUnderLine: (state) => {
      state.survey.titleExplain.isUnderLine = false;
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
  titleBold,
  titleNotBold,
  titleItalic,
  titleNotItalic,
  titleUnderLine,
  titleNotUnderLine,
  writeExplain,
  explainBold,
  explainNotBold,
  explainItalic,
  explainNotItalic,
  explainUnderLine,
  explainNotUnderLine,
  questionChange,
  reorderQuestion,
} = surverySlice.actions;
export default surverySlice.reducer;
