import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import EditorWrapper from './components/EditorWrapper'; // Import the EditorWrapper component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:id" element={<EditorWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
