import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/homePage";
import "antd/dist/antd.css";
import { ToggleProvider } from "./utils/context/ToggleContext";

ReactDOM.render(
    <ToggleProvider>
        <App />
    </ToggleProvider>,
    document.getElementById("root"));
