import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login'
import SignUp from './components/signup'
import Dashboard from './Students/userDashboard'
import ProfileName from './Students/Profile'
import CptForm from './Students/CptForm'
import EmpDash from './Employee/EmpDash'
import CPTApplication from './Students/CPTApplication'
import ActionItem from './Employee/ActionItem'
import Activity from './Students/Activity'
import DeanDash from './dean/DeanDash'
import DeanActionItem from './dean/DeanActionItems'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to={'/sign-in'}>
              UNT Cascade
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfileName />} />
              <Route path="/CptForm" element={<CptForm />} />
              <Route path="/CPTApplication" element={<CPTApplication />} />
              <Route path="/Activity" element={<Activity />} />
              <Route path="/EmpDash" element={<EmpDash />} />
              <Route path="/ActionItem" element={<ActionItem />} />
              <Route path="/DeanDash" element={<DeanDash />} />
              <Route path="/DeanActionItem" element={<DeanActionItem />} />
            </Routes>
          </div>
        </div>
    </Router>
  )
}

export default App