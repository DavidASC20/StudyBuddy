import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

function Home() {
  const navigate = useNavigate();

  const handleViewTestsClick = () => {
    navigate('/view-tests');
  };

  const handleUploadClick = () => {
    navigate('/upload-test');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">StudyBuddy</h1>
      <p className="home-description">
        Upload your past tests or browse through existing tests for your class!
      </p>
      <div className="button-group">
        <button className="primary-button" onClick={handleUploadClick}>
          Upload Test
        </button>
        <button className="secondary-button" onClick={handleViewTestsClick}>
          View Existing Tests
        </button>
      </div>
    </div>
  );
}

export default Home;
