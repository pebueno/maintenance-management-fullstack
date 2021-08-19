import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "../../App.css";
import axios from "axios";
import UserForm from "../../Forms/UserForm";

class showunitDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: {},
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    //Read Operation - unit Details
    axios
      .get(
        process.env.REACT_APP_API_URL + "/units/" + this.props.match.params.id
      )
      .then((res) => {
        // console.log("Print-showunitDetails-API-response: " + res.data);
        this.setState({
          unit: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowunitDetails");
      });
  }

  //Delete unit
  onDeleteClick(id) {
    axios
      .delete(process.env.REACT_APP_API_URL + "/units/" + id)
      .then((res) => {
        this.props.history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowunitDetails_deleteClick");
      });
  }

  render() {
    const unit = this.state.unit;
    let unitItem = (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{unit.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div>
        <br /> <br />
        <Link to="/">Show Unit List</Link>
        <br />
        <div>
          <h1>Unit's Record</h1>
          <p>View Unit's Info</p>
        </div>
        <div>{unitItem}</div>
        <button type="button" onClick={this.onDeleteClick.bind(this, unit._id)}>
          Delete Unit
        </button>
        <br />
        <Link to={`/edit-unit/${unit._id}`}>Edit Unit</Link>
        <br />
        <hr /> <br />
        <UserForm />
      </div>
    );
  }
}

export default showunitDetails;
