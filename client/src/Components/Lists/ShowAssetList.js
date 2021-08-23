import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Divider } from "antd";
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
        <Row
          style={{ background: "#FAFAFA", padding: "15px" }}
          className="tableTitle"
        >
          <Col span={6}>
            <h4>Name</h4>
          </Col>

          <Col span={4}>
            <h4>
              <Divider type="vertical" />
              Owner
            </h4>
          </Col>

          <Col span={4}>
            <h4>
              <Divider type="vertical" />
              Model
            </h4>
          </Col>

          <Col span={4}>
            <h4>
              <Divider type="vertical" />
              Status
            </h4>
          </Col>

          <Col span={3}>
            <h4>
              <Divider type="vertical" />
              Health
            </h4>
          </Col>
          <Col span={3}>
            <Divider type="vertical" />
          </Col>
        </Row>
        <div style={{ paddingLeft: "15px" }}>{assetList}</div>
      </>
    );
  }
}

export default ShowAssetList;
