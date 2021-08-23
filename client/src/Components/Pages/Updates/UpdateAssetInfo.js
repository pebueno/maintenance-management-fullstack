import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Slider,
  Radio,
  PageHeader,
  Row,
  Col,
} from "antd";

import axios from "axios";
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
      <>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Edit Asset"
          subTitle="Edit the asset information"
        />
        <div className="space30"></div>
        <Row gutter={[24, 24]}>
          <Col className="gutter-row" span={12}>
            <div className="whiteBox shadow">
              <div className="pad20">
                <Form
                  onFinish={this.onFinish}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                >
                  <Form.Item
                    label="Owner"
                    rules={[
                      { required: true, message: "Who owns this asset?" },
                    ]}
                  >
                    <Select defaultValue={this.state.owner} name="owner">
                      <Option value={this.state.owner}>
                        {this.state.owner}
                      </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Name"
                    rules={[
                      { required: true, message: "Please tell the name!" },
                    ]}
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
                    label="Image Url"
                    rules={[
                      { required: true, message: "Please give the image url!" },
                    ]}
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
                    label="Description"
                    rules={[
                      { required: true, message: "Please describe the asset!" },
                    ]}
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
                    label="Model"
                    rules={[
                      { required: true, message: "Please choose the model!" },
                    ]}
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
                    label="Health"
                    rules={[
                      {
                        required: true,
                        message: "Please tell the health level!",
                      },
                    ]}
                  >
                    <Slider
                      name="health"
                      value={this.state.health}
                      marks={{
                        0: "0%",
                        50: "50%",
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
                    label="Status"
                    rules={[
                      { required: true, message: "Please choose the status!" },
                    ]}
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
                  <Row>
                    <Col xl={18} md={18} xs={24} style={{ textAlign: "right" }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default UpdateAssetInfo;
