import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Menu, Dropdown } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { onDeleteUnit } from "../Utils/Delete";

const UnitCard = (props) => {
  const unit = props.unit;
  const menu = (
    <Menu style={{ width: 130 }}>
      <Menu.Item icon={<EyeOutlined />}>
        Show
        <Link to={`/show-unit/${unit._id}`} />
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />}>
        Edit
        <Link to={`/edit-unit/${unit._id}`} />
      </Menu.Item>
      <Menu.Item
        icon={<DeleteOutlined />}
        onClick={() => {
          onDeleteUnit(unit._id);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );
  return (
    <Row style={{ padding: "15px 0" }} className="tableDesign">
      <Col span={10}>{unit.name}</Col>

      <Col span={10}>
        <span>{unit.owner}</span>
      </Col>
      <Col span={4}>
        <Dropdown.Button overlay={menu}></Dropdown.Button>
      </Col>
    </Row>
  );
};

export default UnitCard;
