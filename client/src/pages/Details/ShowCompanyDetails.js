import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import UnitForm from "../../components/UnitForm";
// import ShowUnitList from "../../components/ShowUnitList";

class showCompanyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    //Read Operation - Company Details
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

  //Delete Company
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
        <hr /> <br />
        <UnitForm />
        {/* <ShowUnitList /> */}
      </div>
    );
  }
}

export default showCompanyDetails;
