const express = require("express");
const cors = require("cors");
const { addTest, deleteTest, updateTest, getAllTests, getAllDepartments, getClassesByDepartment, getExamsByCourse, getExamsByAssesTypeAndNumber, getExamsByTeacher, searchTests} = require("./databaseInteractions");

const app = express();
app.use(express.json());
app.use(cors());


// POST /tests - Create a new test
// Expects: {dept_prefix, code, teacher, asses_type, test_number, path, description }
app.post("/api/tests", async (req, res) => {
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
app.get("/api/tests", async (req, res) => {
  try {
    const tests = await getAllTests();
    res.json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ error: "Error fetching tests" });
  }
});

// PUT /tests/:id - Update test description
app.put("/api/tests/:id", async (req, res) => {
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
app.delete("/api/tests/:id", async (req, res) => {
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

app.get('/api/departments', async (req, res) => {
  try {
    const tests = await getAllDepartments();
    res.json(tests);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Error fetching departmnets" });
  }
});

app.get('/api/departments/:dept/classes', async (req, res) => {
  const { dept } = req.params;
  try {
    const classes = await getClassesByDepartment(dept);
    res.json(classes);
  } catch (error) {
    console.error(`Error fetching classes for department ${dept}:`, error);
    res.status(500).json({ error: "Error fetching classes" });
  }
});

app.get('/tests/bycourse', async(req, res) => {
  try {
    const { dept_prefix, code } = req.query;
    const tests = await getExamsByCourse(dept_prefix, code);
    res.json(tests);
  } catch (error) {
    console.error("Error fetching tests by course:", error);
    res.status(500).json({ error: "Error fetching tests by course" });
  }
});

app.get("/tests/byasses", async (req, res) => {
  try {
    const { dept_prefix, code, asses_type, test_number } = req.query;
    const tests = await getExamsByAssesTypeAndNumber(dept_prefix, code, asses_type, test_number);
    res.json(tests);
  } catch (error) {
    console.error("Error fetching tests by asses type and number:", error);
    res.status(500).json({ error: "Error fetching tests by asses type and number" });
  }
});

app.get("/tests/byteacher", async (req, res) => {
  try {
    const { dept_prefix, code, teacher } = req.query;
    const tests = await getExamsByTeacher(dept_prefix, code, teacher);
    res.json(tests);
  } catch (error) {
    console.error("Error fetching tests by teacher:", error);
    res.status(500).json({ error: "Error fetching tests by teacher" });
  }
});

app.get("/tests/search", async (req, res) => {
  try {
    const filters = req.query;
    if (!filters.dept_prefix || !filters.code) {
      return res.status(400).json({ error: "dept_prefix and code are required" });
    }
    const tests = await searchTests(filters);
    res.json(tests);
  } catch (error) {
    console.error("Error in /tests/search:", error);
    res.status(500).json({ error: "Error searching tests" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
