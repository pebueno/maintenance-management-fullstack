import React, { Component } from "react";
// import "../App.css";
import axios from "axios";
// import { Link } from "react-router-dom";
import CompanyCard from "../Cards/CompanyCard";
// import UnitForm from "./UnitForm";
import ShowUnitList from "./ShowUnitList";

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
      <div>
        <br />
        <h2>Companies List</h2>
        <hr />

        <span>{companyList}</span>
        <ShowUnitList />
      </div>
    );
  }
}

export default ShowCompanyList;
