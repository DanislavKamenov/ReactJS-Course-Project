import React, { Component } from 'react';
import './App.css';
import './components/pages/Page.css';

import Router from './Router';
import NavigationBar from './components/common/NavigationBar';
import Notification from './components/common/Notification';
import Footer from './components/common/Footer';

class App extends Component { 
  render() {
    return (
        <div className="App">
            <NavigationBar />
            <Notification />
            <Router />
            <Footer />
        </div>
    );
  }
}

export default App;
