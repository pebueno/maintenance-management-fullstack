import React, { Component } from "react";
import { Table, Tag, Space, List, Typography, Divider, Image } from "antd";
import { Link } from "react-router-dom";
// import "../../App.css";
import axios from "axios";
// import AssetForm from "../../Forms/AssetForm";

class ShowAssetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: {},
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    //Read Operation - asset Details
    axios
      .get(
        process.env.REACT_APP_API_URL + "/assets/" + this.props.match.params.id
      )
      .then((res) => {
        // console.log("Print-ShowAssetDetails-API-response: " + res.data);
        this.setState({
          asset: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowAssetDetails");
      });
  }

  //Delete asset
  onDeleteClick(id) {
    axios
      .delete(process.env.REACT_APP_API_URL + "/assets/" + id)
      .then((res) => {
        this.props.history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowAssetDetails_deleteClick");
      });
  }

  render() {
    const asset = this.state.asset;

    const columns = [
      {
        title: "Name",
        render: (text) => (
          <p>
            <strong>{asset.name}</strong>
          </p>
        ),
      },
      {
        title: "Owner",
        render: (text) => <p>{asset.owner}</p>,
      },
      {
        title: "Model",
        render: (text) => <p>{asset.model}</p>,
      },
      // {
      //   title: "Description",
      //   render: (text) => <p>{asset.description}</p>,
      // },
      {
        title: "Status",
        dataIndex: "tags",
        render: (text) => (
          <Tag
            color={
              asset.status === "Alerting"
                ? "yellow"
                : asset.status === "Running"
                ? "green"
                : "volcano"
            }
          >
            {asset.status}
          </Tag>
        ),
        //   render: (tags) => (
        //     <>
        //       {tags.map((tag) => {
        //         let color = tag === "Alerting" ? "yellow" : "green";
        //         if (tag === "Stopped") {
        //           color = "volcano";
        //         }
        //         return (
        //           <Tag color={color} key={tag}>
        //             {asset.status}
        //           </Tag>
        //         );
        //       })}
        //     </>
        //   ),
      },
      {
        title: "Health",
        render: (text) => <p>{asset.health}%</p>,
      },
      {
        title: "Actions",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/edit-asset/${asset._id}`}>Edit Asset</Link>
            <a onClick={this.onDeleteClick.bind(this, asset._id)}>Delete</a>
          </Space>
        ),
      },
    ];

    const data = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice"],
      },
      // {
      //   key: "2",
      //   name: "Jim Green",
      //   age: 42,
      //   address: "London No. 1 Lake Park",
      //   tags: ["loser"],
      // },
      // {
      //   key: "3",
      //   name: "Joe Black",
      //   age: 32,
      //   address: "Sidney No. 1 Lake Park",
      //   tags: ["cool"],
      // },
    ];

    const description = ["Japanese princess to wed commoner."];

    function AssetImage() {
      return <Image width={200} src={asset.image} alt={asset.name} />;
    }
    return (
      <div>
        <br /> <br />
        <Link to="/">Show Asset List</Link>
        <br />
        <Divider orientation="left">Asset's Record</Divider>
        {/* <div>
          <p>View Asset's Info</p>
        </div>
        <div></div> */}
        {/* <button
          type="button"
          onClick={this.onDeleteClick.bind(this, asset._id)}
        >
          Delete Asset
        </button> */}
        {/* <br />
        <br />
        <hr /> <br /> */}
        <AssetImage />
        {/* <img src={asset.image} alt={asset.name}></img> */}
        <List
          header={<div>Description</div>}
          bordered
          dataSource={description}
          renderItem={(item) => <List.Item>{asset.description}</List.Item>}
        />
        <Table pagination={false} columns={columns} dataSource={data} />
        {/* <UserForm /> */}
      </div>
    );
  }
}

export default ShowAssetDetails;
