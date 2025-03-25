import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router";
import { store } from "./services/store";
import "./index.css";

const basename = process.env.NODE_ENV === "production" ? "/react-burger" : "/";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router basename={basename}>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
);
