import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import App from "./App";
import "./index.css";

Modal.setAppElement("#modal");

ReactDOM.render(<App />, document.getElementById("root"));
