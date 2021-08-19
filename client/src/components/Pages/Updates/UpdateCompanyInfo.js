import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
// import "../../App.css";
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
      <div>
        <Link to={"/show-company/" + this.props.match.params.id}>
          ← Show Company
        </Link>
        <br />
        <br />

        <Link to="/">Show Company List</Link>
        <br />
        <h1>Edit Company</h1>
        <br />
        <p>Update Company's Info</p>

        <Form
          noValidate
          onFinish={this.onFinish}
          layout="inline"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item>
            <Input
              type="text"
              placeholder="Company name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update Company
          </Button>
        </Form>
      </div>
    );
  }
}

export default UpdateCompanyInfo;
