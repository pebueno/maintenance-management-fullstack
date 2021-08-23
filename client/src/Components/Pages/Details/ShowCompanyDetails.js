import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, PageHeader, Space } from "antd";
import { onDeleteCompany } from "../../Utils/Delete";
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
            <Link
              onClick={() => {
                onDeleteCompany(this.props.match.params.id, this.props.history);
              }}
            >
              Delete
            </Link>
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
        />
        <Table pagination={false} columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default showCompanyDetails;
