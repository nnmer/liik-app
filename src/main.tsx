import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

import { move_window, Position } from "tauri-plugin-positioner-api";
move_window(Position.TopRight);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
