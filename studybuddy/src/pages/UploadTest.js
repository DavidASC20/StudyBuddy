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
    fetch('/api/departments') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  // Fetch classes when a department is selected
  useEffect(() => {
    if (formData.department) {
      fetch(`/api/classes?department=${formData.department}`) // Replace with your API endpoint
        .then((response) => response.json())
        .then((data) => setClasses(data))
        .catch((error) => console.error('Error fetching classes:', error));
    }
  }, [formData.department]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, testFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('department', formData.department);
    formDataToSubmit.append('classCode', formData.classCode);
    formDataToSubmit.append('testNumber', formData.testNumber);
    formDataToSubmit.append('testName', formData.testName);
    formDataToSubmit.append('semester', formData.semester);
    formDataToSubmit.append('year', formData.year);
    if (formData.testFile) {
      formDataToSubmit.append('testFile', formData.testFile);
    }

    try {
      const response = await fetch('/api/upload-test', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        console.log('Test uploaded successfully');
      } else {
        console.error('Error uploading test');
      }
    } catch (error) {
      console.error('Error:', error);
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
              <option key={dept.department_code} value={dept.department_code}>
                {dept.department_name} ({dept.department_code})
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
