import React, { Component } from "react";
import { Form, Input, Button, Select, PageHeader, Row, Col } from "antd";
import axios from "axios";
const { Option } = Select;

class UpdateUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employer: "",
      name: "",
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get(
        process.env.REACT_APP_API_URL + "/users/" + this.props.match.params.id
      )
      .then((res) => {
        // this.setState({...this.state, User: res.data})
        this.setState({
          employer: res.data.employer,
          name: res.data.name,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateUserInfo");
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFinish = (e) => {
    // e.preventDefault();
    const data = {
      employer: this.state.employer,
      name: this.state.name,
    };
    axios
      .put(
        process.env.REACT_APP_API_URL + "/users/" + this.props.match.params.id,
        data
      )
      .then((res) => {
        this.props.history.push("/show-user/" + this.props.match.params.id);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error in UpdateUserInfo!");
      });
  };

  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Edit User"
          subTitle="Edit the user information"
        />
        <div className="space30"></div>
        <Row gutter={[24, 24]}>
          <Col className="gutter-row" span={12}>
            <div className="whiteBox shadow">
              <div className="pad20">
                <Form
                  noValidate
                  onFinish={this.onFinish}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                >
                  <Form.Item label="Employer">
                    <Select>
                      <Option value={this.state.employer}>
                        {this.state.employer}
                      </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Name">
                    <Input
                      type="text"
                      placeholder="User name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </Form.Item>
                  <Row>
                    <Col xl={18} md={18} xs={24} style={{ textAlign: "right" }}>
                      <Button type="primary" htmlType="submit">
                        Update User
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

export default UpdateUserInfo;
