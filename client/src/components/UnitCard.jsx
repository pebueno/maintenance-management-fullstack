import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import "../App.css";

const UnitCard = (props) => {
  const unit = props.unit;

  return (
    <Row>
      <Col span={12}>
        <h5>Owner</h5>
        <p>{unit.owner}</p>
      </Col>
      <Col span={12}>
        <h5>Unit</h5>
        <Link to={`/show-unit/${unit._id}`}>
          <p>{unit.name}</p>
        </Link>
      </Col>
    </Row>
  );
};

export default UnitCard;
