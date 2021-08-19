import React from "react";
import { Link } from "react-router-dom";

import { Card } from "antd";

const { Meta } = Card;

const AssetCard = (props) => {
  const asset = props.asset;

  return (
    <Link to={`/show-asset/${asset._id}`}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={asset.name} src={asset.image} />}
      >
        <Meta title={asset.name} description={asset.description} />
        <h4>{asset.owner}</h4>
        <p>{asset.model}</p>
        <p>{asset.status}</p>
        <p>{asset.health}</p>
      </Card>
    </Link>
  );
};

export default AssetCard;
