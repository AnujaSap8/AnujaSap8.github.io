import React, { Component, useState } from "react";
// import Head from "../Students/Head";
import Base64Downloader from "common-base64-downloader-react";
// import NewHead from "./EmpHead";
import DeanHead from "./DeanHead";
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/esm/Container";
import url from "../url";

export default class DeanActionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationData: [],
      role: "",
      selectedOption: "",
      deanFormData: "",
      deanData: "",
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.encodeDeanFileBase64 = (file) => {
      var reader = new FileReader();
      let Base64 = "";
      if (file) {
        reader.readAsDataURL(file[0]);
        reader.onload = () => {
          var Base64 = reader.result;
          // console.log(Base64);
          this.setState({ deanFormData: Base64 });
        };
        reader.onerror = (error) => {
          console.log("error: ", error);
        };
      }
      return Base64;
    };
    this.onDeanFileChange = (e) => {
      // console.log("Employer Form")
      // console.log(e.target.files[0]);
      // console.log(e.target.files[0].name);
      // console.log(e.target.files[0].size);
      // console.log(e.target.files[0].type);
      this.setState({
        deanFormData: this.encodeDeanFileBase64(e.target.files),
      });
      console.log("12345678");
      console.log(this.state.deanFormData);
      this.setState({ deanData: "true" });
    };
  }

  componentDidMount() {
    fetch(`${url}/specificApplication`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        // role_id: parseInt(window.localStorage.getItem("role_id")),
        role_id: parseInt(3),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "applicationData");
        this.setState({ applicationData: data.data });
      });
  }

  renderTableHeader() {
    let header = [
      "Application Id",
      "Student Id",
      "Name",
      "Status",
      "Employer Form",
      "Advisor Form",
      "Upload Signed Advisor Form",
      "Action",
      "Submit",
    ];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }
  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  renderTableData() {
    return this.state.applicationData.map((d, index) => {
      const {
        a_id,
        uid,
        current_status,
        student_name,
        next_approver,
        advisor_form,
        employer_form,
      } = d; //destructuring
      let role = "";
      if (next_approver === 1) {
        role = "Adminstrative Specialist";
      }
      return (
        <>
            <tr key={index}>
              <td>{a_id}</td>
              <td>{uid}</td>
              <td>{student_name}</td>
              <td>{current_status}</td>
            </tr>
            <tr>
              <td>
                <Base64Downloader
                  base64={advisor_form}
                  downloadName="pdfDownload_adv"
                >
                  Click to download Advisor Form
                </Base64Downloader>
              </td>
              <td>
                <Base64Downloader
                  base64={employer_form}
                  downloadName="pdfDownload_emp"
                >
                  Click to download Employer Form
                </Base64Downloader>
              </td>
              <td>
                <input
                  class="form-control form-control-sm"
                  id="EmpForm"
                  type="file"
                  name="file"
                  required
                  onChange={this.onDeanFileChange}
                />
              </td>
              <td>
                <div className="form-check form-check-inline" align="right">
                  <input
                    type="radio"
                    value="Approved"
                    name="action"
                    checked={this.state.selectedOption === "Approved"}
                    onChange={this.onValueChange}
                  />
                  Approve
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    value="Rejected"
                    name="action"
                    checked={this.state.selectedOption === "Rejected"}
                    onChange={this.onValueChange}
                  />
                  Reject
                </div>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={async (e) => {
                    e.preventDefault();
                    console.log("Clicked");
                    console.log("aid:: " + a_id);
                    console.log("status:: " + this.state.selectedOption);
                    console.log(
                      "role_id:: " +
                        parseInt(window.localStorage.getItem("role_id"))
                    );
                    fetch(`${url}/updateAppliStatusDean`, {
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                      },
                      method: `POST`,
                      body: JSON.stringify({
                        a_id: a_id,
                        status: this.state.selectedOption,
                        deanFormData: this.state.deanFormData,
                        // role_id: parseInt(window.localStorage.getItem("role_id"))
                      }),
                    })
                      .then((response) => response.json())
                      .then((resp) => {
                        console.log(resp.Message);
                        alert(resp.Message);
                        //     window.localStorage.setItem("a_id", resp.data.a_id)
                        window.location.href = "/ActionItem";
                      });
                  }}
                >
                  Submit
                </button>
              </td>
              </tr>
        </>
      );
    });
  }

  render() {
    return (
      <>
        <div className="nav-fill">
          <DeanHead />
        </div>
        <div className="flex-fill">
          <Table responsive>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
            </Table>
        </div>
      </>
    );
  }
}
