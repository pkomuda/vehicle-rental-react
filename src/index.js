import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

axios.defaults.baseURL = process.env.REACT_APP_API;

let cookies = new Cookies();
let jwt = require("jsonwebtoken");

export const jwtHeader = () => {
    if (cookies.get("jwt") != null) {
        return {"headers": {"Authorization": "Bearer " + cookies.get("jwt")}};
    }
};

export const currentUser = () => {
    if (cookies.get("jwt") != null) {
        return jwt.decode(cookies.get("jwt"))["sub"];
    }
};

ReactDOM.render(<App/>, document.getElementById("root"));
