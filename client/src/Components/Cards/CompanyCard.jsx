import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Menu, Dropdown } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { onDeleteCompany } from "../Utils/Delete";

const CompanyCard = (props) => {
  const company = props.company;
  const menu = (
    <Menu style={{ width: 130 }}>
      <Menu.Item icon={<EyeOutlined />}>
        Show
        <Link to={`/show-company/${company._id}`} />
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />}>
        Edit
        <Link to={`/edit-company/${company._id}`} />
      </Menu.Item>
      <Menu.Item
        icon={<DeleteOutlined />}
        onClick={() => {
          onDeleteCompany(company._id);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Row style={{ padding: "15px 0" }} className="tableDesign">
      <Col span={20}>{company.name}</Col>
      <Col span={4}>
        <Dropdown.Button overlay={menu}></Dropdown.Button>
      </Col>
    </Row>
  );
};

export default CompanyCard;
