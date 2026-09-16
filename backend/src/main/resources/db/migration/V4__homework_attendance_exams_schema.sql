-- V4__homework_attendance_exams_schema.sql: Homework, Attendance, Exams, and Gradebook
CREATE TABLE IF NOT EXISTS assignments (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    unit_id VARCHAR(64) REFERENCES units(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    due_date VARCHAR(64) NOT NULL,
    total_marks INTEGER NOT NULL DEFAULT 100,
    weightage_percent INTEGER NOT NULL DEFAULT 10,
    status VARCHAR(32) NOT NULL DEFAULT 'PUBLISHED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS submissions (
    id VARCHAR(64) PRIMARY KEY,
    assignment_id VARCHAR(64) REFERENCES assignments(id) ON DELETE CASCADE,
    student_profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(32) NOT NULL DEFAULT 'SUBMITTED', -- PENDING, SUBMITTED, GRADED, RESUBMITTED
    text_response TEXT,
    attachment_name VARCHAR(255),
    attachment_url VARCHAR(512),
    marks_awarded INTEGER,
    max_marks INTEGER NOT NULL DEFAULT 100,
    feedback TEXT,
    graded_at TIMESTAMP WITH TIME ZONE,
    graded_by VARCHAR(128),
    UNIQUE(assignment_id, student_profile_id)
);

CREATE TABLE IF NOT EXISTS attendance_records (
    id VARCHAR(64) PRIMARY KEY,
    student_profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    session_type VARCHAR(32) NOT NULL DEFAULT 'THEORY', -- THEORY, LAB, TUTORIAL
    status VARCHAR(32) NOT NULL DEFAULT 'PRESENT', -- PRESENT, ABSENT, LATE, EXCUSED
    remarks VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exams (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    exam_type VARCHAR(32) NOT NULL, -- CA, MSA, ESE, VIVA, LAB
    exam_date VARCHAR(64) NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    max_marks INTEGER NOT NULL DEFAULT 100,
    weightage_percent INTEGER NOT NULL DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_grade_records (
    id VARCHAR(64) PRIMARY KEY,
    student_profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    academic_term VARCHAR(64) NOT NULL,
    current_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    letter_grade VARCHAR(8) NOT NULL DEFAULT 'A',
    credits INTEGER NOT NULL DEFAULT 4,
    teacher_comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_profile_id, course_id, academic_term)
);
