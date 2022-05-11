import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import "./main.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
