import React, { Component } from "react";
import { Form, Input, Button, Select, PageHeader, Row, Col } from "antd";
import axios from "axios";
const { Option } = Select;

class UpdateUnitInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      name: "",
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get(
        process.env.REACT_APP_API_URL + "/units/" + this.props.match.params.id
      )
      .then((res) => {
        // this.setState({...this.state, Unit: res.data})
        this.setState({
          owner: res.data.owner,
          name: res.data.name,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateUnitInfo");
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFinish = (e) => {
    // e.preventDefault();
    const data = {
      owner: this.state.owner,
      name: this.state.name,
    };
    axios
      .put(
        process.env.REACT_APP_API_URL + "/units/" + this.props.match.params.id,
        data
      )
      .then((res) => {
        this.props.history.push("/show-unit/" + this.props.match.params.id);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error in UpdateUnitInfo!");
      });
  };

  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Edit Unit"
          subTitle="Edit the unit information"
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
                  <Form.Item label="Owner">
                    <Select>
                      <Option value={this.state.owner}>
                        {this.state.owner}
                      </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Name">
                    <Input
                      type="text"
                      placeholder="Unit name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </Form.Item>
                  <Row>
                    <Col xl={18} md={18} xs={24} style={{ textAlign: "right" }}>
                      <Button type="primary" htmlType="submit">
                        Update Unit
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

export default UpdateUnitInfo;
