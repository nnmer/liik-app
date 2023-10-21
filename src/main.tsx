import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import theme from "./theme.ts";

import { Config } from "./modules/Config";

Config.init()
.then(()=>{
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </React.StrictMode>,
  );
})

