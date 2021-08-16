import React, { useState } from "react";
import { Layout, Menu } from "antd";

import {
  TrademarkCircleOutlined,
  HomeOutlined,
  ShopOutlined,
  TagsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
const { Sider } = Layout;

const { SubMenu } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <Menu
        theme="dark"
        // defaultSelectedKeys={["1"]}
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
      >
        <Menu.Item key="/">
          <HomeOutlined />
          <span>Home</span>
          <Link to="/"></Link>
        </Menu.Item>
        <SubMenu
          key="/management"
          icon={<TrademarkCircleOutlined />}
          title="Freios Supremos"
          link={<Link to="/management" />}
        >
          <Menu.Item key="/management">
            <HomeOutlined />
            <span>management</span>
            <Link to="/management"></Link>
          </Menu.Item>
          <SubMenu key="sub3" icon={<UserOutlined />} title="User">
            <Menu.Item key="2">Emerson</Menu.Item>
            <Menu.Item key="3">Roberta</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<ShopOutlined />} title="Unit">
            <SubMenu key="sub5" icon={<TagsOutlined />} title="West Industry">
              <Menu.Item key="3">Transmission</Menu.Item>
              <Menu.Item key="4">Brake</Menu.Item>
              <Menu.Item key="5">Steering</Menu.Item>
              <Menu.Item key="6">Belt</Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<TagsOutlined />} title="East Industry">
              <Menu.Item key="7">Suspension</Menu.Item>
              <Menu.Item key="8">Chassis</Menu.Item>
              <Menu.Item key="9">Air Filter</Menu.Item>
              <Menu.Item key="10">Lights</Menu.Item>
              <Menu.Item key="11">Oil Filter</Menu.Item>
              <Menu.Item key="12">Coolant</Menu.Item>
            </SubMenu>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
export default App;
