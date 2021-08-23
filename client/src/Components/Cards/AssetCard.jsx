import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Menu, Dropdown, Tag } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { onDeleteAsset } from "../Utils/Delete";

const AssetCard = (props) => {
  const asset = props.asset;
  const menu = (
    <Menu style={{ width: 130 }}>
      <Menu.Item icon={<EyeOutlined />}>
        Show
        <Link to={`/show-asset/${asset._id}`} />
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />}>
        Edit
        <Link to={`/edit-asset/${asset._id}`} />
      </Menu.Item>
      <Menu.Item
        icon={<DeleteOutlined />}
        onClick={() => {
          onDeleteAsset(asset._id);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Row style={{ padding: "15px 0" }} className="tableDesign">
      <Col span={6}>{asset.name}</Col>

      <Col span={4}>
        <span>{asset.owner}</span>
      </Col>

      <Col span={4}>
        <span>{asset.model}</span>
      </Col>

      <Col span={4}>
        <Tag
          color={
            asset.status === "Alerting"
              ? "yellow"
              : asset.status === "Running"
              ? "green"
              : "volcano"
          }
        >
          {asset.status}
        </Tag>
      </Col>

      <Col span={3}>
        <span>{asset.health}%</span>
      </Col>
      <Col span={3}>
        <Dropdown.Button overlay={menu}></Dropdown.Button>
      </Col>
    </Row>
  );
};

export default AssetCard;
