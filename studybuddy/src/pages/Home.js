import React from 'react';
import './Home.css'; 

function Home() {
  function handleUploadClick() {
    console.log("Upload Test button clicked!");
  }

  function handleViewTestsClick() {
    console.log("View Existing Tests button clicked!");
  }

  return (
    <div className="App">
      <div className="App-body">
        <div className="home-container">
          <h1 className="title">StudyBuddy</h1>
          <p className="description">
            Upload your past tests or browse through existing tests for your class!
          </p>
          <div className="button-container">
            <button className="primary-button" onClick={handleUploadClick}>
              Upload Test
            </button>
            <button className="secondary-button" onClick={handleViewTestsClick}>
              View Existing Tests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;