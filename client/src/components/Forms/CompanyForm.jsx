import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import axios from "axios";

function CompanyForm() {
  const [form] = Form.useForm();
  function handleFinish(data) {
    // console.log(data);

    axios.post(process.env.REACT_APP_API_URL + "/companies", data);
    form.resetFields();
    window.location.reload();
  }
  return (
    <>
      <Form
        form={form}
        onFinish={handleFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // layout="inline"
        // labelCol={{ span: 6 }}
        // wrapperCol={{ span: 24 }}
      >
        <Col gutter={24}>
          <Form.Item
            name={["name"]}
            label="Name"
            rules={[{ required: true, message: "Please insert a name!" }]}
          >
            <Input
              type="text"
              // name={["name"]}
              placeholder="Insert your company name"
            />
          </Form.Item>
        </Col>
        <Row>
          <Col xl={18} md={18} xs={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CompanyForm;
