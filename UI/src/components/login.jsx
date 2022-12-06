import React, { useState, Text } from 'react'
import url from '../url';
import errorBoundary from './Error'

export default function Login() {

  const [uid, setUID] = useState();
  const [password, setPassword] = useState();
  const [resp, setResp] = useState();
  const [roleid, setRoleId] = useState();
  const handlePassword = e => {
    setPassword(e.target.value)
  }
  const handleUID = e => {
    setUID(e.target.value)
  }

  return (
    <errorBoundary>
    <div>
      <form>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>UID</label>
          <span aria-hidden="true" class="required">*</span>
          <input
            type="uid"
            type="number"
            className="form-control"
            placeholder="Enter UID"
            required
            onChange={handleUID}
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
            onChange={handlePassword}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={
              async (e) => {
                e.preventDefault()
                console.log("Clicked")
                fetch(`${url}/SignIn`, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  method: `POST`,
                  body: JSON.stringify({ password, uid })
                }).then((response) => response.json()).then((resp) => {
                  setResp((resp.Message))
                  setRoleId(resp.data.role_id)
                  console.log(resp.Message)
                  alert(resp.Message)
                  window.localStorage.setItem("uid", uid)
                  window.localStorage.setItem("role_id", resp.data.role_id)
                  console.log(resp.Message)
                  if(resp.Message === "Invalid UID"){
                    window.location.href = "/sign-in"
                  }

                  else if(resp.Message === "Invalid Password"){
                    window.location.href = "/sign-in"
                  }

                  else if (resp.data.role_id === 0) {
                    console.log("Role Id of student")
                    window.location.href = "/userDashboard"

                  }
                  else if (resp.data.role_id === 3) {
                    console.log("Role Id of student")
                    window.location.href = "/DeanDash"

                  }
                  else {
                    console.log("role id of employee")
                    window.location.href = "/EmpDash"
                  }

                })
              }
            }
          >
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="/sign-up"> New User</a>
        </p>
      </form>
      {/* <Text>
            {resp}
          </Text> */}
    </div>
    </errorBoundary>
  )
}