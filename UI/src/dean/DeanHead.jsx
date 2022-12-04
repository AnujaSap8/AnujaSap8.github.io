import React from "react";
import { Link } from "react-router-dom";
//import ProfileName from './components/Profile'
//import { BrowserRouter as Routes, Route } from 'react-router-dom'
//import ColorBox from './ColorBox';

export default function DeanNewHead () {
  const logout = () => {
    console.clear();
    window.localStorage.clear();
  };

    return (
      <div class="card text-center">
        <div class="card-header">
          <ul class="nav nav-pills nav-fill">
          <li class="nav-item"> 
              <Link to="/DeanDash"> Home </Link>
            </li>
            <li class="nav-item"> 
              <Link to="/Profile"> Profile </Link>
            </li>
            <li class="nav-item"> 
              <Link to="/DeanActionItem"> Action Item </Link>
            </li>
            <li class="nav-item"> 
              <Link to="/" onClickCapture={logout}> Logout </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }