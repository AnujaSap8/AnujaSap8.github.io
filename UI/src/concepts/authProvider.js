import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class auth extends Component() {

  constructor(props){
    super(props);
    this.state = {
      Role: true
    }
  }
  authProvider(e) {
    fetch(`${url}/SignUp`, {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      uid: window.localStorage.getItem("uid"),
      role: roleId.AcceptgetItem("role")
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister as Student");
      alert(data.Message)
      if (data.Message === "Student") {
        window.location.href = "/userDashboard"
      }
    });
}

render(){
  const isRole = this.state.isRole;
  return(
    <div>
      {isRole ? <Link> Student </Link> : <Link> Employee </Link>}
    </div>
  )
}
}
