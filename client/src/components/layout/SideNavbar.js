import React from 'react';

const SideNavbar = () => (
  <div id="user-column">
    <div className="menu-user-info">
      <div className="user-avatar">
        <img src="https://via.placeholder.com/100x100" alt="10000000002339538" />
      </div>
      <div className="user-name title">kim</div>
      <div className="left-rail-row">
        <div className="title">BROWSE</div>
        <a className="menu-link" href="/real-answers/">
          HOME
        </a>
      </div>
    </div>
  </div>
);
export default SideNavbar;
