import React, { useState } from 'react';
import './ViewTests.css';

function ViewTests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tests, setTests] = useState([]);

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
    // Mock search result for demonstration
    setTests([
      'CS101 Midterm - Fall 2024',
      'CS101 Final Exam - Spring 2024',
    ]);
  };

  return (
    <div className="view-tests-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a test..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results-container">
        <h2>Choose your desired test to get started</h2>
        {tests.length > 0 ? (
          <ul className="test-list">
            {tests.map((test, index) => (
              <li key={index} className="test-item">
                {test}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tests found. Try a different search!</p>
        )}
      </div>
    </div>
  );
}

export default ViewTests;
