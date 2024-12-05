import React, { useState } from 'react';
import './ViewTests.css';

function ViewTests() {
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  // Fetch all departments on component mount
  useEffect(() => {
    fetch('/api/departments')
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  // Fetch classes whenever a department is selected
  useEffect(() => {
    if (selectedDepartment) {
      fetch(`/api/classes?department=${selectedDepartment}`)
        .then((response) => response.json())
        .then((data) => setClasses(data))
        .catch((error) => console.error('Error fetching classes:', error));
    }
  }, [selectedDepartment]);

  // Fetch tests whenever a class is selected
  useEffect(() => {
    if (selectedDepartment && selectedClass) {
      fetch(`/api/tests?department=${selectedDepartment}&class=${selectedClass}`)
        .then((response) => response.json())
        .then((data) => setTests(data))
        .catch((error) => console.error('Error fetching tests:', error));
    }
  }, [selectedDepartment, selectedClass]);

  return (
    <div className="view-tests-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a test!"
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
