import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "antd";
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
      <>
        <Row style={{ background: "#FAFAFA", padding: "15px" }}>
          <Col span={6}>
            <h4>Name</h4>
          </Col>

          <Col span={5}>
            <h4>Owner</h4>
          </Col>

          <Col span={5}>
            <h4>Model</h4>
          </Col>

          <Col span={5}>
            <h4>Status</h4>
          </Col>

          <Col span={3}>
            <h4>Health</h4>
          </Col>
        </Row>
        <div style={{ paddingLeft: "15px" }}>{assetList}</div>
      </>
    );
  }
}

export default ShowAssetList;
