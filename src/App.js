import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/index/Index';
import Code from './pages/code/Code';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Index/>} />
        <Route path="/code" element={< Code/>} />
      </Routes>
    </Router>
  );
}

export default App;
