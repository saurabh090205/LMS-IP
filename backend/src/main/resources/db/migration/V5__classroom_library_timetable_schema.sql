-- V5__classroom_library_timetable_schema.sql: Virtual Classroom, Recorded Lectures, Library & Timetable
CREATE TABLE IF NOT EXISTS timetable_slots (
    id VARCHAR(64) PRIMARY KEY,
    academic_module_id VARCHAR(64) REFERENCES academic_modules(id) ON DELETE CASCADE,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    day_of_week VARCHAR(16) NOT NULL, -- MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
    start_time VARCHAR(16) NOT NULL,
    end_time VARCHAR(16) NOT NULL,
    room_or_location VARCHAR(128) NOT NULL,
    instructor_name VARCHAR(128) NOT NULL,
    session_type VARCHAR(32) NOT NULL DEFAULT 'THEORY', -- THEORY, LAB, TUTORIAL
    is_live_auditorium BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS live_classes (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    unit_id VARCHAR(64) REFERENCES units(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    instructor_name VARCHAR(128) NOT NULL,
    scheduled_start VARCHAR(64) NOT NULL,
    scheduled_end VARCHAR(64) NOT NULL,
    meeting_url VARCHAR(512) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'SCHEDULED', -- SCHEDULED, LIVE, COMPLETED, CANCELLED
    room_code VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recorded_lectures (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    unit_id VARCHAR(64) REFERENCES units(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url VARCHAR(512),
    duration_minutes INTEGER NOT NULL DEFAULT 45,
    recorded_date VARCHAR(32) NOT NULL,
    transcript_summary TEXT,
    notes_markdown TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS library_items (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL, -- BOOK, VIDEO, JOURNAL, REFERENCE
    subject_tag VARCHAR(128) NOT NULL,
    description TEXT,
    isbn_or_doi VARCHAR(64),
    publication_year VARCHAR(16),
    publisher VARCHAR(128),
    download_url VARCHAR(512),
    external_link VARCHAR(512),
    is_open_access BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
