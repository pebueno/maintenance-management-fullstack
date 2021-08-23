import React, { Component } from "react";
import { Row, Col, Divider } from "antd";
import axios from "axios";
import UnitCard from "../Cards/UnitCard";

class ShowUnitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
    };
  }

  componentDidMount() {
    //Read Operation - List Units
    axios
      .get(process.env.REACT_APP_API_URL + "/units")
      .then((res) => {
        this.setState({
          units: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowunitList");
      });
  }

  render() {
    const units = this.state.units;
    // console.log("Printunit: " + units);
    let unitList;

    if (!units) {
      unitList = "there is no unit recored!";
    } else {
      unitList = units.map((unit, k) => <UnitCard unit={unit} key={k} />);
    }

    return (
      <>
        <Row
          style={{ background: "#FAFAFA", padding: "15px" }}
          className="tableTitle"
        >
          <Col span={10}>
            <h4>Unit</h4>
          </Col>

          <Col span={10}>
            <h4>
              <Divider type="vertical" />
              Owner
            </h4>
          </Col>
          <Col span={4}>
            <Divider type="vertical" />
          </Col>
        </Row>
        <div style={{ paddingLeft: "15px" }}>{unitList}</div>
      </>
    );
  }
}

export default ShowUnitList;
