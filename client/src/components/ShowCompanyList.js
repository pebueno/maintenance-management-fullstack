import React, { Component } from "react";
import "../App.css";
import axios from "axios";
// import { Link } from "react-router-dom";
import CompanyCard from "./CompanyCard";

class ShowCompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8082/api/companies")
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
        // <Link to={`/show-company/${company._id}`} company={company} key={k}>
        //   <p>{company.name}</p>
        // </Link>
      ));
    }

    return (
      <div className="ShowCompanyList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Companies List</h2>
            </div>
            <hr />
          </div>

          <div className="list">{companyList}</div>
        </div>
      </div>
    );
  }
}

export default ShowCompanyList;
