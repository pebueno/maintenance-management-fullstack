import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./App.css";

import {
  BrowserRouter as Router,
  // Route,
  Switch,
  // Link,
  // Redirect,
} from "react-router-dom";
import RouteApp from "./components/App";
//Pages
import MainPage from "./pages";
import ManagePage from "./pages/management";

// import NotFound from "./pages/404";

ReactDOM.render(
  <Router>
    <Switch>
      <RouteApp exact path="/" component={MainPage} />
      <RouteApp exact path="/management" component={ManagePage} />
      {/* <Route exact path="/404" component={NotFound} /> */}
      {/* <Redirect to="/404" /> */}
    </Switch>
  </Router>,

  document.getElementById("root")
);
