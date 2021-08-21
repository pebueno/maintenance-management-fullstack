import React, { Component } from "react";
import { Form, Input, Button, PageHeader, Row, Col } from "antd";
import axios from "axios";

class UpdateCompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    console.log("Print id: " + this.props.match.params.id);
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/companies/" +
          this.props.match.params.id
      )
      .then((res) => {
        // this.setState({...this.state, Company: res.data})
        this.setState({
          name: res.data.name,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateCompanyInfo");
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFinish = (e) => {
    // e.preventDefault();
    const data = {
      name: this.state.name,
    };
    axios
      .put(
        process.env.REACT_APP_API_URL +
          "/companies/" +
          this.props.match.params.id,
        data
      )
      .then((res) => {
        this.props.history.push("/show-company/" + this.props.match.params.id);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error in UpdateCompanyInfo!");
      });
  };

  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Edit Company"
          subTitle="Edit the company information"
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
                  <Form.Item label="Name">
                    <Input
                      type="text"
                      placeholder="Company name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </Form.Item>
                  <Row>
                    <Col xl={18} md={18} xs={24} style={{ textAlign: "right" }}>
                      <Button type="primary" htmlType="submit">
                        Update Company
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

export default UpdateCompanyInfo;
