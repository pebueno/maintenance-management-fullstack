import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "../../App.css";
import axios from "axios";
import { Table, PageHeader, Space } from "antd";

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

  //Delete user
  onDeleteClick(id) {
    axios
      .delete(process.env.REACT_APP_API_URL + "/users/" + id)
      .then((res) => {
        this.props.history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowUserDetails_deleteClick");
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
            <Link onClick={this.onDeleteClick.bind(this, user._id)}>
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
