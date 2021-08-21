import React, { Component } from "react";
import { Table, Tag, Space, List, Divider, Image, PageHeader } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

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
            <Link onClick={this.onDeleteClick.bind(this, asset._id)}>
              Delete
            </Link>
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
    ];

    const description = ["Japanese princess to wed commoner."];

    function AssetImage() {
      return <Image width={200} src={asset.image} alt={asset.name} />;
    }
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Asset List"
        />
        <div style={{ padding: "5px 25px" }} className="site-layout-background">
          <Divider orientation="left">Asset's Record</Divider>
          <AssetImage />
          <List
            header={<div>Description:</div>}
            bordered
            dataSource={description}
            renderItem={(item) => <List.Item>{asset.description}</List.Item>}
          />
          <Table pagination={false} columns={columns} dataSource={data} />
        </div>
      </div>
    );
  }
}

export default ShowAssetDetails;
