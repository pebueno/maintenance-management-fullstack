import React, { Component } from "react";
import { Row, Col, Divider } from "antd";
import axios from "axios";
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
    return (
      <>
        <Row
          style={{ background: "#FAFAFA", padding: "15px" }}
          className="tableTitle"
        >
          <Col span={10}>
            <h4>User</h4>
          </Col>

          <Col span={10}>
            <h4>
              <Divider type="vertical" />
              Employer
            </h4>
          </Col>
          <Col span={4}>
            <Divider type="vertical" />
          </Col>
        </Row>
        <div style={{ paddingLeft: "15px" }}>{userList}</div>
      </>
    );
  }
}

export default ShowUserList;
