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
import SideMenu from "./components/Layout/SideMenu";
import Footer from "./components/Layout/Footer";

//Pages
import MainPage from "./pages";
import NotFound from "./pages/404";
import ManagePage from "./pages/management";
import ShowCompanyDetails from "./pages/Details/ShowCompanyDetails";
import ShowUnitDetails from "./pages/Details/ShowUnitDetails";
import UpdateCompanyInfo from "./pages/Update/UpdateCompanyInfo";
import UpdateUnitInfo from "./pages/Update/UpdateUnitInfo";

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <SideMenu />
          <Layout>
            <Header
              className="site-layout-background"
              style={{ padding: 0, background: "#F0F2F5" }}
            />
            <Content style={{ margin: "20px 16px" }}>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/management" component={ManagePage} />
                <Route
                  path="/show-company/:id"
                  component={ShowCompanyDetails}
                />
                <Route path="/show-unit/:id" component={ShowUnitDetails} />
                <Route path="/edit-company/:id" component={UpdateCompanyInfo} />
                <Route path="/edit-unit/:id" component={UpdateUnitInfo} />
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
