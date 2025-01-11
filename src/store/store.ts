import { configureStore } from "@reduxjs/toolkit";
import newPageClickedReducer from "./newPageClickedSlice";

export const store = configureStore({
  reducer: {
    newPageClicked: newPageClickedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
