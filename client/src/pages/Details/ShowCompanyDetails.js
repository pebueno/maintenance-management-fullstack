import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";

class showCompanyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/companies/" +
          this.props.match.params.id
      )
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
      .delete(process.env.REACT_APP_API_URL + "/companies/" + id)
      .then((res) => {
        this.props.history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowCompanyDetails_deleteClick");
      });
  }

  render() {
    const company = this.state.company;
    let CompanyItem = (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{company.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div>
        <br /> <br />
        <Link to="/">Show company List</Link>
        <br />
        <div>
          <h1>company's Record</h1>
          <p>View company's Info</p>
          <hr /> <br />
        </div>
        <div>{CompanyItem}</div>
        <button
          type="button"
          onClick={this.onDeleteClick.bind(this, company._id)}
        >
          Delete Company
        </button>
        <br />
        <Link to={`/edit-company/${company._id}`}>Edit Company</Link>
        <br />
      </div>
    );
  }
}

export default showCompanyDetails;
