// import React from "react";
import React, { useState, useRef } from "react";
import { Form, Input, Button, Select } from "antd";
import axios from "axios";
const { Option } = Select;

// Create Constructor
const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
};

function UnitForm() {
  const [form] = Form.useForm();
  function handleFinish(data) {
    console.log(data);

    axios.post(process.env.REACT_APP_API_URL + "/units", data);
    form.resetFields();
    window.location.reload();
  }
  const [companies, setCompanies] = useState([]);

  function getCompanies() {
    axios
      .get(process.env.REACT_APP_API_URL + "/companies")
      .then((res) => {
        setCompanies(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("Error listing the companies");
      });
  }
  let companyList;
  if (!companies) {
    companyList = "there is no company recored!";
  } else {
    companyList = companies.map((company, k) => (
      <Option company={company} key={company._id} value={company.name}>
        {company.name}
      </Option>
    ));
  }
  useConstructor(() => {
    getCompanies();
  });
  return (
    <>
      <Form form={form} onFinish={handleFinish} layout="inline">
        <Input.Group compact>
          <Form.Item name={["owner"]}>
            <Select defaultValue="Freios Supremos">
              <Option value="Freios Supremos">Freios Supremos</Option>
              {companyList}
            </Select>
          </Form.Item>
          <Form.Item name={["name"]}>
            <Input placeholder="Insert your Unit name" type="text" />
          </Form.Item>
        </Input.Group>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default UnitForm;
