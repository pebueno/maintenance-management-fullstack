import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, PageHeader, Space } from "antd";
import { onDeleteUser } from "../../Utils/Delete";

class ShowUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    //Read Operation - user Details
    axios
      .get(
        process.env.REACT_APP_API_URL + "/users/" + this.props.match.params.id
      )
      .then((res) => {
        // console.log("Print-ShowUserDetails-API-response: " + res.data);
        this.setState({
          user: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowUserDetails");
      });
  }

  render() {
    const user = this.state.user;
    const columns = [
      {
        title: "Name",
        render: (text) => (
          <p>
            <strong>{user.name}</strong>
          </p>
        ),
      },
      {
        title: "Employer",
        render: () => <p>{user.employer}</p>,
      },
      {
        title: "Actions",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/create`}>Create</Link>
            <Link to={`/edit-user/${user._id}`}>Edit User</Link>
            <Link
              onClick={() => {
                onDeleteUser(this.props.match.params.id, this.props.history);
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
        description: "user has assets",
      },
    ];

    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="User Resources"
        />
        <Table pagination={false} columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default ShowUserDetails;
