// All imports
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import Base64Downloader from 'common-base64-downloader-react';
//import parse from "html-react-parser";
//import { useEffect, useState } from 'react';
//import errorBondary from '../components/Error';
//import Col from 'react-bootstrap/Col';
//import Row from 'react-bootstrap/Row';
import url from '../url';

export default class PostTitles extends Component {

  constructor(props) {
    super(props);
    // const  [appliData, setApplicationData] = useState([])
    this.state = {
      totalAppli: [],
      // role: ''
      aid_data: ''
    };
    // this.getLast_Acted = async (aid) => {
    //   const resp = await fetch(`http://127.0.0.1:3010/applicationData/${aid}`).then(res => res.json()).then((data) => {
    //     console.log("response:",data.data.a_id)
    //     this.setState({aid_data: data.data.a_id})
    //   })
    //   // const rs = resp.json()
    //   // this.setState({aid: rs.data})
    //   console.log(this.state.aid_data)
    //   return resp
    // }
  }

  componentDidMount() {
    fetch(`${url}/applicationData`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uid: window.localStorage.getItem("uid")
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "applicationData");
        this.setState({ totalAppli: data.data });
      });
  };




  // async componentDidMount() {
  //   const [totalAppli, setApplicationData] = totalAppli;
  //   const [a_id, setAID] = a_id;
  //   const [getDetails] = await Promise([
  //     fetch("http://127.0.0.1:3010/studentApplicationStatus", {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       },
  //       method: `POST`,
  //       body: JSON.stringify({ uid: window.localStorage.getItem("uid") })
  //     })
  //       .then((data) => data.json()).then((resp) => {
  //         setApplicationData(resp.data)
  //       }).then(this.handlegetDetails(getDetails)),
  //   ])
  //   console.log()
  //   const [getPostsData] = await Promise([
  //     fetch("http://127.0.0.1:3010/applicationDetails", {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       },
  //       method: `POST`,
  //       body: JSON.stringify({ a_id: this.totalAppli.a_id })
  //     })
  //       .then((data) => data.json()).then((resp) => {
  //         setApplicationData(resp.data)
  //       }).then(this.handlegetDetails(getDetails)).then(this.handlegetPostsData(getPostsData)),
  //   ]);
  //   // this.handlegetDetails(getDetails);
  //   // this.handlegetPostsData(getPostsData);
  // };

  render() {
    return (
      <div className='flex-fill' >
        <Container>
          <h6>
            <small class="text-muted">Number of application submitted is : {this.state.totalAppli.length}</small>
          </h6>
          <Card>
            <div class="card">
              <div class="card-body">
                <p class="card-description">
                  <h4>
                    <small class="text-muted">Applications</small>
                  </h4>
                </p>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>AppID</th>
                      <th>Status</th>
                      <th>Last Acted</th>
                      <th>Next Approver</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  {/* <tr>{this.handlegetDetails()}</tr>
                  <tr>{this.handlegetPostsData()}</tr> */}

                  {this.state.totalAppli.map(d => d.current_status === "Approved by Dean" ? (
                    <tr>
                      <td>
                        {d.a_id}
                      </td>
                      <td>
                        {d.current_status}
                      </td>
                      <td>
                        {d.last_acted}
                      </td>
                      <td>
                        {d.next_approver_role}
                      </td>
                      {
                        console.log(d.deanApprovedform)
                      }
                      <td>
                        <Base64Downloader base64={d.deanApprovedForm} downloadName="pdfDownload_dean">
                          Click to download Dean Approved Form
                        </Base64Downloader>
                      </td>
                    </tr>
                  )
                    :
                    (
                      <tr>
                        <td>
                          {d.a_id}
                        </td>
                        <td>
                          {d.current_status}
                        </td>
                        <td>
                          {d.last_acted}
                        </td>
                        <td>
                          {d.next_approver_role}
                        </td>
                        {
                          console.log(d.deanApprovedform)
                        }
                        <td>
                          {d.current_status}
                        </td>

                      </tr>
                    )
                  )
                  }
                </Table>
              </div>
            </div>
          </Card>
        </Container>
      </div>
    );
  }
}

