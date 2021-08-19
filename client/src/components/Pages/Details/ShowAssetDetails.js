import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "../../App.css";
import axios from "axios";
// import AssetForm from "../../Forms/AssetForm";

class ShowAssetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: {},
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    //Read Operation - asset Details
    axios
      .get(
        process.env.REACT_APP_API_URL + "/assets/" + this.props.match.params.id
      )
      .then((res) => {
        // console.log("Print-ShowAssetDetails-API-response: " + res.data);
        this.setState({
          asset: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowAssetDetails");
      });
  }

  //Delete asset
  onDeleteClick(id) {
    axios
      .delete(process.env.REACT_APP_API_URL + "/assets/" + id)
      .then((res) => {
        this.props.history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowAssetDetails_deleteClick");
      });
  }

  render() {
    const asset = this.state.asset;
    let assetItem = (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{asset.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div>
        <br /> <br />
        <Link to="/">Show Asset List</Link>
        <br />
        <div>
          <h1>Asset's Record</h1>
          <p>View Asset's Info</p>
        </div>
        <div>{assetItem}</div>
        <button
          type="button"
          onClick={this.onDeleteClick.bind(this, asset._id)}
        >
          Delete Asset
        </button>
        <br />
        <Link to={`/edit-asset/${asset._id}`}>Edit Asset</Link>
        <br />
        <hr /> <br />
        {/* <UserForm /> */}
      </div>
    );
  }
}

export default ShowAssetDetails;
