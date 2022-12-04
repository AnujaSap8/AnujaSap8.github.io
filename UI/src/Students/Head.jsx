import React from "react";
import { Link } from "react-router-dom";
//import ProfileName from './components/Profile'
//import { BrowserRouter as Routes, Route } from 'react-router-dom'
//import ColorBox from './ColorBox';

export default function Head() {
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
  const logout = () => {
    console.clear();
    window.localStorage.clear();
  };

  return (
    <>
      <span className="menu navigation-menu">Menu</span>

        <div class="card-header">
          <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
              <Link to="/userDashboard"> Home </Link>
            </li>
            <li class="nav-item">
              <Link to="/Profile"> Profile </Link>
            </li>
            <li class="nav-item">
              <Link to="/CptForm"> Forms </Link>
            </li>
            <li class="nav-item">
              <Link to="/Activity"> Activity </Link>
            </li>
            <li class="nav-item">
              <Link to="/" onClickCapture={logout}> Logout </Link>
            </li>
          </ul>
        </div>
      
    </>
  );
}