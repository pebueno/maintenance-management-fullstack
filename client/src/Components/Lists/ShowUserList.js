import React, { Component } from "react";
import { Table } from "antd";

// import "../App.css";
import axios from "axios";
// import { Link } from "react-router-dom";
import UserCard from "../Cards/UserCard";

class ShowUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    //Read Operation - List users
    axios
      .get(process.env.REACT_APP_API_URL + "/users")
      .then((res) => {
        this.setState({
          users: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowUserList");
      });
  }

  render() {
    const users = this.state.users;
    // console.log("Printuser: " + users);
    let userList;

    if (!users) {
      userList = "there is no user recored!";
    } else {
      userList = users.map((user, k) => <UserCard user={user} key={k} />);
    }
    //Data for Tables
    const dataSource = [
      {
        name: "Pedro",
      },
    ];

    const columns = [
      {
        title: "Employer",
        // dataIndex: "client",
        render: () => <span>{userList}</span>,
      },
      {
        title: "User",
      },
    ];
    return (
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    );
  }
}

export default ShowUserList;
