import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CreateInvoice from './CreateInvoice.tsx'; // Import the CreateInvoice component
import Home from './Home.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Main page */}
        <Route path="/create-invoice" element={<CreateInvoice />} /> {/* Create Invoice page */}
      </Routes>
    </Router>
  );
}

export default App
