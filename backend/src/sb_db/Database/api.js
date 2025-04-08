const express = require("express");
const cors = require("cors");
const { addTest, deleteTest, updateTest, getAllTests } = require("./databaseInteractions");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/tests", async (req, res) => {
  try {
    const { course_id, assess_type, assess_number, path, description } = req.body;
    const test = await addTest(course_id, assess_type, assess_number, path, description);
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: "Error inserting test" });
  }
});

app.get("/tests", async (req, res) => {
  try {
    const tests = await getAllTests();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tests" });
  }
});

app.put("/tests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTest = await updateTest(id, description);
    res.json(updatedTest);
  } catch (error) {
    res.status(500).json({ error: "Error updating test" });
  }
});

app.delete("/tests/:id", async (req, res) => {
  try {
    const success = await deleteTest(req.params.id);
    if (success) res.json({ message: 'Test with ID ${req.params.id} deleted.' });
    else res.status(500).json({ error: "Failed to delete test" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting test" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on http://localhost:${PORT}');
});
