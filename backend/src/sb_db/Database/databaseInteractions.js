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

const searchTests = async (filters) => {
  // Base WHERE and parameters
  const clauses = ["dept_prefix = $1", "code = $2"];
  const values = [filters.dept_prefix, filters.code];
  
  let idx = 3;
  // Add optional filters
  if (filters.teacher) {
    clauses.push(`teacher = $${idx++}`);
    values.push(filters.teacher);
  }
  if (filters.asses_type) {
    clauses.push(`asses_type = $${idx++}`);
    values.push(filters.asses_type);
  }
  if (filters.test_number) {
    clauses.push(`test_number = $${idx++}`);
    values.push(filters.test_number);
  }
  if (filters.term) {
    clauses.push(`term = $${idx++}`);
    values.push(filters.term);
  }
  if (filters.year) {
    clauses.push(`year = $${idx++}`);
    values.push(filters.year);
  }

  const query = `
    SELECT * FROM tests
    WHERE ${clauses.join(" AND ")}
    ORDER BY year DESC, term, asses_type, test_number
  `;

  const result = await pool.query(query, values);
  console.log("searchTests, SQL:", query, "values:", values);
  return result.rows;
};

module.exports = { addTest, deleteTest, updateTest, getAllTests, getAllDepartments, getClassesByDepartment, searchTests};