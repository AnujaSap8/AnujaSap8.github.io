import React, { Component, useState } from "react";
// import Head from "../Students/Head";
import Base64Downloader from "common-base64-downloader-react";
import NewHead from "./EmpHead";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import url from "../url";

export default class ActionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationData: [],
      role: "",
      selectedOption: "",
      empForm: "",
      advForm: "",
    };
    this.onValueChange = this.onValueChange.bind(this);
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
        role_id: parseInt(window.localStorage.getItem("role_id")),
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
            <td>
              <Base64Downloader
                base64={employer_form}
                downloadName="pdfDownload_emp"
                onDownloadSuccess={() => this.setState({ empForm: "true" })}
              >
                Click to download Employer Form
              </Base64Downloader>
            </td>
            <td>
              <Base64Downloader
                base64={advisor_form}
                downloadName="pdfDownload_adv"
                onDownloadSuccess={() => this.setState({ advForm: "true" })}
              >
                Click to download Advisor Form
              </Base64Downloader>
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
                disabled={this.state.empForm === ""}
                disabled={this.state.advForm === ""}
                onClick={async (e) => {
                  e.preventDefault();
                  console.log("Clicked");
                  console.log(this.state.empForm);
                  console.log(this.state.advForm);
                  console.log("aid:: " + a_id);
                  console.log("status:: " + this.state.selectedOption);
                  console.log(
                    "role_id:: " +
                      parseInt(window.localStorage.getItem("role_id"))
                  );
                  if (
                    this.state.empForm.length != 0 &&
                    this.state.advForm.length != 0
                  ) {
                    fetch(`${url}/updateApplicationStatus`, {
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                      },
                      method: `POST`,
                      body: JSON.stringify({
                        a_id: a_id,
                        status: this.state.selectedOption,
                        role_id: parseInt(
                          window.localStorage.getItem("role_id")
                        ),
                      }),
                    })
                      .then((response) => response.json())
                      .then((resp) => {
                        console.log(resp.Message);
                        alert(resp.Message);
                        //     window.localStorage.setItem("a_id", resp.data.a_id)
                        window.location.href = "/ActionItem";
                      });
                  } else {
                    if (this.state.empData.length === 0) {
                      alert("Upload Employer Files");
                    } else if (this.state.advData.length === 0) {
                      alert("Upload Advisor Form");
                    }
                  }
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
              <NewHead />
            </div>
          <Container>
          <Card>
            <div class ='card'>
              <Table responsive>
                <thead>
                  <tr>{this.renderTableHeader()}</tr>
                </thead>
                <tbody>{this.renderTableData()}</tbody>
              </Table>
          </div>
          </Card>
        </Container>
      </>
    );
  }
}
