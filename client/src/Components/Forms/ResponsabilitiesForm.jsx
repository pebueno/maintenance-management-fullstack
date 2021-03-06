import React, { useState, useRef } from "react";
import { Form, Input, Button, Select, Row, Col, Collapse } from "antd";
import axios from "axios";
const { Option } = Select;
const { Panel } = Collapse;

// Create Constructor
const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
};

function ResponsabilitiesForm() {
  const [form] = Form.useForm();

  function handleFinish(data) {
    // console.log(data);
    // console.log(data.id);

    axios
      .get(process.env.REACT_APP_API_URL + "/users/" + data.id)
      .then((response) => {
        const existingAssets = response.data.asset;
        const existingUnits = response.data.unit;
        existingAssets.push(data.asset);
        existingUnits.push(data.unit);
        axios.put(process.env.REACT_APP_API_URL + "/users/" + data.id, {
          asset: existingAssets,
          unit: existingUnits,
        });
      });
    form.resetFields();
    window.location.reload();
  }

  const [assets, setAssets] = useState([]);
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);

  //Read Operation - List Units
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
  //Read Operation - List Users
  function getUsers() {
    axios
      .get(process.env.REACT_APP_API_URL + "/users")
      .then((res) => {
        setUsers(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("Error listing the users");
      });
  }
  //Read Operation - List Assets
  function getAssets() {
    axios
      .get(process.env.REACT_APP_API_URL + "/assets")
      .then((res) => {
        setAssets(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("Error listing the assets");
      });
  }
  let unitList;
  if (units) {
    unitList = units.map((unit, k) => (
      <Option unit={unit} key={unit._id} value={unit.name}>
        {unit.name}
      </Option>
    ));
  }
  let assetList;
  if (assets) {
    assetList = assets.map((asset, k) => (
      <Option asset={asset} key={asset._id} value={asset.name}>
        {asset.name}
      </Option>
    ));
  }

  let userList;
  if (!users) {
    userList = "there is no user recored!";
  } else {
    userList = users.map((user) => (
      <Panel
        header={"Delegate responsabilitie for " + user.name}
        key={user._id}
      >
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
                name={["id"]}
                hidden={true}
                initialValue={user._id}
                noStyle
              ></Form.Item>
              <Form.Item label="Name">
                <Input disabled type="text" value={user.name} name="name" />
              </Form.Item>
              <Form.Item label="Employer">
                <Select disabled defaultValue={user.employer}>
                  <Option value={user.employer} name="employer">
                    {user.employer}
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item name={["unit"]} label="Unit">
                <Select>{unitList}</Select>
              </Form.Item>
              <Form.Item name={["asset"]} label="Asset">
                <Select>{assetList}</Select>
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
      </Panel>
    ));
  }

  useConstructor(() => {
    getAssets();
    getUnits();
    getUsers();
  });
  return <Collapse accordion>{userList}</Collapse>;
}

export default ResponsabilitiesForm;
