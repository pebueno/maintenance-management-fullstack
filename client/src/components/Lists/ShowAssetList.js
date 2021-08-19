import React, { Component } from "react";
// import "../App.css";
import axios from "axios";
// import { Link } from "react-router-dom";
import AssetCard from "../Cards/AssetCard";

class ShowAssetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: [],
    };
  }

  componentDidMount() {
    //Read Operation - List assets
    axios
      .get(process.env.REACT_APP_API_URL + "/assets")
      .then((res) => {
        this.setState({
          assets: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowAssetList");
      });
  }

  render() {
    const assets = this.state.assets;
    // console.log("Printasset: " + assets);
    let assetList;

    if (!assets) {
      assetList = "there is no asset recored!";
    } else {
      assetList = assets.map((asset, k) => <AssetCard asset={asset} key={k} />);
    }

    return (
      <div>
        <br />
        <h2>Assets List</h2>
        <hr />

        <div>{assetList}</div>
      </div>
    );
  }
}

export default ShowAssetList;
