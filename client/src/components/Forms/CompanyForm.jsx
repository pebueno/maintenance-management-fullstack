import React from "react";
import { Form, Input, Button } from "antd";
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
        layout="inline"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item name={["name"]}>
          <Input
            type="text"
            // name={["name"]}
            placeholder="Insert your company name"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default CompanyForm;
