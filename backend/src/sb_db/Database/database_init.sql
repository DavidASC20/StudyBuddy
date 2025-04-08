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
INSERT INTO departments(prefix) VALUES( 'ARTS ');
INSERT INTO departments(prefix) VALUES( 'COGS ');
INSERT INTO departments(prefix) VALUES( 'COMM ');
INSERT INTO departments(prefix) VALUES( 'ECON ');
INSERT INTO departments(prefix) VALUES( 'GSAS ');
INSERT INTO departments(prefix) VALUES( 'IHSS ');
INSERT INTO departments(prefix) VALUES( 'INQR ');
INSERT INTO departments(prefix) VALUES( 'LANG ');
INSERT INTO departments(prefix) VALUES( 'LITR ');
INSERT INTO departments(prefix) VALUES( 'PHIL ');
INSERT INTO departments(prefix) VALUES( 'PSYC ');
INSERT INTO departments(prefix) VALUES( 'STSO ');
INSERT INTO departments(prefix) VALUES( 'WRIT ');
-- Engineering
INSERT INTO departments(prefix) VALUES( 'BMED ');
INSERT INTO departments(prefix) VALUES( 'CHME ');
INSERT INTO departments(prefix) VALUES( 'CIVL ');
INSERT INTO departments(prefix) VALUES( 'ECSE ');
INSERT INTO departments(prefix) VALUES( 'ENGR ');
INSERT INTO departments(prefix) VALUES( 'ENVE ');
INSERT INTO departments(prefix) VALUES( 'ESCI ');
INSERT INTO departments(prefix) VALUES( 'ISYE ');
INSERT INTO departments(prefix) VALUES( 'MANE ');
INSERT INTO departments(prefix) VALUES( 'MTLE ');
-- Architecture
INSERT INTO departments(prefix) VALUES( 'ARCH ');
INSERT INTO departments(prefix) VALUES( 'LGHT ');
-- ITWS
INSERT INTO departments(prefix) VALUES( 'ITWS ');
-- Science
INSERT INTO departments(prefix) VALUES( 'ASTR ');
INSERT INTO departments(prefix) VALUES( 'BCBP ');
INSERT INTO departments(prefix) VALUES( 'BIOL ');
INSERT INTO departments(prefix) VALUES( 'CHEM ');
INSERT INTO departments(prefix) VALUES( 'CSCI ');
INSERT INTO departments(prefix) VALUES( 'ERTH ');
INSERT INTO departments(prefix) VALUES( 'ISCI ');
INSERT INTO departments(prefix) VALUES( 'MATH ');
INSERT INTO departments(prefix) VALUES( 'MATP ');
INSERT INTO departments(prefix) VALUES( 'PHYS ');
-- Management
INSERT INTO departments(prefix) VALUES( 'BUSN ');
INSERT INTO departments(prefix) VALUES( 'MGMT ');
-- Interdisciplinary and Other
INSERT INTO departments(prefix) VALUES( 'ADMN ');
INSERT INTO departments(prefix) VALUES( 'USAF ');
INSERT INTO departments(prefix) VALUES( 'ASAR ');
INSERT INTO departments(prefix) VALUES( 'USNA ');
-- Uncategorized
INSERT INTO departments(prefix) VALUES( 'ILEA ');
----------------------