import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewTests.css';

function ViewTests() {
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const [teacherFilter, setTeacherFilter]   = useState('');
  const [assesTypeFilter, setAssesTypeFilter] = useState('');
  const [testNumberFilter, setTestNumberFilter] = useState('');

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

  const handleSearchByTeacher = () => {
    if (!selectedDepartment || !selectedClass || !teacherFilter) return;
    axios.get(`http://localhost:5000/tests/byteacher`, {
      params: {
        dept_prefix: selectedDepartment,
        code: selectedClass,
        teacher: teacherFilter
      }
    })
    .then(res => setTests(res.data))
    .catch(err => {
      console.error('Error fetching tests by teacher:', err);
      setTests([]);
    });
  };

  const handleSearchByAsses = () => {
    if (!selectedDepartment || !selectedClass || !assesTypeFilter || testNumberFilter === '') return;
    axios.get(`https://localhost:5000/tests/byasses`, {
      params: {
        dept_prefix: selectedDepartment,
        code: selectedClass,
        asses_type: assesTypeFilter,
        test_number: testNumberFilter
      }
    })
    .then(res => setTests(res.data))
    .catch(err => {
      console.error('Error fetching tests by assessment:', err);
      setTests([]);
    });
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

  useEffect(() => {
    if (selectedDepartment && selectedClass) {
      axios.get(`https://localhost:5000/tests/bycourse`, {
        params: { dept_prefix: selectedDepartment, code: selectedClass }
      })
      .then(res => setTests(res.data))
      .catch(err => {
        console.error('Error fetching tests by course:', err);
        setTests([]);
      });
    } else {
      setTests([]);
    }
  }, [selectedDepartment, selectedClass]);

  return (
    <div className="view-tests-container">

      <h1>View Tests</h1>
      {/* dropdown menu */}
      <div className="dropdown-row">
        <div>
          <label>Department</label>
          <select
            value={selectedDepartment}
            onChange={e => {
              setSelectedDepartment(e.target.value);
              setSelectedClass('');
            }}
          >
            <option value="">-- Select Dept --</option>
            {departments.map(d => (
              <option key={d.prefix} value={d.prefix}>
                {d.prefix}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Class</label>
          <select
            value={selectedClass}
            disabled={!classes.length}
            onChange={e => setSelectedClass(e.target.value)}
          >
            <option value="">-- Select Class --</option>
            {classes.map(c => (
              <option key={c.code} value={c.code}>
                {c.course_name} ({c.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* filter_dropdowns */}
      <div className="filter-row">
        {/* Teacher */}
        <div>
          <label>Teacher</label>
          <input
            type="text"
            placeholder="e.g. Wes Turner"
            value={teacherFilter}
            onChange={e => setTeacherFilter(e.target.value)}
            disabled={!selectedClass}
          />
          <button onClick={handleSearchByTeacher} disabled={!teacherFilter}>
            Search by Teacher
          </button>
        </div>

        {/* Assessment */}
        <div>
          <label>Assessment Type & Number</label>
          <input
            type="text"
            placeholder="Type (exam/quiz)"
            value={assesTypeFilter}
            onChange={e => setAssesTypeFilter(e.target.value)}
            disabled={!selectedClass}
          />
          <input
            type="number"
            placeholder="Number"
            value={testNumberFilter}
            onChange={e => setTestNumberFilter(e.target.value)}
            disabled={!selectedClass}
          />
          <button onClick={handleSearchByAsses} disabled={!assesTypeFilter || testNumberFilter === ''}>
            Search by Assessment
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="results-container">
        {tests.length ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th><th>Type</th><th>Number</th>
                <th>Term</th><th>Year</th><th>Teacher</th>
                <th>Path</th><th>Description</th>
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
          <p>
            {selectedClass
              ? 'No tests found for that filter.'
              : 'Select a department and class to view tests.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default ViewTests;
