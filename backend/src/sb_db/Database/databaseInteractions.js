const pool = require("./databaseConnection");

// async functions for db tasks

// Insert Test
const addTest = async (dept_prefix, code, teacher, asses_type, test_number, term, year, path, description) => {
  const query = `INSERT INTO tests (dept_prefix, code, teacher, asses_type, test_number, term, year, path, description)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
  try {
    const result = await pool.query(query, [dept_prefix, code, teacher, asses_type, test_number, term, year, path, description]);
    console.log("Test added");
    return result.rows[0];
  } catch (err) {
    console.error("Error adding test:", err);
  }
};

// Delete Test
const deleteTest = async (testid) => {
  const query = "DELETE FROM tests WHERE testid = $1";
  try {
    const result = await pool.query(query, [testid]);
    console.log("Test deleted.");
    return result.rowCount > 0;
  } catch (err) {
    console.error("Error deleting test:", err);
  }
};

// Updating entry description
const updateTest = async (testid, newDescription) => {
  const query = "UPDATE tests SET description = $1 WHERE testid = $2 RETURNING *";
  try {
    const result = await pool.query(query, [newDescription, testid]);
    console.log("Test updated.");
    return result.rows[0];
  } catch (err) {
    console.error("Error updating test:", err);
  }
};

// return all current records
const getAllTests = async () => {
  const query = "SELECT * FROM tests";
  try {
    const result = await pool.query(query);
    console.log("Fetched tests:", result.rows);
    return result.rows;
  } catch (err) {
    console.error("Error fetching tests:", err);
  }
};

const getAllDepartments = async () => {
  const query = "SELECT * FROM departments;";
  try {
    const result = await pool.query(query);
    console.log("Fetched all departments:", result.rows);
    return result.rows;
  } catch (err){
    console.error("Error fetching departments:", err);
  }
};

const getClassesByDepartment = async (dept) => {
  const query = `
    SELECT code, dept_prefix, course_name
    FROM courses
    WHERE dept_prefix = $1;
  `;
  try {
    const result = await pool.query(query, [dept]);
    console.log(`Fetched classes for department ${dept}:`, result.rows);
    return result.rows;
  } catch (err) {
    console.error(`Error fetching classes for department ${dept}:`, err);
    throw err;
  }
};

// Get exams, given department prefix, course code.
const getExamsByCourse = async (dept_prefix, code) => {
  const query = "SELECT * FROM tests WHERE dept_prefix = $1 AND code = $2";
  try {
    const result = await pool.query(query, [dept_prefix, code]);
    console.log("Fetched exams for course:", result.rows);
    return result.rows;
  } catch (err) {
    console.error("Error fetching exams by course:", err);
    throw err;
  }
};

// Get exams given dept_prefix, course code, asses_type, test_number
const getExamsByAssesTypeAndNumber = async (dept_prefix, code, asses_type, test_number) => {
  const query = "SELECT * FROM tests WHERE dept_prefix = $1 AND code = $2 AND asses_type = $3 AND test_number = $4";
  try {
    const result = await pool.query(query, [dept_prefix, code, asses_type, test_number]);
    console.log("Fetched exams by asses type and number:", result.rows);
    return result.rows;
  } catch (err) {
    console.error("Error fetching exams by asses type and number:", err);
    throw err;
  }
};

// Get exams given dept_prefix, course code, and teacher.
const getExamsByTeacher = async (dept_prefix, code, teacher) => {
  const query = "SELECT * FROM tests WHERE dept_prefix = $1 AND code = $2 AND teacher = $3";
  try {
    const result = await pool.query(query, [dept_prefix, code, teacher]);
    console.log("Fetched exams by teacher:", result.rows);
    return result.rows;
  } catch (err) {
    console.error("Error fetching exams by teacher:", err);
    throw err;
  }
};

module.exports = { addTest, deleteTest, updateTest, getAllTests, getAllDepartments, getClassesByDepartment, getExamsByCourse, getExamsByAssesTypeAndNumber, getExamsByTeacher};