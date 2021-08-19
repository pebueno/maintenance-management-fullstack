import React, { Component } from "react";
// import "../App.css";
import axios from "axios";
// import { Link } from "react-router-dom";
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
      <div>
        <br />
        <h2>Units List</h2>
        <hr />

        <div>{unitList}</div>
      </div>
    );
  }
}

export default ShowUnitList;
