import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadTest.css';

function UploadTest() {
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    department: '',
    classCode: '',
    teacher: '',
    asses_type: '',
    testNumber: '',
    testName: '',
    semester: '',
    year: '',
    testFile: null,
  });

  // Fetch departments on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/departments')
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  // Fetch classes when a department is selected
  useEffect(() => {
    if (formData.department) {
      axios.get(`http://localhost:5000/api/departments/${formData.department}/classes`)
        .then((response) => setClasses(response.data))
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
    payload.append('dept_prefix', formData.department);
    payload.append('code', formData.classCode);
    payload.append('teacher', formData.teacher);
    payload.append('asses_type', formData.asses_type);
    payload.append('test_number', formData.testNumber);
    payload.append('term', formData.semester);
    payload.append('year', formData.year);
    // If uploading file, append and use its filename as path
    if (formData.testFile) {
      payload.append('testFile', formData.testFile);
      payload.append('path', formData.testFile.name);
    } else {
      payload.append('path', '');
    }
    payload.append('description', formData.testName);

    try {
      const response = await axios.post('http://localhost:5000/api/tests', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Test uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading test:', error);
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
              <option key={cls.code} value={cls.code}>
                {cls.course_name} ({cls.code})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Teacher</label>
          <input
            type="text"
            name="teacher"
            value={formData.teacher}
            onChange={handleInputChange}
            placeholder="e.g., Wes Turner"
            required
          />
        </div>

        <div className="form-group">
          <label>Assessment Type</label>
          <input
            type="text"
            name="asses_type"
            value={formData.asses_type}
            onChange={handleInputChange}
            placeholder="e.g., exam"
            required
          />
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
            required
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
