DROP TABLE IF EXISTS tests;

CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    course_id VARCHAR(10) NOT NULL,
    assess_type VARCHAR(50) NOT NULL,
    assess_number INTEGER NOT NULL,
    path TEXT NOT NULL,  -- Kept TEXT for variable-length file paths
    description TEXT
);

INSERT INTO tests (course_id, assess_type, assess_number, path, description)
VALUES ('CSCI-1100', 'test', 1, './tests/quiz1.pdf', 'First quiz of the semester');