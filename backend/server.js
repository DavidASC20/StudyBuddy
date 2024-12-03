require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME 
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Endpoint to fetch all departments
app.get('/api/departments', (req, res) => {
  const sql = 'SELECT department_code, department_name FROM departments';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching departments:', err);
      return res.status(500).json({ error: 'Failed to fetch departments' });
    }
    res.status(200).json(results);
  });
});

// Endpoint to fetch all classes for a specific department
app.get('/api/classes', (req, res) => {
  const departmentCode = req.query.department; // Extract department query parameter

  if (!departmentCode) {
    return res.status(400).json({ error: 'Missing department query parameter' });
  }

  const sql = `
    SELECT class_code, class_name 
    FROM classes 
    WHERE department_code = ?
  `;

  db.query(sql, [departmentCode], (err, results) => {
    if (err) {
      console.error('Error fetching classes:', err);
      return res.status(500).json({ error: 'Failed to fetch classes' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No classes found for this department' });
    }

    res.status(200).json(results);
  });
});

app.get('/api/tests', (req, res) => {
  const departmentCode = req.query.department;
  const classCode = req.query.class;

  if (!departmentCode || !classCode) {
    return res.status(400).json({ error: 'Missing department or class query parameter' });
  }

  const sql = `
    SELECT test_number, test_name, test_semester, test_year, test_file_path
    FROM tests
    WHERE department_code = ? AND class_code = ?
  `;

  db.query(sql, [departmentCode, classCode], (err, results) => {
    if (err) {
      console.error('Error fetching tests:', err);
      return res.status(500).json({ error: 'Failed to fetch tests' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No tests found for this class' });
    }

    res.status(200).json(results);
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
