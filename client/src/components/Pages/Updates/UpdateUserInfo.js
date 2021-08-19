import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";

import axios from "axios";
// import "../../App.css";
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
      <div>
        <Link to={"/show-user/" + this.props.match.params.id}>← Show User</Link>
        <br />
        <br />

        <Link to="/">Show User List</Link>
        <br />
        <h1>Edit User</h1>
        <br />
        <p>Update User's Info</p>

        <Form
          noValidate
          onFinish={this.onFinish}
          layout="inline"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item>
            <Form.Item
            //   name={["employer"]}
            >
              <Select>
                <Option value={this.state.employer}>
                  {this.state.employer}
                </Option>
              </Select>
            </Form.Item>
            <Input
              type="text"
              placeholder="User name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update User
          </Button>
        </Form>
      </div>
    );
  }
}

export default UpdateUserInfo;
