import React, { useState } from "react";
import "./App.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  TrademarkCircleOutlined,
  HomeOutlined,
  ShopOutlined,
  TagsOutlined,
  TeamOutlined,
  UserOutlined,
  HeartTwoTone,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <SubMenu key="sub1" icon={<TeamOutlined />} title="Management">
            <SubMenu
              key="sub2"
              icon={<TrademarkCircleOutlined />}
              title="Freios Supremos"
            >
              <SubMenu key="sub3" icon={<UserOutlined />} title="User">
                <Menu.Item key="2">Emerson</Menu.Item>
                <Menu.Item key="3">Roberta,</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" icon={<ShopOutlined />} title="Unit">
                <SubMenu
                  key="sub5"
                  icon={<TagsOutlined />}
                  title="West Industry"
                >
                  <Menu.Item key="3">Transmission</Menu.Item>
                  <Menu.Item key="4">Brake</Menu.Item>
                  <Menu.Item key="5">Steering</Menu.Item>
                  <Menu.Item key="6">Belt</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub6"
                  icon={<TagsOutlined />}
                  title="East Industry"
                >
                  <Menu.Item key="7">Suspension</Menu.Item>
                  <Menu.Item key="8">Chassis</Menu.Item>
                  <Menu.Item key="9">Air Filter</Menu.Item>
                  <Menu.Item key="10">Lights</Menu.Item>
                  <Menu.Item key="11">Oil Filter</Menu.Item>
                  <Menu.Item key="12">Coolant</Menu.Item>
                </SubMenu>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Made with <HeartTwoTone twoToneColor="#FF3333" /> in Sao Paulo
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
