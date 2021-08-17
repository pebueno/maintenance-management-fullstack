import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

class showCompanyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
    };
  }

  componentDidMount() {
    console.log("Print id: " + this.props.match.params.id);
    axios
      .get("http://localhost:8082/api/companies/" + this.props.match.params.id)
      .then((res) => {
        // console.log("Print-showcompanyDetails-API-response: " + res.data);
        this.setState({
          company: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowcompanyDetails");
      });
  }

  onDeleteClick(id) {
    axios
      .delete("http://localhost:8082/api/companies/" + id)
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("Error form ShowCompanyDetails_deleteClick");
      });
  }

  render() {
    const company = this.state.company;
    let CompanyItem = (
      <div>
        <table className="table table-hover table-dark">
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Title</td>
              <td>{company.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="ShowcompanyDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show company List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">company's Record</h1>
              <p className="lead text-center">View company's Info</p>
              <hr /> <br />
            </div>
          </div>
          <div>{CompanyItem}</div>

          <div className="row">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-outline-danger btn-lg btn-block"
                onClick={this.onDeleteClick.bind(this, company._id)}
              >
                Delete Company
              </button>
              <br />
            </div>

            <div className="col-md-6">
              <Link
                to={`/edit-company/${company._id}`}
                className="btn btn-outline-info btn-lg btn-block"
              >
                Edit Company
              </Link>
              <br />
            </div>
          </div>
          {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit company</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete company</button> */}
        </div>
      </div>
    );
  }
}

export default showCompanyDetails;
