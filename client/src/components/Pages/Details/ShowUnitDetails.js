import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "../../App.css";
import axios from "axios";
import { Table, PageHeader, Space } from "antd";

class ShowUnitDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: {},
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    //Read Operation - unit Details
    axios
      .get(
        process.env.REACT_APP_API_URL + "/units/" + this.props.match.params.id
      )
      .then((res) => {
        // console.log("Print-ShowUnitDetails-API-response: " + res.data);
        this.setState({
          unit: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowUnitDetails");
      });
  }

  //Delete unit
  onDeleteClick(id) {
    axios
      .delete(process.env.REACT_APP_API_URL + "/units/" + id)
      .then((res) => {
        this.props.history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowUnitDetails_deleteClick");
      });
  }

  render() {
    const unit = this.state.unit;
    const columns = [
      {
        title: "Name",
        render: (text) => (
          <p>
            <strong>{unit.name}</strong>
          </p>
        ),
      },
      {
        title: "Owner",
        render: (text) => <p>{unit.owner}</p>,
      },
      {
        title: "Actions",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/create`}>Create</Link>
            <Link to={`/edit-unit/${unit._id}`}>Edit Unit</Link>
            <a onClick={this.onDeleteClick.bind(this, unit._id)}>Delete</a>
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
        description: "Unit has assets",
      },
    ];
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Unit Resources"
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

export default ShowUnitDetails;
