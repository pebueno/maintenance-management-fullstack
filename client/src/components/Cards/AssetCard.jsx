import React from "react";
import { Link } from "react-router-dom";

import { Card } from "antd";

const { Meta } = Card;

const AssetCard = (props) => {
  const asset = props.asset;

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={asset.name} src={asset.image} />}
    >
      <Link to={`/show-asset/${asset._id}`}>
        <Meta title={asset.name} description={asset.description} />
      </Link>
      <h4>{asset.owner}</h4>
      <p>{asset.model}</p>
      <p>{asset.status}</p>
      <p>{asset.health}</p>
    </Card>
  );
};

export default AssetCard;
