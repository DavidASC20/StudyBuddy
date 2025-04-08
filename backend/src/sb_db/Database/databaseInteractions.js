const pool = require("./databaseConnection");

// async functions for db tasks

// Insert Test
const addTest = async (courseId, assessType, assessNumber, path, description) => {
  const query = `INSERT INTO tests (course_id, assess_type, assess_number, path, description)
                 VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  try {
    const result = await pool.query(query, [courseId, assessType, assessNumber, path, description]);
    console.log("Test added");
    return result.rows[0];
  } catch (err) {
    console.error("Error adding test:", err);
  }
};

// Delete Test
const deleteTest = async (id) => {
  const query = "DELETE FROM tests WHERE id = $1";
  try {
    await pool.query(query, [id]);
    console.log("Test deleted.");
  } catch (err) {
    console.error("Error deleting test:", err);
  }
};

// Updating entry description
const updateTest = async (id, newDescription) => {
  const query = "UPDATE tests SET description = $1 WHERE id = $2 RETURNING *";
  try {
    const result = await pool.query(query, [newDescription, id]);
    console.log("Test updated.");
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

module.exports = { addTest, deleteTest, updateTest, getAllTests };