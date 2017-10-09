import React from 'react';

const NotFound = () => (
  <div className=" mx-auto ">
    <div className="not-found fluid-width-600 ">
      <h1 className="display-4 ">404. OOPS</h1>
      <p>Sorry, this page does not exist</p>
      <p>Let's go back and try this agian</p>
      <button type="button" className="btn btn-custom btn-info" href="/">
        Go to theMAMAclub home
      </button>
    </div>
  </div>
);

export default NotFound;
