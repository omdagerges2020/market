import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./ReduxSystem/Store/store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);
