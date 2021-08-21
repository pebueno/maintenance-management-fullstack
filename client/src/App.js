import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { Layout } from "antd";

// Components
import SideMenu from "./Components/Layout/SideMenu";
import Footer from "./Components/Layout/Footer";

//Pages
import MainPage from "./Components/Pages";
import NotFound from "./Components/Pages/404";
import ManagePage from "./Components/Pages/management";
import CreatePage from "./Components/Pages/create";
import ShowCompanyDetails from "./Components/Pages/Details/ShowCompanyDetails";
import ShowUnitDetails from "./Components/Pages/Details/ShowUnitDetails";
import ShowUserDetails from "./Components/Pages/Details/ShowUserDetails";
import ShowAssetDetails from "./Components/Pages/Details/ShowAssetDetails";

import UpdateCompanyInfo from "./Components/Pages/Updates/UpdateCompanyInfo";
import UpdateUnitInfo from "./Components/Pages/Updates/UpdateUnitInfo";
import UpdateUserInfo from "./Components/Pages/Updates/UpdateUserInfo";
import UpdateAssetInfo from "./Components/Pages/Updates/UpdateAssetInfo";

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <SideMenu />
          <Layout className="siteBorder">
            <Header
              className="site-layout-background"
              style={{ padding: 0, background: "#F0F2F5" }}
            />
            <Content style={{ margin: "20px 28px" }}>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/management" component={ManagePage} />
                <Route path="/create" component={CreatePage} />
                <Route
                  path="/show-company/:id"
                  component={ShowCompanyDetails}
                />
                <Route path="/show-unit/:id" component={ShowUnitDetails} />
                <Route path="/show-user/:id" component={ShowUserDetails} />
                <Route path="/show-asset/:id" component={ShowAssetDetails} />
                <Route path="/edit-company/:id" component={UpdateCompanyInfo} />
                <Route path="/edit-unit/:id" component={UpdateUnitInfo} />
                <Route path="/edit-user/:id" component={UpdateUserInfo} />
                <Route path="/edit-asset/:id" component={UpdateAssetInfo} />
                <Route exact path="/404" component={NotFound} />
                <Redirect to="/404" />
              </Switch>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
