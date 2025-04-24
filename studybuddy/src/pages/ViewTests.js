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

  // API call for fetching classes based on department
  const fetchClasses = (department) =>
    axios
      .get(`http://localhost:5000/api/departments/${department}/classes`)
      .then((res) => res.data);

  
  const fetchTests = async (dept, cls) => {
    console.log('fetching tests for', { dept_prefix: dept, code: cls });
    try {
      const { data } = await axios.get('http://localhost:5000/tests/bycourse', {
        params: { dept_prefix: dept, code: cls }
      });
      console.log('response data:', data);
      return data;
    } catch (err) {
      console.error('error fetching tests:', err);
      throw err;
    }
  };


  // Fetch departments on mount
  useEffect(() => {
    fetchDepartments()
      .then((data) => setDepartments(data))
      .catch((err) => console.error('Error fetching departments:', err));
  }, []);

  // load classes when department changes
  useEffect(() => {
    if (!selectedDepartment) {
      setClasses([]);
      setSelectedClass('');
      setTests([]);
      return;
    }

    fetchClasses(selectedDepartment)
      .then(setClasses)
      .catch(err => {
        console.error('Error fetching classes:', err);
        setClasses([]);
      });
  }, [selectedDepartment]);

  // load tests when both dept & class are selected
  useEffect(() => {
    if (!selectedDepartment || !selectedClass) {
      setTests([]);
      return;
    }

    fetchTests(selectedDepartment, selectedClass)
      .then(setTests)
      .catch(err => {
        console.error('Error fetching tests:', err);
        setTests([]);
      });
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
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Number</th>
                <th>Term</th>
                <th>Year</th>
                <th>Teacher</th>
                <th>Path</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {tests.map(test => (
                <tr key={test.testid}>
                  <td>{test.testid}</td>
                  <td>{test.asses_type}</td>
                  <td>{test.test_number}</td>
                  <td>{test.term}</td>
                  <td>{test.year}</td>
                  <td>{test.teacher}</td>
                  <td>{test.path}</td>
                  <td>{test.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
