import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import MenuContext from "./context/MenuContext";
import WindowContext from "./context/WindowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MenuContext>
      <WindowContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WindowContext>
    </MenuContext>
  </React.StrictMode>
);
