// src/pages/ViewTests.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewTests.css';

const DEPT_API = 'http://localhost:5000/api/departments';
const TESTS_API = 'http://localhost:5000/tests/search';

export default function ViewTests() {
  // dropdown data
  const [departments, setDepartments] = useState([]);
  const [classes,     setClasses]     = useState([]);

  // selected
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedCode, setSelectedCode] = useState('');

  // optional filters
  const [teacher,    setTeacher]    = useState('');
  const [assesType,  setAssesType]  = useState('');
  const [testNumber, setTestNumber] = useState('');
  const [term,       setTerm]       = useState('');
  const [year,       setYear]       = useState('');

  // results
  const [tests, setTests] = useState([]);

  // Load departments on mount
  useEffect(() => {
    axios.get(DEPT_API)
      .then(res => setDepartments(res.data))
      .catch(console.error);
  }, []);

  // Load classes when dept changes
  useEffect(() => {
    if (!selectedDept) {
      setClasses([]); setSelectedCode('');
      return;
    }
    axios.get(`${DEPT_API}/${selectedDept}/classes`)
      .then(res => setClasses(res.data))
      .catch(console.error);
  }, [selectedDept]);

  // Unified search handler
  const handleSearch = () => {
    if (!selectedDept || !selectedCode) {
      alert("Please select both Department and Course.");
      return;
    }
    // Build params object
    const params = {
      dept_prefix: selectedDept,
      code:        selectedCode,
      // only include non-empty filters
      ...(teacher     && { teacher }),
      /*
      ...(assesType   && { asses_type: assesType }),
      ...(testNumber  && { test_number: testNumber }),
      ...(term        && { term }),
      ...(year        && { year }),
      */
    };

    console.log("Searching tests with:", params);
    axios.get(TESTS_API, { params })
      .then(res => setTests(res.data))
      .catch(err => {
        console.error("Search error:", err);
        setTests([]);
      });
  };

  return (
    <div className="view-tests-container">
      <h1>Search Tests</h1>

      <div className="filter-row">
        <div>
          <label>Department</label>
          <select
            value={selectedDept}
            onChange={e => {
              setSelectedDept(e.target.value);
              setSelectedCode('');
            }}
          >
            <option value="">-- Select Dept --</option>
            {departments.map(d => (
              <option key={d.prefix} value={d.prefix}>{d.prefix}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Course</label>
          <select
            value={selectedCode}
            disabled={!classes.length}
            onChange={e => setSelectedCode(e.target.value)}
          >
            <option value="">-- Select Course --</option>
            {classes.map(c => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Teacher (optional)</label>
          <input
            type="text"
            placeholder="e.g. Wes Turner"
            value={teacher}
            onChange={e => setTeacher(e.target.value)}
          />
        </div>

        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>

      <div className="results-container">
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
              {tests.map(t => (
                <tr key={t.testid}>
                  <td>{t.testid}</td>
                  <td>{t.asses_type}</td>
                  <td>{t.test_number}</td>
                  <td>{t.term}</td>
                  <td>{t.year}</td>
                  <td>{t.teacher}</td>
                  <td>{t.path}</td>
                  <td>{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tests match your filters.</p>
        )}
      </div>
    </div>
  );
}
