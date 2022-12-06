//import { Button } from "bootstrap";
//import { response } from "express";
import React, { useState, Component } from "react";
//import { Link } from "react-router-dom";
import Head from "./Head";
//import ProfileName from './components/Profile'
//import { BrowserRouter as Routes, Route } from 'react-router-dom'
import url from "../url";

export default class CPTApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      empFormData: "",
      advFormData: "",
      empData: "",
      advData: ""
    };
    this.encodeEMPFileBase64 = (file) => {
      var reader = new FileReader();
      let Base64 = '';
      if (file) {
        reader.readAsDataURL(file[0]);
        reader.onload = () => {
          var Base64 = reader.result;
          // console.log(Base64);
          this.setState({ empFormData: Base64 });
        };
        reader.onerror = (error) => {
          console.log("error: ", error);
        };
      }
      return Base64;
    };
    this.encodeADVFileBase64 = (file) => {
      var reader = new FileReader();
      let Base64 = '';
      if (file) {
        reader.readAsDataURL(file[0]);
        reader.onload = () => {
          var Base64 = reader.result;
          // console.log(Base64);
          this.setState({ advFormData: Base64 });
        };
        reader.onerror = (error) => {
          console.log("error: ", error);
        };
      }
      return Base64;
    };
    this.onEmpFileChange = (e) => {
      // console.log("Employer Form")
      // console.log(e.target.files[0]);
      // console.log(e.target.files[0].name);
      // console.log(e.target.files[0].size);
      // console.log(e.target.files[0].type);
      this.setState({ empFormData: this.encodeEMPFileBase64(e.target.files) })
      console.log("12345678")
      console.log(this.state.empFormData)
      this.setState({ empData: "true" })
    };
    this.onAdvFileChange = (e1) => {
      // console.log("Advisor Form")
      // console.log(e.target.files[0]);
      // console.log(e.target.files[0].name);
      // console.log(e.target.files[0].size);
      // console.log(e.target.files[0].type);
      this.setState({ advFormData: this.encodeADVFileBase64(e1.target.files) })
      console.log("2345")
      console.log(this.state.advFormData)
      this.setState({ advData: "true" })
    };
    
    //this.changeHandler = this.changeHandler(this);
    //this.handleSubmission = this.handleSubmission(this);
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
  };

  render() {
    return (
      <div class="card text-center">
        <Head />
        <div class="card-header">
          <h2 class="text-muted"> Application </h2>
          <div class="form">
            <label>First Name : </label>
            <input disabled value={this.state.userData.firstName} />
            <label>Middle Name : </label>
            <input disabled value={this.state.userData.middleName} />
            <label>Last Name :  </label>
            <input disabled value={this.state.userData.lastName}></input>
          </div>
          <br />
          <input class="form-control form-control-sm" id="EmpForm" type="file" name="file" required onChange={this.onEmpFileChange} />
          <input class="form-control form-control-sm" id="AdvForm" type="file" name="file" required onChange={this.onAdvFileChange} />
          <h5 class="card-title">All done? </h5>
          <p class="card-text">Want to proceed with next step</p>
          <div>
            {/* <button class="btn btn-primary" onClick={console.log(this.userData)}>
              Submit</button> */}
            {console.log("Emp Data", this.state.empData)
            }
            {console.log("ADV Data", this.state.advData)}
            <button
              class="btn btn-primary"
              disabled={this.state.empData.length === 0 && this.state.advData.length === 0}
              onClick={
                async (e) => {
                  e.preventDefault()
                  console.log("Clicked")
                  console.log(this.state.userData.uid)
                  console.log("Emp File:", this.state.empFormData)
                  console.log("ADV File", this.state.advFormData)
                  if (this.state.empData.length != 0 && this.state.advData.length != 0) {
                    fetch(`${url}/initiateApplication`, {
                      headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                      },
                      method: `POST`,
                      body: JSON.stringify({
                        uid: this.state.userData.uid,
                        employer_form: this.state.empFormData,
                        advisor_form: this.state.advFormData
                      })
                    }).then((response) => response.json()).then((resp) => {
                      // setResp((resp.Message))
                      console.log(resp.Message)
                      alert(resp.Message)
                      window.localStorage.setItem("a_id", resp.data.a_id)
                      window.location.href = "/userDashboard"
                    })
                  }
                  else{
                    if(this.state.empData.length === 0){
                      alert("Upload Employer Files")
                    }
                    else if(this.state.advData.length === 0){
                      alert("Upload Advisor Form")
                    }
                  }
                }
              }
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

