-- Drop tables if they exist.
DROP TABLE IF EXISTS tests CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS departments CASCADE;

-- Create departments table with a prefix of exactly 4 letters.
CREATE TABLE departments (
    prefix CHAR(4) NOT NULL PRIMARY KEY,
    CHECK (prefix ~ '^[A-Za-z]{4}$')
);

-- Create courses table with:
--  - code: exactly 4 digits,
--  - dept_prefix: references departments.prefix.
CREATE TABLE courses (
    code CHAR(4) NOT NULL CHECK (code ~ '^[0-9]{4}$'),
    dept_prefix CHAR(4) NOT NULL,
    PRIMARY KEY (dept_prefix, code),
    FOREIGN KEY (dept_prefix) REFERENCES departments (prefix)
);

-- Create tests table with:
--  - testid: auto-incrementing id,
--  - type: up to 20 characters,
--  - test_number: an integer restricted to 0-99 (ensuring a maximum of 2 digits),
--  - path: a TEXT field to store file paths for PDFs,
--  - description: optional text for any additional details.
CREATE TABLE tests (
    testid SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    test_number INTEGER NOT NULL CHECK (test_number BETWEEN 0 AND 99),
    path TEXT NOT NULL,
    description TEXT
);
