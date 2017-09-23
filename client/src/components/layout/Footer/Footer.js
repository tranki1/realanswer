import React from 'react';

import './Footer.css';

const Footer = () => (
  <footer className="text-white p-4 text-center">
    Copyright &copy;
    {new Date().getFullYear()}
    theMammaclub
  </footer>
);
export default Footer;
