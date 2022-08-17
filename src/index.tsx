import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import "./index.css";
import { darkTheme } from "./theme";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
