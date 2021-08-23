import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

const UnitCard = (props) => {
  const unit = props.unit;

  return (
    <Row style={{ padding: "15px 0" }} className="tableDesign">
      <Col span={12}>
        <Link to={`/show-unit/${unit._id}`}>{unit.name}</Link>
      </Col>

      <Col span={12}>
        <span>{unit.owner}</span>
      </Col>
    </Row>
  );
};

export default UnitCard;
