import React, { useState, useRef } from "react";

// import { render } from "react-dom";
import { Divider, Row, Col, Tag, Statistic, Progress } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ShowCompanyList from "../Lists/ShowCompanyList";
import ShowUserList from "../Lists/ShowUserList";
import ShowUnitList from "../Lists/ShowUnitList";
import ShowAssetList from "../Lists/ShowAssetList";
import ResponsabilitiesForm from "../Forms/ResponsabilitiesForm";
import axios from "axios";
import "../../style/Dashboard.css";

//First row of Cards
const TopCard = ({ title, tagContent, tagColor, prefix }) => {
  return (
    <Col className="gutter-row" span={6}>
      <div
        className="whiteBox shadow"
        style={{ color: "#595959", fontSize: 13, height: "106px" }}
      >
        <div
          className="pad15 strong"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <h3 style={{ color: "#22075e", marginBottom: 0 }}>{title}</h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          <Row gutter={[0, 0]}>
            <Col className="gutter-row" span={11} style={{ textAlign: "left" }}>
              <div className="left">{prefix}</div>
            </Col>
            <Col className="gutter-row" span={2}>
              <Divider
                style={{ padding: "10px 0", justifyContent: "center" }}
                type="vertical"
              ></Divider>
            </Col>
            <Col
              className="gutter-row"
              span={11}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Tag
                color={tagColor}
                style={{ margin: "0 auto", justifyContent: "center" }}
              >
                {tagContent}
              </Tag>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
};

// Create Constructor
const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
};
const MainPage = () => {
  const [companies, setCompanies] = useState([]);
  const [assets, setAssets] = useState([]);
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);

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

  let healthList = [];
  // let statusList = [];
  let Running = 0;
  let Alerting = 0;
  let Stopped = 0;

  // let assetList;
  if (assets) {
    assets.map((asset, k) => {
      healthList.push(asset.health);
      if (asset.status === "Running") {
        return Running++;
      } else if (asset.status === "Alerting") {
        return Alerting++;
      } else {
        return Stopped++;
      }
      // console.log(healthList);
    });
  }

  //Data for charts
  let runningFrequency = (Running / (Running + Alerting + Stopped)) * 100;
  let downTime = (Running + Alerting) / Stopped;
  const healthChart = {
    title: {
      text: "Health Level",
    },
    series: [
      {
        data: healthList,
      },
    ],
  };

  const statusChart = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Status Quantity",
    },
    // series: [
    //   {
    //     data: [Running, Alerting, Stopped],
    //   },
    // ],
    series: [
      {
        name: "Running",
        data: [Running],
        color: "#389E0D",
      },
      {
        name: "Alerting",
        data: [Alerting],
        color: "#D4B106",
      },
      {
        name: "Stopped",
        data: [Stopped],
        color: "#D4380D",
      },
    ],
  };

  // let companyList;
  // if (!companies) {
  //   companyList = "there is no company recored!";
  // } else {
  //   companyList = companies.map((company, k) => (
  //     <Col className="gutter-row" span={12}>
  //       <div className="whiteBox shadow">
  //         <div className="pad20">
  //           <h3 style={{ color: "#22075e", marginBottom: 5 }}>
  //             Company {company.name}
  //           </h3>
  //         </div>
  //         <div style={{ margin: " 0 0 7px 15px" }}>
  //           Users
  //           {users.map((user) => {
  //             return user.employer === company.name ? (
  //               <>
  //                 <Divider type="vertical" />
  //                 <a href="#">{user.name}</a>
  //               </>
  //             ) : null;
  //           })}
  //         </div>

  //       </div>
  //     </Col>
  //   ));
  // }
  // <SubMenu
  //   company={company}
  //   key={company._id}
  //   icon={<TrademarkCircleOutlined />}
  //   title={company.name}
  // >
  //   <Menu.Item key={"/show-company/" + company._id}>
  //     <SettingOutlined />
  //     <span>Config.</span>
  //     <Link to={"/show-company/" + company._id}></Link>
  //   </Menu.Item>
  //   {units.map((unit) => {
  //     return unit.owner === company.name ? (
  //       <SubMenu
  //         icon={<ShopOutlined />}
  //         title={unit.name}
  //         key={unit._id}
  //         unit={unit}
  //       >
  //         <Menu.Item key={"/show-unit/" + unit._id}>
  //           <SettingOutlined />
  //           <span>Config.</span>
  //           <Link to={"/show-unit/" + unit._id}></Link>
  //         </Menu.Item>
  //         {assets.map((asset) => {
  //           return asset.owner === unit.name ? (
  //             <Menu.Item
  //               // title={asset.name}
  //               // key={asset._id}
  //               asset={asset}
  //               key={"/show-asset/" + asset._id}
  //               // key="7"
  //             >
  //               {asset.name}
  //               <Link to={"/show-asset/" + asset._id}></Link>
  //             </Menu.Item>
  //           ) : null;
  //         })}
  //       </SubMenu>
  //     ) : null;
  //   })}
  //   {users.map((user) => {
  //     return user.employer === company.name ? (
  //       <SubMenu
  //         icon={<UserOutlined />}
  //         title={user.name}
  //         key={user._id}
  //         user={user}
  //       >
  //         <Menu.Item key={"/show-user/" + user._id}>
  //           <SettingOutlined />

  //           <span>Config.</span>
  //           <Link to={"/show-user/" + user._id}></Link>
  //         </Menu.Item>
  //       </SubMenu>
  //     ) : null;
  //   })}
  // </SubMenu>

  useConstructor(() => {
    getCompanies();
    getAssets();
    getUnits();
    getUsers();
  });

  return (
    <>
      <Row gutter={[24, 24]}>
        <TopCard
          title={"Companies"}
          tagColor={"cyan"}
          prefix={"Total Companies"}
          tagContent={companies.length}
        />
        <TopCard
          title={"Units"}
          tagColor={"purple"}
          prefix={"Total Units"}
          tagContent={units.length}
        />
        <TopCard
          title={"Users"}
          tagColor={"green"}
          prefix={"Total Users"}
          tagContent={users.length}
        />
        <TopCard
          title={"Assets"}
          tagColor={"red"}
          prefix={"Total Assets"}
          tagContent={assets.length}
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={24}>
          <div className="whiteBox shadow" style={{ height: "380px" }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={healthChart}
              style={{ margin: "130px" }}
            />
          </div>
        </Col>
      </Row>
      <div className="space30"></div>

      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={18}>
          <div className="whiteBox shadow" style={{ height: "380px" }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={statusChart}
              style={{ margin: "130px" }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className="whiteBox shadow" style={{ height: "380px" }}>
            <div
              className="pad20"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <h3 style={{ color: "#22075e", marginBottom: 30 }}>
                Status Preview
              </h3>

              <Progress
                type="dashboard"
                percent={runningFrequency.toFixed(2)}
                width={148}
              />
              <p>Running Status Frequency</p>
              <Divider />
              <Statistic
                title="Downtime Reduction"
                value={downTime}
                precision={2}
                valueStyle={
                  Running + Alerting > Stopped
                    ? { color: "#389E0D" }
                    : { color: "#D4380D" }
                }
                prefix={
                  Running + Alerting > Stopped ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
                suffix="%"
              />
            </div>
          </div>
        </Col>
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={12}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>Companies</h3>
            </div>
            <ShowCompanyList />
          </div>
        </Col>

        <Col className="gutter-row" span={12}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>Users</h3>
            </div>
            <ShowUserList />
          </div>
        </Col>
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={12}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>Assets</h3>
            </div>
            <ShowAssetList />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>Units</h3>
            </div>
            <ShowUnitList />
          </div>
        </Col>
      </Row>
      <div className="space30"></div>

      <ResponsabilitiesForm />
    </>
  );
};

export default MainPage;
