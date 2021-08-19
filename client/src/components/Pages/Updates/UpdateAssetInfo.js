import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Form, Input, Button, Select } from "antd";
import { Form, Input, Button, Select, Slider, Radio, InputNumber } from "antd";

import axios from "axios";
// import "../../App.css";
const { Option } = Select;

class UpdateAssetInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      description: "",
      model: "",
      owner: "",
      status: "",
      health: "",
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get(
        process.env.REACT_APP_API_URL + "/assets/" + this.props.match.params.id
      )
      .then((res) => {
        // this.setState({...this.state, Asset: res.data})
        this.setState({
          name: res.data.name,
          image: res.data.image,
          description: res.data.description,
          model: res.data.model,
          owner: res.data.owner,
          status: res.data.status,
          health: res.data.health,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateAssetInfo");
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFinish = (e) => {
    // e.preventDefault();
    const data = {
      name: this.state.name,
      image: this.state.image,
      description: this.state.description,
      model: this.state.model,
      owner: this.state.owner,
      status: this.state.status,
      health: this.state.health,
    };
    axios
      .put(
        process.env.REACT_APP_API_URL + "/assets/" + this.props.match.params.id,
        data
      )
      .then((res) => {
        this.props.history.push("/show-asset/" + this.props.match.params.id);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error in UpdateAssetInfo!");
      });
  };

  render() {
    return (
      <div>
        <Link to={"/show-asset/" + this.props.match.params.id}>
          ← Show Asset
        </Link>
        <br />
        <br />

        <Link to="/">Show Asset List</Link>
        <br />
        <h1>Edit Asset</h1>
        <br />
        <p>Update Asset's Info</p>
        <Form
          // form={form}
          // onFinish={handleFinish}
          onFinish={this.onFinish}
          //   layout="inline"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          {/* <Input.Group> */}
          <Form.Item
            // name={["owner"]}
            label="Owner"
            rules={[{ required: true, message: "Who owns this asset?" }]}
          >
            <Select defaultValue={this.state.owner} name="owner">
              {/* <Option value="Freios Supremos">Freios Supremos</Option>
            {companyList} */}
              <Option value={this.state.owner}>{this.state.owner}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            // name={["name"]}
            label="Name"
            rules={[{ required: true, message: "Please tell the name!" }]}
          >
            <Input
              placeholder="Insert your Asset's name"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item
            // name={["image"]}
            label="Image Url"
            rules={[{ required: true, message: "Please give the image url!" }]}
          >
            <Input
              placeholder="Insert your Image's name"
              type="text"
              name="image"
              value={this.state.image}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item
            // name={["description"]}
            label="Description"
            rules={[{ required: true, message: "Please describe the asset!" }]}
          >
            <Input
              placeholder="Insert your Description's name"
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item
            // name={["model"]}
            label="Model"
            rules={[{ required: true, message: "Please choose the model!" }]}
          >
            <Input
              placeholder="Insert your Model's name"
              type="text"
              name="model"
              value={this.state.model}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item
            // name={["health"]}
            label="Health"
            rules={[
              { required: true, message: "Please tell the health level!" },
            ]}
          >
            <Slider
              name="health"
              value={this.state.health}
              marks={{
                0: "0%",
                // 20: 'B',
                50: "50%",
                // 60: 'D',
                // 80: 'E',
                100: "100%",
              }}
            />
            <Input
              name="health"
              value={this.state.health}
              onChange={this.onChange}
              placeholder="Insert Health Lvl from 0 to 100!"
            />
          </Form.Item>
          <Form.Item
            // name={["status"]}
            label="Status"
            rules={[{ required: true, message: "Please choose the status!" }]}
          >
            <Radio.Group
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <Radio.Button value="Running">Running</Radio.Button>
              <Radio.Button value="Alerting">Alerting</Radio.Button>
              <Radio.Button value="Stopped">Stopped</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default UpdateAssetInfo;
