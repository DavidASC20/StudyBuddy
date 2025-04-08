const express = require("express");
const cors = require("cors");
const { addTest, deleteTest, updateTest, getAllTests } = require("./databaseInteractions");

const app = express();
app.use(express.json());
app.use(cors());


// POST /tests - Create a new test
// Expects: {dept_prefix, code, teacher, asses_type, test_number, path, description }
app.post("/tests", async (req, res) => {
  try {
    const {dept_prefix, code, teacher, asses_type, test_number, term, year, path, description } = req.body;
    const test = await addTest(dept_prefix, code, teacher, asses_type, test_number, term, year, path, description);
    res.json(test);
  } catch (error) {
    console.error("Error inserting test:", error);
    res.status(500).json({ error: "Error inserting test" });
  }
});

// GET /tests - Retrieve all tests
app.get("/tests", async (req, res) => {
  try {
    const tests = await getAllTests();
    res.json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ error: "Error fetching tests" });
  }
});

// PUT /tests/:id - Update test description
app.put("/tests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTest = await updateTest(id, description);
    res.json(updatedTest);
  } catch (error) {
    console.error("Error updating test:", error);
    res.status(500).json({ error: "Error updating test" });
  }
});

// DELETE /tests/:id - Delete a test
app.delete("/tests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const success = await deleteTest(id);
    if (success) {
      res.json({ message: `Test with ID ${id} deleted.` });
    } else {
      res.status(404).json({ error: `Test with ID ${id} not found.` });
    }
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ error: "Error deleting test" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
