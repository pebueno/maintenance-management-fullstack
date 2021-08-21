// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import React from "react";
import React, { useState, useRef } from "react";

import { render } from "react-dom";
import { Divider, Row, Col, Tag, Statistic, Progress } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import CompanyForm from "../Forms/CompanyForm";
import ShowCompanyList from "../Lists/ShowCompanyList";
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
  const [assets, setAssets] = useState([]);

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
        Running++;
      } else if (asset.status === "Alerting") {
        Alerting++;
      } else {
        Stopped++;
      }
      console.log(healthList);
    });
  }
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

  // function getData(){
  //   axios.get(process.env.REACT_APP_API_URL + "/companies")
  // }

  // const [allCompanies, setAllCompanies] = useState([]);

  // useEffect(() => {
  //   axios.get(process.env.REACT_APP_API_URL + "/companies").then((res) => {
  //     setAllCompanies(res.data);
  //     console.log(res.data);
  //   });
  // }, []);
  // const data = [{}];
  // allCompanies.map((company) => {
  //   console.log(company.name);
  // data.push({
  //   name: company.name,
  // });
  // return data;
  // });
  useConstructor(() => {
    // getCompanies();
    getAssets();
    // getUnits();
    // getUsers();
  });
  return (
    <>
      {/* <Row style={{ background: "#FFF", margin: "2%", minWidth: "760px" }}>
        <Col xl={8} xs={12} style={{ paddingLeft: "15px" }}> */}
      {/* <CompanyForm /> */}
      {/* </Col>
        <Col xl={16} xs={12} style={{ paddingRight: "30px" }}> */}
      <Row gutter={[24, 24]}>
        <TopCard
          title={"Leads"}
          tagColor={"cyan"}
          prefix={"This month"}
          tagContent={"34 000 $"}
        />
        <TopCard
          title={"Order"}
          tagColor={"purple"}
          prefix={"This month"}
          tagContent={"34 000 $"}
        />
        <TopCard
          title={"Payment"}
          tagColor={"green"}
          prefix={"This month"}
          tagContent={"34 000 $"}
        />
        <TopCard
          title={"Due Balance"}
          tagColor={"red"}
          prefix={"Not Paid"}
          tagContent={"34 000 $"}
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
                Customer Preview
              </h3>

              <Progress type="dashboard" percent={25} width={148} />
              <p>New Customer this Month</p>
              <Divider />
              <Statistic
                title="Active Customer"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </div>
          </div>
        </Col>
      </Row>
      <div></div>

      <ShowCompanyList />
      <ResponsabilitiesForm />
      {/* </Col>
      </Row> */}
    </>
  );
};

export default MainPage;
