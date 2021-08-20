import React, { useState, useRef } from "react";
import { Layout, Menu } from "antd";
import axios from "axios";

import {
  TrademarkCircleOutlined,
  HomeOutlined,
  ShopOutlined,
  TagsOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;

const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
};

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [assets, setAssets] = useState([]);
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);

  const location = useLocation();

  //Read Operation - List Companies
  function getCompanies() {
    axios
      .get(process.env.REACT_APP_API_URL + "/companies")
      .then((res) => {
        setCompanies(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("Error listing the companies");
      });
  }
  //Read Operation - List Units
  function getUnits() {
    axios
      .get(process.env.REACT_APP_API_URL + "/units")
      .then((res) => {
        setUnits(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("Error listing the units");
      });
  }
  //Read Operation - List Users
  function getUsers() {
    axios
      .get(process.env.REACT_APP_API_URL + "/users")
      .then((res) => {
        setUsers(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("Error listing the users");
      });
  }
  //Read Operation - List Assets
  function getAssets() {
    axios
      .get(process.env.REACT_APP_API_URL + "/assets")
      .then((res) => {
        setAssets(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("Error listing the assets");
      });
  }

  let companyList;
  if (!companies) {
    companyList = "there is no company recored!";
  } else {
    companyList = companies.map((company, k) => (
      <SubMenu
        company={company}
        key={company._id}
        icon={<TrademarkCircleOutlined />}
        title={company.name}
      >
        <Menu.Item key={"/show-company/" + company._id}>
          <HomeOutlined />
          <span>management</span>
          <Link to={"/show-company/" + company._id}></Link>
        </Menu.Item>
        {units.map((unit) => {
          return unit.owner === company.name ? (
            <SubMenu
              icon={<ShopOutlined />}
              title={unit.name}
              key={unit._id}
              unit={unit}
            >
              <Menu.Item key={"/show-unit/" + unit._id}>
                <HomeOutlined />
                <span>management</span>
                <Link to={"/show-unit/" + unit._id}></Link>
              </Menu.Item>
              {assets.map((asset) => {
                return asset.owner === unit.name ? (
                  <Menu.Item
                    // title={asset.name}
                    // key={asset._id}
                    asset={asset}
                    key={"/show-asset/" + asset._id}
                    // key="7"
                  >
                    {asset.name}
                    <Link to={"/show-asset/" + asset._id}></Link>
                  </Menu.Item>
                ) : null;
              })}
            </SubMenu>
          ) : null;
        })}
        {users.map((user) => {
          return user.employer === company.name ? (
            <SubMenu
              icon={<UserOutlined />}
              title={user.name}
              key={user._id}
              user={user}
            >
              <Menu.Item key={"/show-user/" + user._id}>
                <HomeOutlined />
                <span>management</span>
                <Link to={"/show-user/" + user._id}></Link>
              </Menu.Item>
            </SubMenu>
          ) : null;
        })}
      </SubMenu>
    ));
  }

  // let unitList;
  // if (!units) {
  //   unitList = "there is no unit recored!";
  // } else {
  //   unitList = units.map((unit, k) => (

  //     <SubMenu
  //     icon={<ShopOutlined />}
  //     title={unit.name}
  //       key={unit._id}
  //             unit={unit}
  //     >
  //       <Menu.Item key={"/show-unit/" + unit._id}>
  //         <HomeOutlined />
  //         <span>management</span>
  //         <Link to={"/show-unit/" + unit._id}></Link>
  //       </Menu.Item>
  //     </SubMenu>
  //   ));
  // }

  useConstructor(() => {
    getCompanies();
    getAssets();
    getUnits();
    getUsers();
  });
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
          key="freiosSupremos"
          icon={<TrademarkCircleOutlined />}
          title="Freios Supremos"
          // link={<Link to="/management" />}
        >
          <Menu.Item key="/management">
            <HomeOutlined />
            <span>management</span>
            <Link to="/management"></Link>
          </Menu.Item>
          <SubMenu key="sub3" icon={<UserOutlined />} title="User">
            <Menu.Item key="1">Emerson</Menu.Item>
            <Menu.Item key="2">Roberta</Menu.Item>
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
        {companyList}
      </Menu>
    </Sider>
  );
};

export default SideMenu;
