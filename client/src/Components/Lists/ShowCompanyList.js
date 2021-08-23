import React, { Component } from "react";
// import { Table } from "antd";
import { Row, Col, Divider } from "antd";

// import "../App.css";
import axios from "axios";
// import { Link } from "react-router-dom";
import CompanyCard from "../Cards/CompanyCard";
// import UnitForm from "./UnitForm";

class ShowCompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
    };
  }

  componentDidMount() {
    //Read Operation - List Companies

    axios
      .get(process.env.REACT_APP_API_URL + "/companies")
      .then((res) => {
        this.setState({
          companies: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowcompanyList");
      });
  }

  render() {
    const companies = this.state.companies;
    // console.log("Printcompany: " + companies);
    let companyList;

    if (!companies) {
      companyList = "there is no company recored!";
    } else {
      companyList = companies.map((company, k) => (
        <CompanyCard company={company} key={k} />
      ));
    }

    return (
      <>
        <Row
          style={{ background: "#FAFAFA", padding: "15px" }}
          className="tableTitle"
        >
          <Col span={6}>
            <h4>Name</h4>
          </Col>
        </Row>
        <div style={{ paddingLeft: "15px" }}>{companyList}</div>
      </>
    );
  }
}

export default ShowCompanyList;
