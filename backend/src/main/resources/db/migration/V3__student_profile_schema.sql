-- V3__student_profile_schema.sql: Student Profile, Digital Twin Lite, and Enrollments
CREATE TABLE IF NOT EXISTS student_profiles (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    student_id_number VARCHAR(64) UNIQUE NOT NULL,
    program_id VARCHAR(64) REFERENCES programs(id),
    academic_year_id VARCHAR(64) REFERENCES academic_years(id),
    current_module_id VARCHAR(64) REFERENCES academic_modules(id),
    grade_level VARCHAR(64) NOT NULL,
    section VARCHAR(32),
    cgpa NUMERIC(4, 2) DEFAULT 0.00,
    attendance_rate NUMERIC(5, 2) DEFAULT 0.00,
    study_streak_days INTEGER NOT NULL DEFAULT 0,
    weekly_target_hours NUMERIC(4, 1) DEFAULT 20.0,
    weekly_completed_hours NUMERIC(4, 1) DEFAULT 0.0,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_skills (
    id VARCHAR(64) PRIMARY KEY,
    student_profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    skill_name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL,
    proficiency_level INTEGER NOT NULL DEFAULT 50, -- 0 to 100
    verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_interests (
    id VARCHAR(64) PRIMARY KEY,
    student_profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    interest_name VARCHAR(128) NOT NULL,
    domain VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS achievements (
    id VARCHAR(64) PRIMARY KEY,
    student_profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    badge_type VARCHAR(64) NOT NULL,
    awarded_date VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollments (
    id VARCHAR(64) PRIMARY KEY,
    student_profile_id VARCHAR(64) REFERENCES student_profiles(id) ON DELETE CASCADE,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, COMPLETED, DROPPED
    progress_percentage INTEGER NOT NULL DEFAULT 0,
    grade_letter VARCHAR(8),
    UNIQUE (student_profile_id, course_id)
);
