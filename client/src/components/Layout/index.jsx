import React from "react";

import { Layout, Breadcrumb } from "antd";

import SideMenu from "./SideMenu";
import Footer from "./Footer";

const { Header, Content } = Layout;

const LayoutWithRoute = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu />
      <Layout>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "20px 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Company</Breadcrumb.Item>
            <Breadcrumb.Item>Unit</Breadcrumb.Item>
            <Breadcrumb.Item>Asset</Breadcrumb.Item>
          </Breadcrumb>
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default LayoutWithRoute;
