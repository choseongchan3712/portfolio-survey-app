import { configureStore } from "@reduxjs/toolkit";
import newPageClickedReducer from "./newPageClickedSlice";
import surveyReducer from "./surveySlice";
import isWritingReducer from "./IsWritingSlice";

export const store = configureStore({
  reducer: {
    newPageClicked: newPageClickedReducer,
    survey: surveyReducer,
    isWriting: isWritingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
