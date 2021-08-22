import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
// import "../App.css";

const UserCard = (props) => {
  const user = props.user;

  return (
    <Row>
      <Col span={12}>
        <p>{user.employer}</p>
      </Col>
      <Col span={12}>
        <Link to={`/show-user/${user._id}`}>
          <p>{user.name}</p>
        </Link>
      </Col>
    </Row>
  );
};

export default UserCard;
