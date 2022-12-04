//import { Button } from "bootstrap";
//import { response } from "express";
import React from "react";
//import { Link } from "react-router-dom";
import Head from "./Head";
//import ProfileName from './components/Profile'
//import { BrowserRouter as Routes, Route } from 'react-router-dom'
//import ColorBox from './ColorBox';

export default function CptForm() {
    //   constructor(props) {
    //     super(props);
    //     this.state = {
    //       userData: "",
    //     };
    // }

    //   const componentDidMount=()=> {
    //     fetch("http://127.0.0.1:3010/userData", {
    //       method: "POST",
    //       crossDomain: true,
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //       },
    //       body: JSON.stringify({
    //         uid: window.localStorage.getItem("uid"),
    //       }),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data, "userData");
    //         this.setState({ userData: data.data });
    //       });
    //   }

  

    return (
        <div class="card text-center">
            <Head />
            <h2 class="text-muted"> CPT Forms Application </h2>
            <nav class="nav flex-column">
                <h4> Download the form below link </h4>
                <a href="https://international.unt.edu/sites/default/files/CPT-Employer%20Information%20%281%29.pdf"> Employer Form  </a>
                <a href="https://international.unt.edu/sites/default/files/CPT-Advisor%20Information%20NEW.pdf"> Advisor Form </a>
                <a href="/CPTApplication">CPTApplication</a>
            </nav>                
        </div>
    );
};
