-- Drop tables if they exist.
-- DROP TABLE IF EXISTS tests CASCADE;
-- DROP TABLE IF EXISTS courses CASCADE;
-- DROP TABLE IF EXISTS departments CASCADE;

-- Create departments table with a prefix of exactly 4 letters.
CREATE TABLE IF NOT EXISTS departments (
    prefix CHAR(4) NOT NULL PRIMARY KEY,
    CHECK (prefix ~ '^[A-Za-z]{4}$')
);

-- Create courses table with:
--  - code: exactly 4 digits,
--  - dept_prefix: references departments.prefix.
CREATE TABLE IF NOT EXISTS courses (
    code CHAR(4) NOT NULL CHECK (code ~ '^[0-9]{4}$'),
    dept_prefix CHAR(4) NOT NULL,
    course_name TEXT,
    PRIMARY KEY (dept_prefix, code),
    FOREIGN KEY (dept_prefix) REFERENCES departments (prefix)
);

-- Create tests table with:
--  - testid: auto-incrementing id,
--  - type: up to 20 characters,
--  - dept_prefix: department
--  - course_code: code for the class
--  - teacher: teacher teaching the course
--  - test_number: an integer restricted to 0-99 (ensuring a maximum of 2 digits),
--  - term: summer, fall, spring
--  - year: year taken this exam
--  - path: a TEXT field to store file paths for PDFs,
--  - description: optional text for any additional details.
CREATE TABLE IF NOT EXISTS tests (
    testid SERIAL PRIMARY KEY,
    dept_prefix CHAR(4) NOT NULL,
    code CHAR(4) NOT NULL CHECK (code ~ '^[0-9]{4}$'),
    teacher TEXT NOT NULL,
    asses_type VARCHAR(20) NOT NULL,
    test_number INTEGER NOT NULL CHECK (test_number BETWEEN 0 AND 99),
    term CHAR(1) NOT NULL, -- F, fall; S, spring; U, summer
    year INTEGER NOT NULL,
    path TEXT NOT NULL,
    description TEXT
);

-- adding departments

-- HASS
INSERT INTO departments(prefix) VALUES( 'ARTS') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'COGS') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'COMM') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'ECON') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'GSAS') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'IHSS') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'INQR') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'LANG') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'LITR') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'PHIL') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'PSYC') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'STSO') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'WRIT') ON CONFLICT (prefix) DO NOTHING;
-- Engineering
INSERT INTO departments(prefix) VALUES( 'BMED') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'CHME') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'CIVL') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'ECSE') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'ENGR') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'ENVE') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'ESCI') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'ISYE') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'MANE') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'MTLE') ON CONFLICT (prefix) DO NOTHING;
-- Architecture
INSERT INTO departments(prefix) VALUES( 'ARCH') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'LGHT') ON CONFLICT (prefix) DO NOTHING;
-- ITWS
INSERT INTO departments(prefix) VALUES( 'ITWS') ON CONFLICT (prefix) DO NOTHING;
-- Science
INSERT INTO departments(prefix) VALUES( 'ASTR') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'BCBP') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'BIOL') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'CHEM') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'CSCI') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'ERTH') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'ISCI') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'MATH') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'MATP') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'PHYS') ON CONFLICT (prefix) DO NOTHING;
-- Management
INSERT INTO departments(prefix) VALUES( 'BUSN') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'MGMT') ON CONFLICT (prefix) DO NOTHING;
-- Interdisciplinary and Other
INSERT INTO departments(prefix) VALUES( 'ADMN') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'USAF') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'ASAR') ON CONFLICT (prefix) DO NOTHING;
INSERT INTO departments(prefix) VALUES( 'USNA') ON CONFLICT (prefix) DO NOTHING;
-- Uncategorized
INSERT INTO departments(prefix) VALUES( 'ILEA') ON CONFLICT (prefix) DO NOTHING;
----------------------

-----------------------------------------
-- CSCI
INSERT INTO courses(code, dept_prefix, course_name) VALUES('1100', 'CSCI', 'Computer Science I') ON CONFLICT (dept_prefix, code) DO NOTHING;
INSERT INTO courses(code, dept_prefix, course_name) VALUES('1200', 'CSCI', 'Data Structures') ON CONFLICT (dept_prefix, code) DO NOTHING;
INSERT INTO courses(code, dept_prefix, course_name) VALUES('1700', 'CSCI', 'Early Introduction to RCOS') ON CONFLICT (dept_prefix, code) DO NOTHING;
INSERT INTO courses(code, dept_prefix, course_name) VALUES('2300', 'CSCI', 'Introduction to Algorithms') ON CONFLICT (dept_prefix, code) DO NOTHING;
INSERT INTO courses(code, dept_prefix, course_name) VALUES('2500', 'CSCI', 'Computer Organization') ON CONFLICT (dept_prefix, code) DO NOTHING;

INSERT INTO courses(code, dept_prefix, course_name) VALUES('2210', 'CSCI', 'Mathematical Foundations of Machine Learning (MFML)') ON CONFLICT (dept_prefix, code) DO NOTHING;
INSERT INTO courses(code, dept_prefix, course_name) VALUES('4130', 'CSCI', 'AI in Fiction and Fact') ON CONFLICT (dept_prefix, code) DO NOTHING;
INSERT INTO courses(code, dept_prefix, course_name) VALUES('4140', 'CSCI', 'Machine Learning and Optimization') ON CONFLICT (dept_prefix, code) DO NOTHING;
INSERT INTO courses(code, dept_prefix, course_name) VALUES('4180', 'CSCI', 'Trustworthy Machine Learning') ON CONFLICT (dept_prefix, code) DO NOTHING;
-- INSERT INTO courses(code, dept_prefix, course_name) VALUES('', 'CSCI', '') ON CONFLICT (dept_prefix, code) DO NOTHING;
-- INSERT INTO courses(code, dept_prefix, course_name) VALUES('', 'CSCI', '') ON CONFLICT (dept_prefix, code) DO NOTHING;
-- INSERT INTO courses(code, dept_prefix, course_name) VALUES('', 'CSCI', '') ON CONFLICT (dept_prefix, code) DO NOTHING;
-- INSERT INTO courses(code, dept_prefix, course_name) VALUES('', 'CSCI', '') ON CONFLICT (dept_prefix, code) DO NOTHING;
-- INSERT INTO courses(code, dept_prefix, course_name) VALUES('', 'CSCI', '') ON CONFLICT (dept_prefix, code) DO NOTHING;

