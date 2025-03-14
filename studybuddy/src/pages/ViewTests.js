import React, { useState, useEffect } from 'react';
import './ViewTests.css';

function ViewTests() {
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  // Placeholder function to simulate fetching departments
  const fetchDepartments = () => {
    // Replace with actual API call when available
    return Promise.resolve([
      { department_code: 'CS', department_name: 'Computer Science' },
      { department_code: 'ENG', department_name: 'Engineering' },
    ]);
  };

  // Placeholder function to simulate fetching classes based on department
  const fetchClasses = (department) => {
    // Replace with actual API call when available
    if (department === 'CS') {
      return Promise.resolve([
        { class_code: 'CS101', class_name: 'Intro to Computer Science' },
        { class_code: 'CS102', class_name: 'Data Structures' },
      ]);
    } else if (department === 'ENG') {
      return Promise.resolve([
        { class_code: 'ENG101', class_name: 'Introduction to Engineering' },
      ]);
    }
    return Promise.resolve([]);
  };

  // Placeholder function to simulate fetching tests based on department and class
  const fetchTests = (department, classCode) => {
    // Replace with actual API call when available
    if (department === 'CS' && classCode === 'CS101') {
      return Promise.resolve([
        { test_name: 'Midterm', test_semester: 'Fall', test_year: 2023 },
        { test_name: 'Final', test_semester: 'Fall', test_year: 2023 },
      ]);
    }
    return Promise.resolve([]);
  };

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments()
      .then((data) => setDepartments(data))
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  // Fetch classes whenever a department is selected
  useEffect(() => {
    if (selectedDepartment) {
      fetchClasses(selectedDepartment)
        .then((data) => setClasses(data))
        .catch((error) => console.error('Error fetching classes:', error));
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
        .catch((error) => console.error('Error fetching tests:', error));
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
              setClasses([]); // Reset classes when department changes
              setSelectedClass(''); // Reset selected class
              setTests([]); // Reset tests
            }}
          >
            <option value="">Select a Department</option>
            {departments.map((dept) => (
              <option key={dept.department_code} value={dept.department_code}>
                {dept.department_name} ({dept.department_code})
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
              setTests([]); // Reset tests when class changes
            }}
            disabled={!classes.length}
          >
            <option value="">Select a Class</option>
            {classes.map((cls) => (
              <option key={cls.class_code} value={cls.class_code}>
                {cls.class_name} ({cls.class_code})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-container">
        <h2>Available Tests</h2>
        {tests.length > 0 ? (
          <ul className="test-list">
            {tests.map((test, index) => (
              <li key={index} className="test-item">
                {`${test.test_name} - ${test.test_semester} ${test.test_year}`}
              </li>
            ))}
          </ul>
        ) : (
          <p>{selectedClass ? 'No tests found for this class.' : 'Select a department and class to view tests.'}</p>
        )}
      </div>
    </div>
  );
}

export default ViewTests;
