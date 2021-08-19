import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";

import axios from "axios";
import "../../App.css";
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
      <div>
        <Link to={"/show-unit/" + this.props.match.params.id}>← Show Unit</Link>
        <br />
        <br />

        <Link to="/">Show Unit List</Link>
        <br />
        <h1>Edit Unit</h1>
        <br />
        <p>Update Unit's Info</p>

        <Form
          noValidate
          onFinish={this.onFinish}
          layout="inline"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item>
            <Form.Item
            //   name={["owner"]}
            >
              <Select>
                <Option value={this.state.owner}>{this.state.owner}</Option>
              </Select>
            </Form.Item>
            <Input
              type="text"
              placeholder="Unit name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update Unit
          </Button>
        </Form>
      </div>
    );
  }
}

export default UpdateUnitInfo;
