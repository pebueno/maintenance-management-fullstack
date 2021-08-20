import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "../../App.css";
import axios from "axios";
import { Table, PageHeader, Space } from "antd";

class showCompanyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    //Read Operation - Company Details
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/companies/" +
          this.props.match.params.id
      )
      .then((res) => {
        // console.log("Print-showcompanyDetails-API-response: " + res.data);
        this.setState({
          company: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowcompanyDetails");
      });
  }

  //Delete Company
  onDeleteClick(id) {
    axios
      .delete(process.env.REACT_APP_API_URL + "/companies/" + id)
      .then((res) => {
        this.props.history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowCompanyDetails_deleteClick");
      });
  }

  render() {
    const company = this.state.company;

    const columns = [
      {
        title: "Name",
        render: (text) => <p>{company.name}</p>,
      },
      {
        title: "Actions",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/edit-company/${company._id}`}>Edit Company</Link>
            <a onClick={this.onDeleteClick.bind(this, company._id)}>Delete</a>
          </Space>
        ),
      },
    ];

    const data = [
      {
        key: 1,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description: "Company has units and users",
      },
    ];

    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Company Resources"
          // subTitle="Read and change Asset Data"
        />
        <Table
          pagination={false}
          columns={columns}
          // expandable={{
          //   expandedRowRender: (record) => (
          //     <p style={{ margin: 0 }}>{record.description}</p>
          //   ),
          //   rowExpandable: (record) => record.name !== "Not Expandable",
          // }}
          dataSource={data}
        />
      </div>
    );
  }
}

export default showCompanyDetails;
