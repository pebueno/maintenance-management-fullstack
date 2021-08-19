import React from "react";
import { Link } from "react-router-dom";
// import "../App.css";

const CompanyCard = (props) => {
  const company = props.company;

  return (
    <Link to={`/show-company/${company._id}`}>
      <p>{company.name}</p>
    </Link>
  );
};

export default CompanyCard;
