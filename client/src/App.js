import React from 'react';
import './App.css';

import Navbar from './components/layout/Navbar';
import SideNavbar from './components/layout/SideNavbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

const App = () => (
  <div className="App">
    <Navbar />
    <SideNavbar />
    <Landing />
    <Footer />
  </div>
);

export default App;
