import React, { useState, useRef } from "react";
import { Form, Input, Button, Select, Slider, Radio, Row, Col } from "antd";
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
    // console.log(data);

    axios.post(process.env.REACT_APP_API_URL + "/assets", data);
    form.resetFields();
    window.location.reload();
  }
  const [units, setUnits] = useState([]);

  function getUnits() {
    axios
      .get(process.env.REACT_APP_API_URL + "/units")
      .then((res) => {
        setUnits(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("Error listing the units");
      });
  }
  let unitList;
  if (!units) {
    unitList = "there is no unit recored!";
  } else {
    unitList = units.map((unit, k) => (
      <Option unit={unit} key={unit._id} value={unit.name}>
        {unit.name}
      </Option>
    ));
  }
  useConstructor(() => {
    getUnits();
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
        <Form.Item
          name={["owner"]}
          label="Owner"
          rules={[{ required: true, message: "Who owns this asset?" }]}
        >
          <Select>{unitList}</Select>
        </Form.Item>
        <Form.Item
          name={["name"]}
          label="Name"
          rules={[{ required: true, message: "Please insert a name!" }]}
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
        <Form.Item
          name={["health"]}
          label="Health"
          rules={[{ required: true, message: "Please tell the health level!" }]}
        >
          <Slider
            marks={{
              0: "0%",
              50: "50%",
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

export default AssetForm;
