import React, { useState, useRef } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
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
    // console.log(data);
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
    <Form
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
    >
      <Col gutter={24}>
        <Input.Group>
          <Form.Item
            name={["owner"]}
            label="Owner"
            rules={[{ required: true, message: "Who owns this asset?" }]}
          >
            <Select>{companyList}</Select>
          </Form.Item>
          <Form.Item
            name={["name"]}
            label="Name"
            rules={[{ required: true, message: "Please insert a name!" }]}
          >
            <Input placeholder="Insert your Unit name" type="text" />
          </Form.Item>
        </Input.Group>
      </Col>
      <Row>
        <Col xl={18} md={18} xs={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default UnitForm;
