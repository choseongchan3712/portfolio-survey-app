import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyled } from "./GlobalStyled";
import Router from "./Router";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyled />
      <Router />
    </Provider>
  </React.StrictMode>
);
