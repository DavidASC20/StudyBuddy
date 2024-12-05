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
