import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    console.log("changing test sent")
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    console.log("sending file to backend now")
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" onChange={handleFileChange} />
      <input type="text">Class</input>
      <input type="text">Test</input>
      <input type="text"></input>
      <input type="text">Class</input>
      <input type="text">Class</input>
      <input type="text">Class</input>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadPage;
