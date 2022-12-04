import React, { Component } from "react";
import NewHead from "./EmpHead";
//import { Link } from "react-router-dom";
//import ProfileName from './components/Profile'


export default class EmpDash extends Component {

  render() {
    return (
      <div class="card text-center">
        <NewHead />
        <h4 class="lead">
          <small class="text-muted">Welcome to Cascade! </small>
        </h4> 
      </div>
    );
  }
}