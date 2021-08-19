import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "../../App.css";
import axios from "axios";

class ShowUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    //Read Operation - user Details
    axios
      .get(
        process.env.REACT_APP_API_URL + "/users/" + this.props.match.params.id
      )
      .then((res) => {
        // console.log("Print-ShowUserDetails-API-response: " + res.data);
        this.setState({
          user: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowUserDetails");
      });
  }

  //Delete user
  onDeleteClick(id) {
    axios
      .delete(process.env.REACT_APP_API_URL + "/users/" + id)
      .then((res) => {
        this.props.history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowUserDetails_deleteClick");
      });
  }

  render() {
    const user = this.state.user;
    let userItem = (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{user.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div>
        <br /> <br />
        <Link to="/">Show User List</Link>
        <br />
        <div>
          <h1>User's Record</h1>
          <p>View User's Info</p>
        </div>
        <div>{userItem}</div>
        <button type="button" onClick={this.onDeleteClick.bind(this, user._id)}>
          Delete User
        </button>
        <br />
        <Link to={`/edit-user/${user._id}`}>Edit User</Link>
        <br />
        <hr /> <br />
      </div>
    );
  }
}

export default ShowUserDetails;
