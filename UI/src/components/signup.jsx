import React, { Component } from "react";
import url from "../url";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      firstName: "",
      middleName:"",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      nationality: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onClickAvailability(e) {

    if (e.target.checked && !this.setState({ role: e.target.value })) {
      this.setState({
        radioButton: true,
      })
    } else if (e.target.checked && !this.setState({ role: e.target.value })) {
      this.setState({
        radioButton: false,
      })

    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const { uid, firstName, middleName,lastName, email, password, confirmPassword, role, nationality } = this.state;
    console.log(uid, firstName, middleName,lastName, email, password, confirmPassword, role, nationality);
    fetch(`${url}/SignUp`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uid,
        firstName,
        middleName,
        email,
        lastName,
        password,
        confirmPassword,
        role,
        nationality
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        alert(data.Message)
        if (data.Message === "Role Registered") {
          window.location.href = "/sign-in"
        }
      });
  }
  render() {
    return (
      <div class="relative">
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>UID</label>
          <span aria-hidden="true" class="required">*</span>
          <input
            type="number"
            className="form-control"
            placeholder="UID"
            required
            onChange={(e) => this.setState({ uid: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>First Name</label>
          <span aria-hidden="true" class="required">*</span>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            required
            onChange={(e) => this.setState({ firstName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Middle Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Middle name"
            onChange={(e) => this.setState({ middleName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <span aria-hidden="true" class="required">*</span>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            required
            onChange={(e) => this.setState({ lastName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Email Address</label>
          <span aria-hidden="true" class="required">*</span>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <span aria-hidden="true" class="required">*</span>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>
          <span aria-hidden="true" class="required">*</span>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            required
            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <span aria-hidden="true" class="required">*</span>
          <div className="option">
            <input
              type={"radio"}
              name="role"
              value={"Student"}
              onChange={(e) => this.setState({ role: e.target.value })}
            />
            Student
          </div>
          <div className="option">
            <input
              type={"radio"}
              name="role"
              value={"Administrative Specialist"}
              onChange={(e) => this.setState({ role: e.target.value })}
            />
            Administrative Specialist
          </div>
          <div className="option">
            <input
              type={"radio"}
              name="role"
              value={"Academic Advisor"}
              onChange={(e) => this.setState({ role: e.target.value })}
            />
            Academic Advisor 
          </div>
          <div className="option">
            <input
              type={"radio"}
              name="role"
              value={"Dean"}
              onChange={(e) => this.setState({ role: e.target.value })}
            />
            Dean
          </div>
          <div className="option">
            <input
              type={"radio"}
              name="role"
              value={"Admin"}
              onChange={(e) => this.setState({ role: e.target.value })}   
            />
            Admin
          </div>
        </div>
        <div className="mb-3">
          <label>Nationality</label>
          <span aria-hidden="true" class="required">*</span>
          <input
            type="nationality"
            className="form-control"
            placeholder="Enter Nationality"
            required
            onChange={(e) => this.setState({ nationality: e.target.value })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
      </div>
    );
  }
}