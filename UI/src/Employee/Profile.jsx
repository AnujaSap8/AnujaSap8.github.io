import React, { Component } from "react";
import NewHead from '/EmpDasj'

export default class ProfileName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    fetch(`${url}/userData`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uid: window.localStorage.getItem("uid"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }
  render() {
    return (
        <div>
          <NewHead />
          <h1>
            <small>Profile</small>
          </h1>
            <h2>Name: {this.state.userData.firstName} </h2>
            <h2>Email:</h2> {this.state.userData.email}
            <div>
              <button>Logout</button>
            </div>
        </div>
      );
  }
}