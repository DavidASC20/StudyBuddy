CREATE DATABASE IF NOT EXISTS studyCircle_db;
USE studyCircle_db;

CREATE TABLE IF NOT EXISTS departments(
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_code VARCHAR(4) NOT NULL,
    department_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    class_code VARCHAR(10) NOT NULL,
    class_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tests (
    test_id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT,
    test_number INT,
    test_name VARCHAR(100),
    test_semester VARCHAR(10),
    test_year INT,
    FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE CASCADE,
    UNIQUE (class_id, test_number, test_year, test_semester)
);

CREATE TABLE IF NOT EXISTS questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    test_id INT,
    question_text TEXT,
    FOREIGN KEY (test_id) REFERENCES tests(test_id) ON DELETE CASCADE
);
