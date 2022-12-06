import React, { Component } from "react";
import Head from "./Head";
import url from "../url";

export default class ProfileName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    // fetch("http://127.0.0.1:3010/userData", {
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
        <Head />
        <h1>
          <small className="text-muted">Profile</small>
        </h1>
        <h2 className="lead">
          Name:{" "}
          <small className="text-muted">
            {" "}
            {this.state.userData.firstName}{" "}
          </small>{" "}
        </h2>
        <h2 className="lead">
          Email:{" "}
          <small className="text-muted"> {this.state.userData.email} </small>{" "}
        </h2>
      </div>
    );
  }
}
