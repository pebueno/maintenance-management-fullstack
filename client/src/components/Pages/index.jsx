// import React, { useEffect, useState } from "react";
// import axios from "axios";
import React from "react";
import { Row, Col } from "antd";

// import CompanyForm from "../Forms/CompanyForm";
import ShowCompanyList from "../Lists/ShowCompanyList";
import ResponsabilitiesForm from "../Forms/ResponsabilitiesForm";

const MainPage = () => {
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

  return (
    <>
      {/* <Row style={{ background: "#FFF", margin: "2%", minWidth: "760px" }}>
        <Col xl={8} xs={12} style={{ paddingLeft: "15px" }}> */}
      {/* <CompanyForm /> */}
      {/* </Col>
        <Col xl={16} xs={12} style={{ paddingRight: "30px" }}> */}
      <ShowCompanyList />
      <ResponsabilitiesForm />
      {/* </Col>
      </Row> */}
    </>
  );
};

export default MainPage;
