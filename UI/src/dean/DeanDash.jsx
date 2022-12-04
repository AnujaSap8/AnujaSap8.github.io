import React, { Component } from "react";
import DeanNewHead from "./DeanHead";
//import { Link } from "react-router-dom";
//import ProfileName from './components/Profile'


export default class DeanDash extends Component {

  render() {
    return (
      <div class="card text-center">
        <DeanNewHead />
        <h4 class="lead">
          <small class="text-muted">Welcome to Cascade! </small>
        </h4> 
      </div>
    );
  }
}