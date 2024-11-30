import React, { useState } from 'react';
import './UploadTest.css';

function UploadTest() {
  const [formData, setFormData] = useState({
    department: '',
    classCode: '',
    className: '',
    testNumber: '',
    testName: '',
    semester: '',
    year: '',
    questions: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Replace this console.log with API call to upload the test data
  };

  return (
    <div className="upload-test-container">
      <h1>Upload Test</h1>
      <form onSubmit={handleSubmit} className="upload-test-form">
        <div className="form-group">
          <label>Department Code</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="e.g., CS"
            required
          />
        </div>

        <div className="form-group">
          <label>Class Code</label>
          <input
            type="text"
            name="classCode"
            value={formData.classCode}
            onChange={handleInputChange}
            placeholder="e.g., CS101"
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
          <label>Semester</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            placeholder="e.g., Fall"
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
