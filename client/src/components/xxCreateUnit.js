import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { Form, Input, Button } from "antd";
import CompanyOptions from "./CompanyOptions";

class CreateUnit extends Component {
  constructor() {
    super();
    this.state = {
      owner: "",
      name: "",
    };
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
    console.log(data);

    axios
      .post("http://localhost:8082/api/units", data)
      .then((res) => {
        this.setState({
          owner: "",
          name: "",
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("Error in CreateUnit!");
      });
  };

  render() {
    // const companies = this.state.companies;

    // let companyList;
    // if (!companies) {
    //   companyList = "there is no company recored!";
    // } else {
    //   companyList = companies.map((company, k) => (
    //     <Option company={company} key={company._id} value={company.name}>
    //       {company.name}
    //     </Option>
    //   ));
    // }
    return (
      <div className="CreateBook">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show BooK List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Book</h1>
              <p className="lead text-center">Create new book</p>

              {/* <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Title of the Book"
                    name="title"
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="ISBN"
                    name="isbn"
                    className="form-control"
                    value={this.state.isbn}
                    onChange={this.onChange}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4"
                />
              </form> */}
              <Form
                onFinish={this.onFinish}
                // layout="inline"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 20 }}
              >
                {/* <Form.Item>
                  <Input.Group compact> */}
                <CompanyOptions
                  name={["owner"]}
                  value={this.state.owner}
                  onChange={this.onChange}
                />

                <Input
                  style={{ width: "70%" }}
                  // placeholder="name"
                  placeholder="Insert your Unit name"
                  type="text"
                  name={["name"]}
                  value={this.state.name}
                  onChange={this.onChange}
                  options={[{ value: "text 1" }, { value: "text 2" }]}
                />
                {/* </Input.Group>
                </Form.Item> */}

                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUnit;
