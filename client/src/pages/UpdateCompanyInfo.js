import React, { Component } from "react";
// import React from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
// import { Form, Input, Button } from "antd";
import axios from "axios";
import "../App.css";

class UpdateCompanyInfo extends Component {
  // function UpdateCompanyInfo() {
  //   const [form] = Form.useForm();
  //   const company = window.location.pathname;
  //   const company = useParams();
  //   this.props.location
  //   const location = useLocation();

  //   function handleFinish(data) {
  //     console.log(data);
  //     console.log(company);

  //     axios.put(process.env.REACT_APP_API_URL + "/companies/" + company, data);
  //     // .then((res) => {
  //     //   this.props.history.push("/show-company/" + company);
  //     // })
  //     // .catch((err) => {
  //     //   console.log("Error in UpdateBookInfo!");
  //     // });
  //     form.resetFields();
  //     window.location.reload();
  //   }
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

  onSubmit = (e) => {
    e.preventDefault();

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
      <div className="UpdateCompanyInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Company List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Company</h1>
              <p className="lead text-center">Update Company's Info</p>
            </div>
          </div>

          <form
            noValidate
            onSubmit={this.onSubmit}
            // form={form}
            // onFinish={handleFinish}
            // layout="inline"
            // labelCol={{ span: 6 }}
            // wrapperCol={{ span: 24 }}
          >
            <input
              type="text"
              // placeholder="name of the Company"
              name="name"
              // name={["name"]}
              value={this.state.name}
              onChange={this.onChange}
            />

            <button type="submit">Update Company</button>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateCompanyInfo;
