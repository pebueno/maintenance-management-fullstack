import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

const AssetCard = (props) => {
  const asset = props.asset;

  return (
    <Row style={{ padding: "15px 0" }}>
      <Col span={6}>
        <Link to={`/show-asset/${asset._id}`}>{asset.name}</Link>
      </Col>

      <Col span={5}>
        <span>{asset.owner}</span>
      </Col>

      <Col span={5}>
        <span>{asset.model}</span>
      </Col>

      <Col span={5}>
        <span>{asset.status}</span>
      </Col>

      <Col span={3}>
        <span>{asset.health}%</span>
      </Col>
    </Row>
  );
};

export default AssetCard;
