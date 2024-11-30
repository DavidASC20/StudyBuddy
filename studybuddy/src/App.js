import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ViewTests from './pages/ViewTests';
import UploadTest from './pages/UploadTest';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-tests" element={<ViewTests />} />
          <Route path="/upload-test" element={<UploadTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
