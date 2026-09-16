-- V2__academic_schema.sql: Multi-institution Academic Curriculum Schema
CREATE TABLE IF NOT EXISTS institutions (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(64) NOT NULL,
    trust_name VARCHAR(255),
    affiliation VARCHAR(255),
    vision TEXT,
    mission TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS programs (
    id VARCHAR(64) PRIMARY KEY,
    institution_id VARCHAR(64) REFERENCES institutions(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    degree VARCHAR(64) NOT NULL,
    department VARCHAR(255) NOT NULL,
    board_of_studies VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS academic_years (
    id VARCHAR(64) PRIMARY KEY,
    program_id VARCHAR(64) REFERENCES programs(id) ON DELETE CASCADE,
    code VARCHAR(64) NOT NULL,
    name VARCHAR(128) NOT NULL,
    effective_from VARCHAR(32),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS academic_modules (
    id VARCHAR(64) PRIMARY KEY,
    academic_year_id VARCHAR(64) REFERENCES academic_years(id) ON DELETE CASCADE,
    year_level VARCHAR(64) NOT NULL,
    module_code VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    total_credits INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(64) PRIMARY KEY,
    academic_module_id VARCHAR(64) REFERENCES academic_modules(id) ON DELETE SET NULL,
    canonical_code VARCHAR(64) NOT NULL,
    course_structure_code VARCHAR(64),
    syllabus_template_code VARCHAR(64),
    title VARCHAR(255) NOT NULL,
    alt_title VARCHAR(255),
    credits INTEGER NOT NULL DEFAULT 4,
    theory_hours_per_week INTEGER NOT NULL DEFAULT 3,
    lab_hours_per_week INTEGER NOT NULL DEFAULT 2,
    tutorial_hours_per_week INTEGER NOT NULL DEFAULT 0,
    category VARCHAR(128) NOT NULL,
    nep_classification VARCHAR(64),
    prerequisites TEXT,
    objectives TEXT,
    relevance TEXT,
    future_course_mapping TEXT,
    job_mapping TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'PUBLISHED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS units (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    unit_number VARCHAR(32) NOT NULL,
    title VARCHAR(255) NOT NULL,
    teaching_hours INTEGER NOT NULL DEFAULT 6,
    section_name VARCHAR(64),
    order_index INTEGER NOT NULL DEFAULT 1,
    case_studies TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS topics (
    id VARCHAR(64) PRIMARY KEY,
    unit_id VARCHAR(64) REFERENCES units(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 1,
    estimated_minutes INTEGER NOT NULL DEFAULT 45,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS practicals (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    practical_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_areas (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    description TEXT,
    domain VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS course_outcomes (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    code VARCHAR(32) NOT NULL,
    description TEXT NOT NULL,
    blooms_level VARCHAR(32),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assessment_items (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    head VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    max_marks INTEGER NOT NULL DEFAULT 100,
    converted_marks INTEGER,
    weightage_percent INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learning_resources (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    type VARCHAR(32) NOT NULL, -- TEXTBOOK, REFERENCE_BOOK, MOOC, VIDEO, DOCUMENT, LINK
    authors VARCHAR(255),
    title TEXT NOT NULL,
    edition VARCHAR(64),
    publisher VARCHAR(255),
    publication_year VARCHAR(32),
    isbn VARCHAR(64),
    url VARCHAR(512),
    platform VARCHAR(64),
    status VARCHAR(32) NOT NULL DEFAULT 'AVAILABLE', -- AVAILABLE, IN_DEVELOPMENT, COMING_SOON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
