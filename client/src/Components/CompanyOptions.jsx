import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;
class CompanyOptions extends Component {
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
    let companyList;
    if (!companies) {
      companyList = "there is no company recored!";
    } else {
      companyList = companies.map((company, k) => (
        <Option
          company={company}
          key={k}
          value={this.state.owner}
          onChange={this.onChange}
        >
          {company.name}
        </Option>
      ));
    }
    return (
      <Select
        defaultValue="Freios Supremos"
        style={{ width: "30%" }}
        name={["owner"]}
        value={this.state.owner}
        onChange={this.onChange}
      >
        <Option value="Freios Supremos">
          <span>Freios Supremos</span>
        </Option>
        {companyList}
      </Select>
    );
  }
}
export default CompanyOptions;
