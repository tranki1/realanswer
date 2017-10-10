import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className=" mx-auto ">
    <div className="not-found fluid-width-600 ">
      <h1 className="display-4 ">404. OOPS</h1>
      <p>Sorry, this page does not exist</p>
      <p>Let's go back and try this agian</p>
      <Link className="btn btn-custom btn-info" to="/">
        Go to theMAMAclub home
      </Link>
    </div>
  </div>
);

export default NotFound;
