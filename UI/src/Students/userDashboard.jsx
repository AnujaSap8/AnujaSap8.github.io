import React, { Component } from "react";
import Head from "./Head";
//import { Link } from "react-router-dom";
//import ProfileName from './components/Profile'


export default class UserDetails extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userData: "",
  //   };
  // }
  // componentDidMount() {
  //   fetch("http://127.0.0.1:3010/userData", {
  //     method: "POST",
  //     crossDomain: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({
  //       uid: window.localStorage.getItem("uid"),
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data, "userData");
  //       this.setState({ userData: data.data });
  //     });
  // }

  render() {
    return (
      <div class="card text-center">
        <Head />
        <h4 class="lead">
          <small class="text-muted">Welcome to Cascade! </small>
        </h4> 
      </div>
    );
  }
}