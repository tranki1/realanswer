import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-sm  navbar-toggleable-md navbar-light bg-faded">
    {/* <div className="container"> */}
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#mobile-nav"
      controls="navbarMobile"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="nav-left">
      <ul className="nav navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            real answer
          </Link>
        </li>
      </ul>
    </div>
    <Link className="navbar-brand mx-auto small-logo-text" id="logo" to="/">
      the
      <span className="logo-text">mama</span>
      club
    </Link>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Join us
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </div>

    {/*  Mobile */}
    <div className="collapse navbar-collapse" id="mobile-nav">
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Join us
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Mobile Link
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Mobile Link
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Mobile Link
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Mobile Link
          </Link>
        </li>
      </ul>
    </div>
    {/* </div> */}
  </nav>
);
export default Navbar;
