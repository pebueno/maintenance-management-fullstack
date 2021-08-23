import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
// import "../App.css";

const UserCard = (props) => {
  const user = props.user;

  return (
    <Row style={{ padding: "15px 0" }} className="tableDesign">
      <Col span={12}>
        <Link to={`/show-user/${user._id}`}>{user.name}</Link>
      </Col>

      <Col span={12}>
        <span>{user.employer}</span>
      </Col>
    </Row>
  );
};

export default UserCard;
