import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Menu, Dropdown } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { onDeleteUser } from "../Utils/Delete";

const UserCard = (props) => {
  const user = props.user;
  const menu = (
    <Menu style={{ width: 130 }}>
      <Menu.Item icon={<EyeOutlined />}>
        Show
        <Link to={`/show-user/${user._id}`} />
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />}>
        Edit
        <Link to={`/edit-user/${user._id}`} />
      </Menu.Item>
      <Menu.Item
        icon={<DeleteOutlined />}
        onClick={() => {
          onDeleteUser(user._id);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Row style={{ padding: "15px 0" }} className="tableDesign">
      <Col span={10}>{user.name}</Col>
      <Col span={10}>
        <span>{user.employer}</span>
      </Col>
      <Col span={4}>
        <Dropdown.Button overlay={menu}></Dropdown.Button>
      </Col>
    </Row>
  );
};

export default UserCard;
