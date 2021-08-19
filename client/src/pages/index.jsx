// import React, { useEffect, useState } from "react";
// import axios from "axios";
import React from "react";

import CompanyForm from "../Components/Forms/CompanyForm";
import ShowCompanyList from "../Components/Lists/ShowCompanyList";

const MainPage = () => {
  // function getData(){
  //   axios.get(process.env.REACT_APP_API_URL + "/companies")
  // }

  // const [allCompanies, setAllCompanies] = useState([]);

  // useEffect(() => {
  //   axios.get(process.env.REACT_APP_API_URL + "/companies").then((res) => {
  //     setAllCompanies(res.data);
  //     console.log(res.data);
  //   });
  // }, []);
  // const data = [{}];
  // allCompanies.map((company) => {
  //   console.log(company.name);
  // data.push({
  //   name: company.name,
  // });
  // return data;
  // });

  return (
    <>
      <h2>This is the management page!</h2>
      <h3>Try to add your company</h3>
      <CompanyForm />
      <ShowCompanyList />
    </>
  );
};

export default MainPage;
