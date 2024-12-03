CREATE DATABASE IF NOT EXISTS studyCircle_db;
USE studyCircle_db;

CREATE TABLE IF NOT EXISTS departments (
    department_code VARCHAR(4) PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS classes (
    department_code VARCHAR(4),
    class_code VARCHAR(10),
    class_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (department_code, class_code),
    FOREIGN KEY (department_code) REFERENCES departments(department_code) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tests (
    department_code VARCHAR(4),
    class_code VARCHAR(10),
    test_number INT,
    test_name VARCHAR(100),
    test_semester VARCHAR(10),
    test_year INT,
    PRIMARY KEY (department_code, class_code, test_number, test_year, test_semester),
    FOREIGN KEY (department_code, class_code) REFERENCES classes(department_code, class_code) ON DELETE CASCADE
);
