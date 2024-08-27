// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import PacketDetails from './PacketDetails';
import Analysis from './Analysis';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packet-details/:id" element={<PacketDetails />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
