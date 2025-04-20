import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewTests.css';

function ViewTests() {
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  // API call for fetching departments
  const fetchDepartments = () =>
    axios
      .get('http://localhost:5000/api/departments')
      .then((res) => res.data);

  // **Real** API call for fetching classes based on department
  const fetchClasses = (department) =>
    axios
      .get(`http://localhost:5000/api/departments/${department}/classes`)
      .then((res) => res.data);

  // Placeholder for fetching tests (you can replace similarly later)
  const fetchTests = (department, classCode) => {
    // TODO: replace with your real tests API
    return Promise.resolve([]);
  };

  // Fetch departments on mount
  useEffect(() => {
    fetchDepartments()
      .then((data) => setDepartments(data))
      .catch((err) => console.error('Error fetching departments:', err));
  }, []);

  // Fetch classes whenever a department is selected
  useEffect(() => {
    if (selectedDepartment) {
      fetchClasses(selectedDepartment)
        .then((data) => setClasses(data))
        .catch((err) => {
          console.error('Error fetching classes:', err);
          setClasses([]);
        });
    } else {
      setClasses([]);
      setSelectedClass('');
      setTests([]);
    }
  }, [selectedDepartment]);

  // Fetch tests whenever a class is selected
  useEffect(() => {
    if (selectedDepartment && selectedClass) {
      fetchTests(selectedDepartment, selectedClass)
        .then((data) => setTests(data))
        .catch((err) => {
          console.error('Error fetching tests:', err);
          setTests([]);
        });
    } else {
      setTests([]);
    }
  }, [selectedDepartment, selectedClass]);

  return (
    <div className="view-tests-container">
      <div className="dropdown-container">
        <div className="dropdown">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedClass('');
              setTests([]);
            }}
          >
            <option value="">Select a Department</option>
            {departments.map((dept) => (
              <option key={dept.prefix} value={dept.prefix}>
                {dept.prefix}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown">
          <label htmlFor="class">Class</label>
          <select
            id="class"
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setTests([]);
            }}
            disabled={!classes.length}
          >
            <option value="">Select a Class</option>
            {classes.map((cls) => (
              <option key={cls.code} value={cls.code}>
                {cls.course_name} ({cls.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-container">
        <h2>Available Tests</h2>
        {tests.length > 0 ? (
          <ul className="test-list">
            {tests.map((test, idx) => (
              <li key={idx} className="test-item">
                {`${test.test_name} - ${test.test_semester} ${test.test_year}`}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            {selectedClass
              ? 'No tests found for this class.'
              : 'Select a department and class to view tests.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default ViewTests;
