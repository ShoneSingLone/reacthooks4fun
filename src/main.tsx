import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import { App } from "./App";
import "@alicloudfe/components/dist/hybridcloud.css";
/* <React.StrictMode>  */
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
