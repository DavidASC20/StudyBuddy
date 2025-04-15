const axios = require("axios");

const baseURL = "http://localhost:5000/api/tests";

async function testAPI() {
  try {
    // Create test instances
    console.log("Creating a new test 1 ...");
    let response1 = await axios.post(baseURL, {
      dept_prefix: "CSCI",
      code: "1100",
      teacher: "Wes Turner",
      asses_type: "exam",
      test_number: 1,
      term: "F",
      year: 2020,
      path: "./exams/exam1_F20.pdf",
      description: "First exam of the term, Fall 2020"
    });
    const newTest1 = response1.data;
    console.log("Created test 1:", JSON.stringify(newTest1, null, 2));

    console.log("Creating a new test 2 ...");
    let response2 = await axios.post(baseURL, {
      dept_prefix: "CSCI",
      code: "1100",
      teacher: "Jianxi Gao",
      asses_type: "exam",
      test_number: 1,
      term: "F",
      year: 2023,
      path: "./exams/exam1_F23.pdf",
      description: "First exam of the term, Fall 2023"
    });
    const newTest2 = response2.data;
    console.log("Created test 2:", JSON.stringify(newTest2, null, 2));

    // Save the testid for further operations (from test 1)
    const testId = newTest1.testid;
    console.log("Test id retrieved from test 1:", testId);

    // Get all tests
    console.log("\nFetching all tests...");
    let responseGet = await axios.get(baseURL);
    console.log("All tests:", JSON.stringify(responseGet.data, null, 2));

    // Update test description for test 1
    console.log("\nUpdating test description for test id", testId, "...");
    let responsePut = await axios.put(`${baseURL}/${testId}`, {
      description: "Updated description for test."
    });
    console.log("Updated test:", JSON.stringify(responsePut.data, null, 2));

    // Delete test 1
    console.log("\nDeleting test id", testId, "...");
    let responseDelete = await axios.delete(`${baseURL}/${testId}`);
    console.log("Deletion response:", JSON.stringify(responseDelete.data, null, 2));
    
  } catch (error) {
    if (error.response) {
      console.error("Error response:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Error:", error.message);
    }
  }
}

testAPI();
