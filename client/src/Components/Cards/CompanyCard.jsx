import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

const CompanyCard = (props) => {
  const company = props.company;

  return (
    <Row style={{ padding: "15px 0" }} className="tableDesign">
      <Col span={6}>
        <Link to={`/show-company/${company._id}`}>{company.name}</Link>
      </Col>
    </Row>
  );
};

export default CompanyCard;
