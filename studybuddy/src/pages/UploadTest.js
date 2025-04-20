import React, { useState, useEffect } from 'react';
import './UploadTest.css';

function UploadTest() {
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    department: '',
    classCode: '',
    testNumber: '',
    testName: '',
    semester: '',
    year: '',
    testFile: null, 
  });

  // Fetch departments on component mount
  useEffect(() => {
    fetch('/api/departments')
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  // Fetch classes when a department is selected (placeholder remains)
  useEffect(() => {
    if (formData.department) {
      fetch(`/api/classes?department=${formData.department}`)
        .then((response) => response.json())
        .then((data) => setClasses(data))
        .catch((error) => console.error('Error fetching classes:', error));
    } else {
      setClasses([]);
      setFormData((prev) => ({ ...prev, classCode: '' }));
    }
  }, [formData.department]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, testFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('department', formData.department);
    payload.append('classCode', formData.classCode);
    payload.append('testNumber', formData.testNumber);
    payload.append('testName', formData.testName);
    payload.append('semester', formData.semester);
    payload.append('year', formData.year);
    if (formData.testFile) {
      payload.append('testFile', formData.testFile);
    }

    try {
      const res = await fetch('/api/upload-test', {
        method: 'POST',
        body: payload,
      });
      if (res.ok) {
        console.log('Test uploaded successfully');
      } else {
        console.error('Error uploading test');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="upload-test-container">
      <h1>Upload Test</h1>
      <form onSubmit={handleSubmit} className="upload-test-form">
        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a Department</option>
            {departments.map((dept) => (
              <option key={dept.prefix} value={dept.prefix}>
                {dept.prefix}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Class Code</label>
          <select
            name="classCode"
            value={formData.classCode}
            onChange={handleInputChange}
            required
            disabled={!formData.department}
          >
            <option value="">Select a Class</option>
            {classes.map((cls) => (
              <option key={cls.class_code} value={cls.class_code}>
                {cls.class_code} - {cls.class_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Test Number</label>
          <input
            type="number"
            name="testNumber"
            value={formData.testNumber}
            onChange={handleInputChange}
            placeholder="e.g., 1"
            required
          />
        </div>

        <div className="form-group">
          <label>Test Name</label>
          <input
            type="text"
            name="testName"
            value={formData.testName}
            onChange={handleInputChange}
            placeholder="e.g., Midterm"
          />
        </div>

        <div className="form-group">
          <label>Semester</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            placeholder="e.g., Fall"
          />
        </div>

        <div className="form-group">
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            placeholder="e.g., 2024"
            required
          />
        </div>

        <div className="form-group">
          <label>Test File</label>
          <input
            type="file"
            name="testFile"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UploadTest;
