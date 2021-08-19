// import React from "react";
import React, { useState, useRef } from "react";
import { Form, Input, Button, Select, Slider, Radio } from "antd";
import axios from "axios";
const { Option } = Select;

// Create Constructor
const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
};

function AssetForm() {
  const [form] = Form.useForm();
  function handleFinish(data) {
    console.log(data);

    axios.post(process.env.REACT_APP_API_URL + "/assets", data);
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
      <Form
        form={form}
        onFinish={handleFinish}
        //   layout="inline"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        {/* <Input.Group> */}
        <Form.Item
          name={["owner"]}
          label="Owner"
          rules={[{ required: true, message: "Who owns this asset?" }]}
        >
          <Select defaultValue="Freios Supremos">
            <Option value="Freios Supremos">Freios Supremos</Option>
            {companyList}
          </Select>
        </Form.Item>
        <Form.Item
          name={["name"]}
          label="Name"
          rules={[{ required: true, message: "Please tell the name!" }]}
        >
          <Input placeholder="Insert your Asset's name" type="text" />
        </Form.Item>
        <Form.Item
          name={["image"]}
          label="Image Url"
          rules={[{ required: true, message: "Please give the image url!" }]}
        >
          <Input placeholder="Insert your Asset's name" type="text" />
        </Form.Item>
        <Form.Item
          name={["description"]}
          label="Description"
          rules={[{ required: true, message: "Please describe the asset!" }]}
        >
          <Input placeholder="Insert your Asset's name" type="text" />
        </Form.Item>
        <Form.Item
          name={["model"]}
          label="Model"
          rules={[{ required: true, message: "Please choose the model!" }]}
        >
          <Input placeholder="Insert your Asset's name" type="text" />
        </Form.Item>
        {/* <Form.Item name={["status"]} label="Status">
          <Select defaultValue="Running">
            <Option value="Running">Running</Option>
            <Option value="Alerting">Alerting</Option>
            <Option value="Stopped">Stopped</Option>
          </Select>
        </Form.Item> */}
        <Form.Item
          name={["health"]}
          label="Health"
          rules={[{ required: true, message: "Please tell the health level!" }]}
        >
          <Slider
            marks={{
              0: "0%",
              // 20: 'B',
              50: "50%",
              // 60: 'D',
              // 80: 'E',
              100: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name={["status"]}
          label="Status"
          rules={[{ required: true, message: "Please choose the status!" }]}
        >
          <Radio.Group>
            <Radio.Button value="Running">Running</Radio.Button>
            <Radio.Button value="Alerting">Alerting</Radio.Button>
            <Radio.Button value="Stopped">Stopped</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* <Form.Item>
          <Form.Item noStyle>
            <InputNumber min={0} max={100} />
          </Form.Item>
          <span className="ant-form-text">%</span>
        </Form.Item> */}
        {/* </Input.Group> */}

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AssetForm;
