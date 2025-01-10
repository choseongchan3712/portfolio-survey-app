import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyled } from "./GlobalStyled";
import Router from "./Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyled />
    <Router />
  </React.StrictMode>
);
