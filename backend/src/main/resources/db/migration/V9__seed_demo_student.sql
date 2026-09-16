-- V9__seed_demo_student.sql: Seed Demo Student Persona (Aarav Sharma), Enrollments, Timetable, Homework, Attendance, Gradebook
INSERT INTO users (id, tenant_id, keycloak_id, email, first_name, last_name, phone_number, status)
VALUES 
('usr-student-aarav', 'tenant-default', 'kc-student-aarav', 'aarav.sharma@shreenil.edu', 'Aarav', 'Sharma', '+91 98765 43210', 'ACTIVE'),
('usr-faculty-elena', 'tenant-default', 'kc-faculty-elena', 'elena.rostova@vit.edu', 'Dr. Elena', 'Rostova', '+91 98765 12345', 'ACTIVE');

INSERT INTO user_roles (user_id, role_id) VALUES
('usr-student-aarav', 'role-student'),
('usr-faculty-elena', 'role-teacher');

INSERT INTO student_profiles (id, user_id, student_id_number, program_id, academic_year_id, current_module_id, grade_level, section, cgpa, attendance_rate, study_streak_days, weekly_target_hours, weekly_completed_hours, bio)
VALUES (
    'profile-aarav',
    'usr-student-aarav',
    'VIT-2026-AI88',
    'program-btech-cse-ai',
    'ay-2026-27',
    'module-v',
    'T.Y. B.Tech (Module V)',
    'Division AI-1',
    9.42,
    96.8,
    9,
    20.0,
    18.4,
    'Pursuing B.Tech in CSE (Artificial Intelligence) at VIT Pune. Research interests in Deep Learning, MLOps pipelines, and Federated Optimization.'
);

-- Skills
INSERT INTO student_skills (id, student_profile_id, skill_name, category, proficiency_level, verified) VALUES
('sk-1', 'profile-aarav', 'Deep Learning & Neural Networks', 'AI Core', 88, true),
('sk-2', 'profile-aarav', 'Computer Vision (CNN/ViT)', 'AI Core', 82, true),
('sk-3', 'profile-aarav', 'MLOps & CI/CD Pipelines', 'DevOps & Systems', 75, true),
('sk-4', 'profile-aarav', 'Python & NumPy & PyTorch', 'Programming', 95, true),
('sk-5', 'profile-aarav', 'Linux Kernel & Shell Programming', 'Systems', 80, true);

-- Interests
INSERT INTO student_interests (id, student_profile_id, interest_name, domain) VALUES
('int-1', 'profile-aarav', 'Quantum Neural Networks', 'Research'),
('int-2', 'profile-aarav', 'Edge AI & Autonomous Robotics', 'Applied Engineering'),
('int-3', 'profile-aarav', 'Generative Diffusion Models', 'Generative AI');

-- Achievements
INSERT INTO achievements (id, student_profile_id, title, description, badge_type, awarded_date) VALUES
('ach-1', 'profile-aarav', 'Dean''s Honor Roll 2026', 'Maintained CGPA > 9.2 in Academic Year 2025-26', 'ACADEMIC_EXCELLENCE', '2026-08-15'),
('ach-2', 'profile-aarav', 'Certified Research Scholar', 'Published research on automated skin lesion classification', 'RESEARCH', '2026-07-20'),
('ach-3', 'profile-aarav', 'Continuous 7-Day Study Cadence', 'Consistently logged > 3.0 study hours daily', 'STREAK', '2026-09-08');

-- Enrollments in Module V Courses
INSERT INTO enrollments (id, student_profile_id, course_id, status, progress_percentage, grade_letter) VALUES
('enr-1', 'profile-aarav', 'course-deep-learning', 'ACTIVE', 68, 'A+'),
('enr-2', 'profile-aarav', 'course-operating-system', 'ACTIVE', 54, 'A'),
('enr-3', 'profile-aarav', 'course-mlops', 'ACTIVE', 42, 'A-'),
('enr-4', 'profile-aarav', 'course-distributed-federated-learning', 'ACTIVE', 30, 'A'),
('enr-5', 'profile-aarav', 'course-ethical-responsible-ai', 'ACTIVE', 60, 'A'),
('enr-6', 'profile-aarav', 'course-information-security', 'ACTIVE', 35, 'B+');

-- Timetable Slots (Module V Schedule)
INSERT INTO timetable_slots (id, academic_module_id, course_id, day_of_week, start_time, end_time, room_or_location, instructor_name, session_type, is_live_auditorium) VALUES
('tt-1', 'module-v', 'course-deep-learning', 'MONDAY', '09:00', '10:30', 'Auditorium Hall A', 'Dr. Elena Rostova', 'THEORY', true),
('tt-2', 'module-v', 'course-operating-system', 'MONDAY', '11:00', '12:30', 'Room 204 (VIT)', 'Prof. Marcus Vance', 'THEORY', false),
('tt-3', 'module-v', 'course-deep-learning', 'TUESDAY', '10:00', '12:00', 'AI Hardware Lab 3', 'Dr. Elena Rostova', 'LAB', true),
('tt-4', 'module-v', 'course-mlops', 'TUESDAY', '13:30', '15:00', 'Cloud Studio 1', 'Dr. Sarah Lin', 'THEORY', false),
('tt-5', 'module-v', 'course-ethical-responsible-ai', 'WEDNESDAY', '09:00', '10:30', 'Seminar Hall 2', 'Dr. Aris Thorne', 'THEORY', false),
('tt-6', 'module-v', 'course-distributed-federated-learning', 'WEDNESDAY', '11:00', '12:30', 'Room 305', 'Prof. Kenji Takahashi', 'THEORY', false),
('tt-7', 'module-v', 'course-information-security', 'THURSDAY', '09:00', '10:30', 'Security Lab 4', 'Prof. Marcus Vance', 'THEORY', false),
('tt-8', 'module-v', 'course-operating-system', 'THURSDAY', '14:00', '16:00', 'Systems Lab 2', 'Prof. Marcus Vance', 'LAB', false),
('tt-9', 'module-v', 'course-deep-learning', 'FRIDAY', '10:00', '11:30', 'Auditorium Hall A', 'Dr. Elena Rostova', 'THEORY', true);

-- Assignments (Prescribed Practicals)
INSERT INTO assignments (id, course_id, unit_id, title, description, instructions, due_date, total_marks, weightage_percent, status) VALUES
('asg-dl-prac-1', 'course-deep-learning', 'dl-unit-1', 'Practical 1: TensorFlow/Keras Setup, Data Preprocessing & Train-Test Splitting', 'Google Colab setup, NumPy normalization, train-test splitting, data visualization.', 'Submit Colab notebook (.ipynb) and PDF report.', '2026-09-05 23:59:00', 100, 10, 'PUBLISHED'),
('asg-dl-prac-2', 'course-deep-learning', 'dl-unit-2', 'Practical 2: Multilayer Perceptron (MLP) Classification on Iris/Wine Dataset', 'Design and implement MLP, softmax activation, evaluation with accuracy and confusion matrix.', 'Include Seaborn confusion matrix plot.', '2026-09-12 23:59:00', 100, 10, 'PUBLISHED'),
('asg-dl-prac-3', 'course-deep-learning', 'dl-unit-2', 'Practical 3: Forward & Backpropagation with Learning Rate Tuning', 'Implement custom training loop with tf.GradientTape analyzing learning rates.', 'Tabulate loss across epochs.', '2026-09-20 23:59:00', 100, 10, 'PUBLISHED'),
('asg-os-prac-1', 'course-operating-system', NULL, 'Practical 1: Shell & Awk Programming for Student Database Management', 'Menu-driven bash script with awk for record insert, modify, and delete.', 'Upload .sh script.', '2026-09-16 17:00:00', 50, 10, 'PUBLISHED'),
('asg-erai-prac-6', 'course-ethical-responsible-ai', NULL, 'Practical 6: Demographic Parity Difference Analysis on UCI Adult Dataset', 'Compute demographic parity and disparate impact ratio.', 'Include pandas code and bar charts.', '2026-09-24 23:59:00', 50, 10, 'PUBLISHED');

-- Submissions for Aarav
INSERT INTO submissions (id, assignment_id, student_profile_id, submitted_at, status, text_response, attachment_name, marks_awarded, max_marks, feedback, graded_at, graded_by) VALUES
('sub-aarav-1', 'asg-dl-prac-1', 'profile-aarav', '2026-09-04 19:30:00+05:30', 'GRADED', 'Configured TensorFlow 2.16 with CUDA GPU acceleration. Normalization and stratified splitting verified on Colab notebook.', 'aarav_dl_practical_1_colab.ipynb', 96, 100, 'Excellent data pipeline and visualization plots. Correct implementation of feature scaling.', '2026-09-07 14:00:00+05:30', 'Dr. Elena Rostova'),
('sub-aarav-2', 'asg-dl-prac-2', 'profile-aarav', '2026-09-11 21:15:00+05:30', 'SUBMITTED', 'Implemented 3-layer MLP on Wine classification dataset. Achieved 97.2% test accuracy with zero overfitting.', 'mlp_classification_wine.ipynb', NULL, 100, NULL, NULL, NULL);

-- Attendance records
INSERT INTO attendance_records (id, student_profile_id, course_id, session_date, session_type, status, remarks) VALUES
('att-1', 'profile-aarav', 'course-deep-learning', '2026-09-01', 'THEORY', 'PRESENT', 'On time'),
('att-2', 'profile-aarav', 'course-operating-system', '2026-09-01', 'THEORY', 'PRESENT', 'On time'),
('att-3', 'profile-aarav', 'course-deep-learning', '2026-09-02', 'LAB', 'PRESENT', 'Lab unit 1 complete'),
('att-4', 'profile-aarav', 'course-mlops', '2026-09-02', 'THEORY', 'PRESENT', 'On time'),
('att-5', 'profile-aarav', 'course-ethical-responsible-ai', '2026-09-03', 'THEORY', 'PRESENT', 'Active participant'),
('att-6', 'profile-aarav', 'course-distributed-federated-learning', '2026-09-03', 'THEORY', 'PRESENT', 'On time'),
('att-7', 'profile-aarav', 'course-information-security', '2026-09-04', 'THEORY', 'PRESENT', 'On time'),
('att-8', 'profile-aarav', 'course-deep-learning', '2026-09-05', 'THEORY', 'PRESENT', 'On time'),
('att-9', 'profile-aarav', 'course-deep-learning', '2026-09-08', 'THEORY', 'PRESENT', 'On time'),
('att-10', 'profile-aarav', 'course-operating-system', '2026-09-08', 'THEORY', 'PRESENT', 'On time'),
('att-11', 'profile-aarav', 'course-deep-learning', '2026-09-09', 'LAB', 'PRESENT', 'Practical 2 verification'),
('att-12', 'profile-aarav', 'course-ethical-responsible-ai', '2026-09-10', 'THEORY', 'PRESENT', 'On time');

-- Report Card Grades
INSERT INTO student_grade_records (id, student_profile_id, course_id, academic_term, current_percentage, letter_grade, credits, teacher_comments) VALUES
('gr-1', 'profile-aarav', 'course-deep-learning', 'AY 2026-27 • Module V', 96.5, 'A+', 4, 'Exceptional mastery of forward/backward propagation math and neural optimization.'),
('gr-2', 'profile-aarav', 'course-operating-system', 'AY 2026-27 • Module V', 92.4, 'A', 3, 'Strong understanding of process synchronization and Linux kernel internals.'),
('gr-3', 'profile-aarav', 'course-mlops', 'AY 2026-27 • Module V', 89.5, 'A-', 4, 'Clean DVC dataset tracking and CI/CD workflow automation.'),
('gr-4', 'profile-aarav', 'course-ethical-responsible-ai', 'AY 2026-27 • Module V', 94.0, 'A', 4, 'Thoughtful critique of algorithmic bias and fairness evaluation.'),
('gr-5', 'profile-aarav', 'course-distributed-federated-learning', 'AY 2026-27 • Module V', 91.0, 'A', 4, 'Solid implementation of FedAvg algorithm simulation in Python.'),
('gr-6', 'profile-aarav', 'course-information-security', 'AY 2026-27 • Module V', 88.0, 'B+', 4, 'Good performance in cryptographic algorithms and packet inspection.');

-- Live Classes
INSERT INTO live_classes (id, course_id, unit_id, title, instructor_name, scheduled_start, scheduled_end, meeting_url, status, room_code) VALUES
('lc-1', 'course-deep-learning', 'dl-unit-1', 'Deep Learning: Unit I Fundamentals & Optimization Dynamics', 'Dr. Elena Rostova', '2026-09-12 10:00:00', '2026-09-12 11:30:00', 'https://meet.jit.si/Shreenil-VIT-CI3001-AuditoriumA', 'SCHEDULED', 'VIT-CI3001-A'),
('lc-2', 'course-operating-system', NULL, 'Operating System: Process Scheduling & Linux Kernel PCB', 'Prof. Marcus Vance', '2026-09-12 14:00:00', '2026-09-12 15:30:00', 'https://meet.jit.si/Shreenil-VIT-CI3202-Room204', 'SCHEDULED', 'VIT-CI3202-B');

-- Recorded Lectures
INSERT INTO recorded_lectures (id, course_id, unit_id, title, description, video_url, duration_minutes, recorded_date, transcript_summary, notes_markdown) VALUES
('rec-1', 'course-deep-learning', 'dl-unit-1', 'Lecture 1.1: Introduction to AI, ML & Deep Learning Foundations', 'Historical evolution of connectionist models, perceptrons, and GPU acceleration.', 'https://www.youtube.com/embed/aircAruvnKk', 45, '2026-09-01', 'Discussed difference between rule-based AI, statistical ML, and deep hierarchical representations.', '## Key Takeaways\n- Deep Learning eliminates handcrafted feature engineering.\n- GPU tensor parallelism enables massive scalability.'),
('rec-2', 'course-deep-learning', 'dl-unit-2', 'Lecture 2.1: Perceptron Architecture, Weights, Biases & Activations', 'Mathematical formulation of artificial neuron, non-linear activation functions (ReLU, Sigmoid, Tanh).', 'https://www.youtube.com/embed/aircAruvnKk', 50, '2026-09-03', 'Covered linear separability, XOR limitation, and multi-layer architectures.', '## Key Takeaways\n- Single layer perceptrons cannot solve XOR.\n- Non-linear activations are mandatory for deep representations.');

-- Library Items
INSERT INTO library_items (id, title, author, category, subject_tag, description, isbn_or_doi, publication_year, publisher, download_url, external_link, is_open_access) VALUES
('lib-1', 'Fundamentals of Deep Learning', 'N. Buduma, N. Buduma, and J. Papa', 'BOOK', 'Deep Learning', 'Comprehensive 2nd edition covering neural architecture fundamentals and deep representation learning.', '978-1492082217', '2022', 'O''Reilly Media', NULL, 'https://www.oreilly.com/library/view/fundamentals-of-deep/9781492082200/', true),
('lib-2', 'Neural Networks and Deep Learning', 'Charu C. Aggarwal', 'BOOK', 'Neural Networks', 'In-depth textbook on theoretical and algorithmic foundations of neural networks.', '978-3319944623', '2018', 'Springer', NULL, 'https://link.springer.com/book/10.1007/978-3-319-94463-0', true),
('lib-3', 'Deep Learning with Python', 'François Chollet', 'BOOK', 'Deep Learning', 'Practical guide to deep learning with Keras by the creator of Keras.', '978-1617294433', '2018', 'Manning Publications', NULL, 'https://www.manning.com/books/deep-learning-with-python', true),
('lib-4', 'Operating System Principles', 'A. Silberschatz, P. B. Galvin, G. Gagne', 'BOOK', 'Operating Systems', 'Classic operating systems principles, memory management, and process control.', '978-0470128725', '2008', 'John Wiley & Sons', NULL, NULL, true),
('lib-5', 'Introducing MLOps', 'M. Treveil and A. Shukla', 'BOOK', 'MLOps', 'How to scale machine learning projects with continuous delivery, monitoring, and governance.', '978-1492083290', '2020', 'O''Reilly Media', NULL, NULL, true),
('lib-6', 'IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)', 'IEEE Computer Society', 'JOURNAL', 'Computer Vision & AI', 'Premier peer-reviewed journal on machine intelligence and computer vision breakthroughs.', '10.1109/TPAMI', '2026', 'IEEE', NULL, 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=34', true);
