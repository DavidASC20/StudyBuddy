const fs = require('fs');
const path = require('path');

// Read the courses.json file
const filePath = path.join(__dirname, 'courses.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const departments = JSON.parse(rawData);

// Function to escape single quotes in SQL strings
function escapeSQL(str) {
  return str.replace(/'/g, "''");
}

departments.forEach(department => {
  // Use department.code as the dept_prefix for your courses
  const deptPrefix = department.code;
  department.courses.forEach(course => {
    // Convert the course number to a 4-character string
    let courseCode = String(course.crse);
    courseCode = courseCode.padStart(4, '0');
    
    // Use course.title as course_name
    const courseName = course.title;
    
    // Build the SQL statement
    const sql = `INSERT INTO courses(code, dept_prefix, course_name) VALUES('${courseCode}', '${deptPrefix}', '${escapeSQL(courseName)}') ON CONFLICT (dept_prefix, code) DO NOTHING;`;
    
    // Output the SQL (you could also execute this query directly using the 'pg' library)
    console.log(sql);
  });
});
