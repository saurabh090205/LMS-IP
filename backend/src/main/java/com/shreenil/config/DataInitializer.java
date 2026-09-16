package com.shreenil.config;

import com.shreenil.academic.domain.*;
import com.shreenil.academic.repository.*;
import com.shreenil.attendance.domain.AttendanceRecord;
import com.shreenil.attendance.repository.AttendanceRepository;
import com.shreenil.classroom.domain.LiveClass;
import com.shreenil.classroom.domain.RecordedLecture;
import com.shreenil.classroom.domain.TimetableSlot;
import com.shreenil.classroom.repository.LiveClassRepository;
import com.shreenil.classroom.repository.RecordedLectureRepository;
import com.shreenil.classroom.repository.TimetableSlotRepository;
import com.shreenil.exams.domain.StudentGradeRecord;
import com.shreenil.exams.repository.StudentGradeRecordRepository;
import com.shreenil.homework.domain.Assignment;
import com.shreenil.homework.domain.Submission;
import com.shreenil.homework.repository.AssignmentRepository;
import com.shreenil.homework.repository.SubmissionRepository;
import com.shreenil.library.domain.LibraryItem;
import com.shreenil.library.repository.LibraryItemRepository;
import com.shreenil.profile.domain.*;
import com.shreenil.profile.repository.*;
import com.shreenil.user.domain.Role;
import com.shreenil.user.domain.User;
import com.shreenil.user.repository.RoleRepository;
import com.shreenil.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final InstitutionRepository institutionRepository;
    private final ProgramRepository programRepository;
    private final AcademicYearRepository academicYearRepository;
    private final AcademicModuleRepository academicModuleRepository;
    private final CourseRepository courseRepository;
    private final UnitRepository unitRepository;
    private final TopicRepository topicRepository;
    private final PracticalRepository practicalRepository;
    private final CourseOutcomeRepository courseOutcomeRepository;
    private final LearningResourceRepository learningResourceRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final StudentSkillRepository skillRepository;
    private final StudentInterestRepository interestRepository;
    private final AchievementRepository achievementRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final TimetableSlotRepository timetableSlotRepository;
    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;
    private final AttendanceRepository attendanceRepository;
    private final StudentGradeRecordRepository gradeRecordRepository;
    private final LiveClassRepository liveClassRepository;
    private final RecordedLectureRepository recordedLectureRepository;
    private final LibraryItemRepository libraryItemRepository;

    public DataInitializer(
            RoleRepository roleRepository,
            UserRepository userRepository,
            InstitutionRepository institutionRepository,
            ProgramRepository programRepository,
            AcademicYearRepository academicYearRepository,
            AcademicModuleRepository academicModuleRepository,
            CourseRepository courseRepository,
            UnitRepository unitRepository,
            TopicRepository topicRepository,
            PracticalRepository practicalRepository,
            CourseOutcomeRepository courseOutcomeRepository,
            LearningResourceRepository learningResourceRepository,
            StudentProfileRepository studentProfileRepository,
            StudentSkillRepository skillRepository,
            StudentInterestRepository interestRepository,
            AchievementRepository achievementRepository,
            EnrollmentRepository enrollmentRepository,
            TimetableSlotRepository timetableSlotRepository,
            AssignmentRepository assignmentRepository,
            SubmissionRepository submissionRepository,
            AttendanceRepository attendanceRepository,
            StudentGradeRecordRepository gradeRecordRepository,
            LiveClassRepository liveClassRepository,
            RecordedLectureRepository recordedLectureRepository,
            LibraryItemRepository libraryItemRepository
    ) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.institutionRepository = institutionRepository;
        this.programRepository = programRepository;
        this.academicYearRepository = academicYearRepository;
        this.academicModuleRepository = academicModuleRepository;
        this.courseRepository = courseRepository;
        this.unitRepository = unitRepository;
        this.topicRepository = topicRepository;
        this.practicalRepository = practicalRepository;
        this.courseOutcomeRepository = courseOutcomeRepository;
        this.learningResourceRepository = learningResourceRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.skillRepository = skillRepository;
        this.interestRepository = interestRepository;
        this.achievementRepository = achievementRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.timetableSlotRepository = timetableSlotRepository;
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.attendanceRepository = attendanceRepository;
        this.gradeRecordRepository = gradeRecordRepository;
        this.liveClassRepository = liveClassRepository;
        this.recordedLectureRepository = recordedLectureRepository;
        this.libraryItemRepository = libraryItemRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0 && studentProfileRepository.count() > 0) {
            log.info("Database already seeded with demo student Aarav and VIT curriculum.");
            return;
        }

        log.info("Initializing Shreenil database with VIT Pune AY 2026-27 Curriculum & Demo Student Persona...");

        // 1. Roles
        Role studentRole = roleRepository.save(new Role("role-student", "ROLE_STUDENT", "Student Role"));
        Role teacherRole = roleRepository.save(new Role("role-teacher", "ROLE_TEACHER", "Teacher Role"));
        Role parentRole = roleRepository.save(new Role("role-parent", "ROLE_PARENT", "Parent Role"));
        Role adminRole = roleRepository.save(new Role("role-admin", "ROLE_ADMIN", "Admin Role"));

        // 2. Users
        User studentUser = User.builder()
                .id("usr-student-aarav")
                .tenantId("tenant-default")
                .keycloakId("kc-student-aarav")
                .email("aarav.sharma@shreenil.edu")
                .firstName("Aarav")
                .lastName("Sharma")
                .phoneNumber("+91 98765 43210")
                .status("ACTIVE")
                .roles(Set.of(studentRole))
                .build();
        userRepository.save(studentUser);

        User facultyUser = User.builder()
                .id("usr-faculty-elena")
                .tenantId("tenant-default")
                .keycloakId("kc-faculty-elena")
                .email("elena.rostova@vit.edu")
                .firstName("Dr. Elena")
                .lastName("Rostova")
                .phoneNumber("+91 98765 12345")
                .status("ACTIVE")
                .roles(Set.of(teacherRole))
                .build();
        userRepository.save(facultyUser);

        // 3. Institution
        Institution vit = Institution.builder()
                .id("institution-vit")
                .tenantId("tenant-default")
                .name("Vishwakarma Institute of Technology")
                .code("VIT-PUNE")
                .location("Pune, Maharashtra, India")
                .build();
        institutionRepository.save(vit);

        // 4. Program
        Program program = Program.builder()
                .id("program-btech-cse-ai")
                .institution(vit)
                .name("B.Tech. Computer Science & Engineering (Artificial Intelligence)")
                .code("BTECH-CSE-AI")
                .degree("B.Tech")
                .department("Computer Science and Engineering (AI)")
                .durationYears(4)
                .build();
        programRepository.save(program);

        // 5. Academic Year
        AcademicYear ay = AcademicYear.builder()
                .id("ay-2026-27")
                .program(program)
                .yearCode("AY 2026-27")
                .yearNumber(3)
                .isCurrent(true)
                .build();
        academicYearRepository.save(ay);

        // 6. Academic Module
        AcademicModule moduleV = AcademicModule.builder()
                .id("module-v")
                .academicYear(ay)
                .name("Third Year Module V (T.Y. B.Tech CSE AI)")
                .moduleCode("Module V")
                .semester(5)
                .build();
        academicModuleRepository.save(moduleV);

        // 7. Courses
        Course courseDL = Course.builder()
                .id("course-deep-learning")
                .academicModule(moduleV)
                .courseCode("CI3001")
                .courseStructureCode("CI3001")
                .syllabusCode("CI3201")
                .title("Deep Learning")
                .credits(BigDecimal.valueOf(4))
                .theoryHours(3)
                .labHours(2)
                .tutorialHours(0)
                .department("CSE (AI)")
                .badgeColor("indigo")
                .prerequisites("Machine Learning, Python Programming, Linear Algebra, Probability and Statistics")
                .objectives("1. Fundamental concepts in deep learning. 2. Neural networks and learning algorithms. 3. CNN, RNN, and GRU architectures. 4. Visual recognition. 5. Transfer learning and transformers. 6. Real-world applications.")
                .courseRelevance("This course focuses on the design, training, and optimization of deep neural network architectures for learning complex patterns from large-scale data.")
                .build();
        courseRepository.save(courseDL);

        Course courseOS = Course.builder()
                .id("course-operating-system")
                .academicModule(moduleV)
                .courseCode("CI3202")
                .courseStructureCode("CI3202")
                .syllabusCode("CI3202")
                .title("Operating System")
                .credits(BigDecimal.valueOf(3))
                .theoryHours(2)
                .labHours(2)
                .tutorialHours(0)
                .department("CSE (AI)")
                .badgeColor("cyan")
                .prerequisites("C/C++ Programming, Data Structures, Computer Organization and Architecture")
                .objectives("1. OS core structure. 2. Process scheduling. 3. Process synchronization. 4. Memory management.")
                .courseRelevance("Provides fundamental knowledge about how computer systems manage hardware and software resources efficiently.")
                .build();
        courseRepository.save(courseOS);

        Course courseMLOps = Course.builder()
                .id("course-mlops")
                .academicModule(moduleV)
                .courseCode("CI3003D")
                .courseStructureCode("CI3003D")
                .syllabusCode("CI3203D")
                .title("MLOPS")
                .credits(BigDecimal.valueOf(4))
                .theoryHours(3)
                .labHours(2)
                .tutorialHours(0)
                .department("CSE (AI)")
                .badgeColor("emerald")
                .prerequisites("Python, Basics of Machine Learning, Introduction to Cloud and DevOps Concepts")
                .objectives("1. Understand MLOps and ML lifecycle. 2. Data versioning and experiment tracking. 3. Build ML pipelines. 4. Deploy models using APIs and Docker.")
                .courseRelevance("Machine Learning Operations bridges the gap between ML model development and real-world deployment.")
                .build();
        courseRepository.save(courseMLOps);

        Course courseDFL = Course.builder()
                .id("course-distributed-federated-learning")
                .academicModule(moduleV)
                .courseCode("CI3203B")
                .courseStructureCode("CI3203B")
                .syllabusCode("CI3203 B")
                .title("Distributed and Federated Learning")
                .credits(BigDecimal.valueOf(4))
                .theoryHours(2)
                .labHours(2)
                .tutorialHours(0)
                .department("CSE (AI)")
                .badgeColor("purple")
                .prerequisites("Machine Learning")
                .objectives("1. Federated Learning concepts. 2. FL models. 3. Optimization in FL. 4. Privacy & Security in FL.")
                .courseRelevance("Provides in-depth understanding of distributed machine learning algorithms and federated optimization.")
                .build();
        courseRepository.save(courseDFL);

        Course courseERAI = Course.builder()
                .id("course-ethical-responsible-ai")
                .academicModule(moduleV)
                .courseCode("CI3203A")
                .courseStructureCode("CI3203A")
                .syllabusCode("CI3203 A")
                .title("Ethical and Responsible AI")
                .credits(BigDecimal.valueOf(4))
                .theoryHours(2)
                .labHours(2)
                .tutorialHours(0)
                .department("CSE (AI)")
                .badgeColor("amber")
                .prerequisites("Programming Fundamentals, Basics of Machine Learning/Deep Learning")
                .objectives("1. AI ethics principles. 2. Fairness, bias, transparency. 3. Privacy, security, governance.")
                .courseRelevance("Focuses on technical foundations of trustworthy AI, algorithmic fairness, and explainable AI (XAI).")
                .build();
        courseRepository.save(courseERAI);

        Course courseInfoSec = Course.builder()
                .id("course-information-security")
                .academicModule(moduleV)
                .courseCode("CI3203C")
                .courseStructureCode("CI3203C")
                .syllabusCode("CI3203C")
                .title("Information Security")
                .credits(BigDecimal.valueOf(4))
                .theoryHours(3)
                .labHours(2)
                .tutorialHours(0)
                .department("CSE (AI)")
                .badgeColor("rose")
                .prerequisites("Computer Networks, Operating Systems, Programming")
                .objectives("1. Information security and cyber threats. 2. Cryptographic techniques. 3. System and network security.")
                .courseRelevance("Provides fundamentals of information security, cryptography, and vulnerability assessment.")
                .build();
        courseRepository.save(courseInfoSec);

        // 8. Units for Deep Learning
        Unit u1 = unitRepository.save(Unit.builder().id("dl-unit-1").course(courseDL).unitNumber(1).title("Fundamental of Deep Learning").theoryHours(6).coMapping("CO1").build());
        Unit u2 = unitRepository.save(Unit.builder().id("dl-unit-2").course(courseDL).unitNumber(2).title("Perceptron and Neural Network Architecture").theoryHours(6).coMapping("CO2").build());
        Unit u3 = unitRepository.save(Unit.builder().id("dl-unit-3").course(courseDL).unitNumber(3).title("RNN, LSTM and GRU Architectures").theoryHours(9).coMapping("CO3").build());
        Unit u4 = unitRepository.save(Unit.builder().id("dl-unit-4").course(courseDL).unitNumber(4).title("Convolutional Neural Networks (CNN)").theoryHours(6).coMapping("CO4").build());
        Unit u5 = unitRepository.save(Unit.builder().id("dl-unit-5").course(courseDL).unitNumber(5).title("Advanced Deep Learning Architectures").theoryHours(7).coMapping("CO5").build());
        Unit u6 = unitRepository.save(Unit.builder().id("dl-unit-6").course(courseDL).unitNumber(6).title("Applications of Deep Learning").theoryHours(8).coMapping("CO6").build());

        // Topics
        topicRepository.save(Topic.builder().id("dl-t-1").unit(u1).topicNumber(1).title("Introduction to Artificial Intelligence, Machine Learning, and Deep Learning").estimatedMinutes(45).build());
        topicRepository.save(Topic.builder().id("dl-t-2").unit(u1).topicNumber(2).title("Limitations of machine learning, Advantage and challenges of deep learning").estimatedMinutes(45).build());
        topicRepository.save(Topic.builder().id("dl-t-3").unit(u1).topicNumber(3).title("Introduction to TensorFlow, Keras, and PyTorch, GPU (Google Colab)").estimatedMinutes(45).build());
        topicRepository.save(Topic.builder().id("dl-t-4").unit(u2).topicNumber(1).title("Biological neuron vs artificial neuron, Perceptron model, Weight and Bias").estimatedMinutes(45).build());
        topicRepository.save(Topic.builder().id("dl-t-5").unit(u2).topicNumber(2).title("Activation functions: Sigmoid, Tanh, ReLU, Softmax").estimatedMinutes(45).build());
        topicRepository.save(Topic.builder().id("dl-t-6").unit(u2).topicNumber(3).title("Backpropagation and Forward propagation, Gradient Descent").estimatedMinutes(45).build());
        topicRepository.save(Topic.builder().id("dl-t-7").unit(u3).topicNumber(1).title("Introduction to Sequential Data & Recurrent Neural Networks").estimatedMinutes(45).build());
        topicRepository.save(Topic.builder().id("dl-t-8").unit(u3).topicNumber(2).title("Long Short-Term Memory (LSTM) & Gated Recurrent Unit (GRU)").estimatedMinutes(45).build());
        topicRepository.save(Topic.builder().id("dl-t-9").unit(u4).topicNumber(1).title("Convolution operation, Kernels, Stride, Padding & Max Pooling").estimatedMinutes(45).build());
        topicRepository.save(Topic.builder().id("dl-t-10").unit(u4).topicNumber(2).title("Popular CNN Models: AlexNet, VGG, ResNet, EfficientNet").estimatedMinutes(45).build());
        topicRepository.save(Topic.builder().id("dl-t-11").unit(u5).topicNumber(1).title("Transfer Learning, Autoencoders, BERT & Vision Transformers (ViT)").estimatedMinutes(45).build());
        topicRepository.save(Topic.builder().id("dl-t-12").unit(u6).topicNumber(1).title("Computer Vision, NLP Chatbots, Speech Processing & Medical Imaging").estimatedMinutes(45).build());

        // Practicals
        practicalRepository.save(Practical.builder().id("dl-p-1").course(courseDL).experimentNumber(1).title("Install and configure TensorFlow/Keras in Google Colab. Preprocessing & Normalization").description("NumPy, Pandas, train-test splitting").build());
        practicalRepository.save(Practical.builder().id("dl-p-2").course(courseDL).experimentNumber(2).title("Design and implement MLP for classification on Iris/Wine dataset").description("Softmax and confusion matrix").build());
        practicalRepository.save(Practical.builder().id("dl-p-3").course(courseDL).experimentNumber(3).title("Forward and Backpropagation with custom GradientTape learning rate analysis").description("Gradient tape optimization").build());
        practicalRepository.save(Practical.builder().id("dl-p-4").course(courseDL).experimentNumber(4).title("LSTM time-series forecasting on weather or stock price dataset").description("Sequence models").build());
        practicalRepository.save(Practical.builder().id("dl-p-5").course(courseDL).experimentNumber(5).title("CNN Image Classification on Tomato/Soybean plant disease dataset").description("Conv2D and MaxPooling").build());

        // Course Outcomes
        courseOutcomeRepository.save(CourseOutcome.builder().id("dl-co-1").course(courseDL).coNumber(1).coCode("CO1").description("Explain fundamentals of deep learning, data preparation, and frameworks.").bloomsLevel("L2").build());
        courseOutcomeRepository.save(CourseOutcome.builder().id("dl-co-2").course(courseDL).coNumber(2).coCode("CO2").description("Apply neural network architectures and backpropagation for classification.").bloomsLevel("L3").build());
        courseOutcomeRepository.save(CourseOutcome.builder().id("dl-co-3").course(courseDL).coNumber(3).coCode("CO3").description("Examine sequential data using RNN, LSTM, and GRU architectures.").bloomsLevel("L4").build());
        courseOutcomeRepository.save(CourseOutcome.builder().id("dl-co-4").course(courseDL).coNumber(4).coCode("CO4").description("Analyze CNN models for image processing and computer vision applications.").bloomsLevel("L4").build());
        courseOutcomeRepository.save(CourseOutcome.builder().id("dl-co-5").course(courseDL).coNumber(5).coCode("CO5").description("Apply advanced transformer and transfer learning architectures.").bloomsLevel("L3").build());
        courseOutcomeRepository.save(CourseOutcome.builder().id("dl-co-6").course(courseDL).coNumber(6).coCode("CO6").description("Implement deep learning solutions for real-world multimodal applications.").bloomsLevel("L3").build());

        // 9. Student Profile (Aarav Sharma)
        StudentProfile profile = StudentProfile.builder()
                .id("profile-aarav")
                .user(studentUser)
                .program(program)
                .enrollmentNumber("VIT-2026-AI88")
                .currentSemester(5)
                .currentAcademicYear("AY 2026-27")
                .section("Division AI-1")
                .cumulativeGpa(BigDecimal.valueOf(9.42))
                .attendancePercentage(BigDecimal.valueOf(96.8))
                .learningStreakDays(9)
                .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces")
                .bioSummary("Pursuing B.Tech in CSE (Artificial Intelligence) at VIT Pune. Research interests in Deep Learning, MLOps pipelines, and Federated Optimization.")
                .build();
        studentProfileRepository.save(profile);

        // Skills
        skillRepository.save(StudentSkill.builder().id("sk-1").studentProfile(profile).skillName("Deep Learning & Neural Networks").category("AI Core").proficiencyScore(88).verifiedByCourse("CI3001").build());
        skillRepository.save(StudentSkill.builder().id("sk-2").studentProfile(profile).skillName("Computer Vision (CNN/ViT)").category("AI Core").proficiencyScore(82).verifiedByCourse("CI3001").build());
        skillRepository.save(StudentSkill.builder().id("sk-3").studentProfile(profile).skillName("MLOps & CI/CD Pipelines").category("DevOps & Systems").proficiencyScore(75).verifiedByCourse("CI3003D").build());
        skillRepository.save(StudentSkill.builder().id("sk-4").studentProfile(profile).skillName("Python & NumPy & PyTorch").category("Programming").proficiencyScore(95).verifiedByCourse("CI3001").build());
        skillRepository.save(StudentSkill.builder().id("sk-5").studentProfile(profile).skillName("Linux Kernel & Shell Programming").category("Systems").proficiencyScore(80).verifiedByCourse("CI3202").build());

        // Interests
        interestRepository.save(StudentInterest.builder().id("int-1").studentProfile(profile).name("Quantum Neural Networks").category("Research").build());
        interestRepository.save(StudentInterest.builder().id("int-2").studentProfile(profile).name("Edge AI & Autonomous Robotics").category("Applied Engineering").build());
        interestRepository.save(StudentInterest.builder().id("int-3").studentProfile(profile).name("Generative Diffusion Models").category("Generative AI").build());

        // Achievements
        achievementRepository.save(Achievement.builder().id("ach-1").studentProfile(profile).title("Dean's Honor Roll 2026").category("Academic").description("Maintained CGPA > 9.2 in Academic Year 2025-26").dateEarned(LocalDate.of(2026, 8, 15)).badge("Gold Medal").build());
        achievementRepository.save(Achievement.builder().id("ach-2").studentProfile(profile).title("Certified Research Scholar").category("Research").description("Published research on automated skin lesion classification").dateEarned(LocalDate.of(2026, 7, 20)).badge("Scholar").build());
        achievementRepository.save(Achievement.builder().id("ach-3").studentProfile(profile).title("Continuous 7-Day Study Cadence").category("Habit").description("Consistently logged > 3.0 study hours daily").dateEarned(LocalDate.of(2026, 9, 8)).badge("Streak").build());

        // Enrollments
        enrollmentRepository.save(Enrollment.builder().id("enr-1").studentProfile(profile).course(courseDL).enrollmentDate(LocalDate.of(2026, 8, 1)).status("ACTIVE").progressPercentage(68).finalGrade("A+").build());
        enrollmentRepository.save(Enrollment.builder().id("enr-2").studentProfile(profile).course(courseOS).enrollmentDate(LocalDate.of(2026, 8, 1)).status("ACTIVE").progressPercentage(54).finalGrade("A").build());
        enrollmentRepository.save(Enrollment.builder().id("enr-3").studentProfile(profile).course(courseMLOps).enrollmentDate(LocalDate.of(2026, 8, 1)).status("ACTIVE").progressPercentage(42).finalGrade("A-").build());
        enrollmentRepository.save(Enrollment.builder().id("enr-4").studentProfile(profile).course(courseDFL).enrollmentDate(LocalDate.of(2026, 8, 1)).status("ACTIVE").progressPercentage(30).finalGrade("A").build());
        enrollmentRepository.save(Enrollment.builder().id("enr-5").studentProfile(profile).course(courseERAI).enrollmentDate(LocalDate.of(2026, 8, 1)).status("ACTIVE").progressPercentage(60).finalGrade("A").build());
        enrollmentRepository.save(Enrollment.builder().id("enr-6").studentProfile(profile).course(courseInfoSec).enrollmentDate(LocalDate.of(2026, 8, 1)).status("ACTIVE").progressPercentage(35).finalGrade("B+").build());

        // Timetable Slots
        timetableSlotRepository.save(TimetableSlot.builder().id("tt-1").studentProfile(profile).course(courseDL).dayOfWeek("MONDAY").startTime(LocalTime.of(9, 0)).endTime(LocalTime.of(10, 30)).roomOrLink("Auditorium Hall A").faculty("Dr. Elena Rostova").slotType("THEORY").build());
        timetableSlotRepository.save(TimetableSlot.builder().id("tt-2").studentProfile(profile).course(courseOS).dayOfWeek("MONDAY").startTime(LocalTime.of(11, 0)).endTime(LocalTime.of(12, 30)).roomOrLink("Room 204 (VIT)").faculty("Prof. Marcus Vance").slotType("THEORY").build());
        timetableSlotRepository.save(TimetableSlot.builder().id("tt-3").studentProfile(profile).course(courseDL).dayOfWeek("TUESDAY").startTime(LocalTime.of(10, 0)).endTime(LocalTime.of(12, 0)).roomOrLink("AI Hardware Lab 3").faculty("Dr. Elena Rostova").slotType("LAB").build());
        timetableSlotRepository.save(TimetableSlot.builder().id("tt-4").studentProfile(profile).course(courseMLOps).dayOfWeek("TUESDAY").startTime(LocalTime.of(13, 30)).endTime(LocalTime.of(15, 0)).roomOrLink("Cloud Studio 1").faculty("Dr. Sarah Lin").slotType("THEORY").build());
        timetableSlotRepository.save(TimetableSlot.builder().id("tt-5").studentProfile(profile).course(courseERAI).dayOfWeek("WEDNESDAY").startTime(LocalTime.of(9, 0)).endTime(LocalTime.of(10, 30)).roomOrLink("Seminar Hall 2").faculty("Dr. Aris Thorne").slotType("THEORY").build());
        timetableSlotRepository.save(TimetableSlot.builder().id("tt-6").studentProfile(profile).course(courseDFL).dayOfWeek("WEDNESDAY").startTime(LocalTime.of(11, 0)).endTime(LocalTime.of(12, 30)).roomOrLink("Room 305").faculty("Prof. Kenji Takahashi").slotType("THEORY").build());
        timetableSlotRepository.save(TimetableSlot.builder().id("tt-7").studentProfile(profile).course(courseInfoSec).dayOfWeek("THURSDAY").startTime(LocalTime.of(9, 0)).endTime(LocalTime.of(10, 30)).roomOrLink("Security Lab 4").faculty("Prof. Marcus Vance").slotType("THEORY").build());
        timetableSlotRepository.save(TimetableSlot.builder().id("tt-8").studentProfile(profile).course(courseOS).dayOfWeek("THURSDAY").startTime(LocalTime.of(14, 0)).endTime(LocalTime.of(16, 0)).roomOrLink("Systems Lab 2").faculty("Prof. Marcus Vance").slotType("LAB").build());
        timetableSlotRepository.save(TimetableSlot.builder().id("tt-9").studentProfile(profile).course(courseDL).dayOfWeek("FRIDAY").startTime(LocalTime.of(10, 0)).endTime(LocalTime.of(11, 30)).roomOrLink("Auditorium Hall A").faculty("Dr. Elena Rostova").slotType("THEORY").build());

        // Assignments & Submissions
        Assignment asg1 = assignmentRepository.save(Assignment.builder()
                .id("asg-dl-prac-1")
                .course(courseDL)
                .title("Practical 1: TensorFlow/Keras Setup, Data Preprocessing & Train-Test Splitting")
                .description("Google Colab setup, NumPy normalization, train-test splitting, data visualization.")
                .dueDate(OffsetDateTime.now().minusDays(5))
                .maxMarks(BigDecimal.valueOf(100))
                .submissionType("CODE_NOTEBOOK")
                .status("PUBLISHED")
                .build());

        Assignment asg2 = assignmentRepository.save(Assignment.builder()
                .id("asg-dl-prac-2")
                .course(courseDL)
                .title("Practical 2: Multilayer Perceptron (MLP) Classification on Iris/Wine Dataset")
                .description("Design and implement MLP, softmax activation, evaluation with accuracy and confusion matrix.")
                .dueDate(OffsetDateTime.now().plusDays(2))
                .maxMarks(BigDecimal.valueOf(100))
                .submissionType("CODE_NOTEBOOK")
                .status("PUBLISHED")
                .build());

        submissionRepository.save(Submission.builder()
                .id("sub-aarav-1")
                .assignment(asg1)
                .studentProfile(profile)
                .submissionDate(OffsetDateTime.now().minusDays(6))
                .status("GRADED")
                .contentText("Configured TensorFlow 2.16 with CUDA GPU acceleration. Stratified splitting verified on Colab notebook.")
                .fileName("aarav_dl_practical_1_colab.ipynb")
                .marksObtained(BigDecimal.valueOf(96))
                .feedbackComments("Excellent data pipeline and visualization plots. Correct implementation of feature scaling.")
                .gradedAt(OffsetDateTime.now().minusDays(3))
                .build());

        submissionRepository.save(Submission.builder()
                .id("sub-aarav-2")
                .assignment(asg2)
                .studentProfile(profile)
                .submissionDate(OffsetDateTime.now().minusDays(1))
                .status("SUBMITTED")
                .contentText("Implemented 3-layer MLP on Wine classification dataset. Achieved 97.2% test accuracy.")
                .fileName("mlp_classification_wine.ipynb")
                .build());

        // Attendance records
        attendanceRepository.save(new AttendanceRecord("att-1", profile, courseDL, LocalDate.now().minusDays(10), "PRESENT", "On time"));
        attendanceRepository.save(new AttendanceRecord("att-2", profile, courseOS, LocalDate.now().minusDays(10), "PRESENT", "On time"));
        attendanceRepository.save(new AttendanceRecord("att-3", profile, courseDL, LocalDate.now().minusDays(9), "PRESENT", "Lab unit 1 complete"));
        attendanceRepository.save(new AttendanceRecord("att-4", profile, courseMLOps, LocalDate.now().minusDays(9), "PRESENT", "On time"));
        attendanceRepository.save(new AttendanceRecord("att-5", profile, courseERAI, LocalDate.now().minusDays(8), "PRESENT", "Active participant"));
        attendanceRepository.save(new AttendanceRecord("att-6", profile, courseDFL, LocalDate.now().minusDays(8), "PRESENT", "On time"));
        attendanceRepository.save(new AttendanceRecord("att-7", profile, courseInfoSec, LocalDate.now().minusDays(7), "PRESENT", "On time"));
        attendanceRepository.save(new AttendanceRecord("att-8", profile, courseDL, LocalDate.now().minusDays(6), "PRESENT", "On time"));
        attendanceRepository.save(new AttendanceRecord("att-9", profile, courseDL, LocalDate.now().minusDays(3), "PRESENT", "On time"));
        attendanceRepository.save(new AttendanceRecord("att-10", profile, courseOS, LocalDate.now().minusDays(3), "PRESENT", "On time"));
        attendanceRepository.save(new AttendanceRecord("att-11", profile, courseDL, LocalDate.now().minusDays(2), "PRESENT", "Practical 2 verification"));
        attendanceRepository.save(new AttendanceRecord("att-12", profile, courseERAI, LocalDate.now().minusDays(1), "PRESENT", "On time"));

        // Grade Records
        gradeRecordRepository.save(StudentGradeRecord.builder().id("gr-1").studentProfile(profile).course(courseDL).assessmentName("Continuous Assessment (CA-1)").marksObtained(BigDecimal.valueOf(96.5)).maxMarks(BigDecimal.valueOf(100)).letterGrade("A+").gradePoints(BigDecimal.valueOf(10.0)).semesterNumber(5).teacherRemarks("Exceptional mastery of forward/backward propagation math and neural optimization.").build());
        gradeRecordRepository.save(StudentGradeRecord.builder().id("gr-2").studentProfile(profile).course(courseOS).assessmentName("Mid Semester Assessment (MSA)").marksObtained(BigDecimal.valueOf(92.4)).maxMarks(BigDecimal.valueOf(100)).letterGrade("A").gradePoints(BigDecimal.valueOf(9.0)).semesterNumber(5).teacherRemarks("Strong understanding of process synchronization and Linux kernel internals.").build());
        gradeRecordRepository.save(StudentGradeRecord.builder().id("gr-3").studentProfile(profile).course(courseMLOps).assessmentName("Continuous Assessment (CA-1)").marksObtained(BigDecimal.valueOf(89.5)).maxMarks(BigDecimal.valueOf(100)).letterGrade("A-").gradePoints(BigDecimal.valueOf(8.5)).semesterNumber(5).teacherRemarks("Clean DVC dataset tracking and CI/CD workflow automation.").build());
        gradeRecordRepository.save(StudentGradeRecord.builder().id("gr-4").studentProfile(profile).course(courseERAI).assessmentName("Seminar & Case Study").marksObtained(BigDecimal.valueOf(94.0)).maxMarks(BigDecimal.valueOf(100)).letterGrade("A").gradePoints(BigDecimal.valueOf(9.0)).semesterNumber(5).teacherRemarks("Thoughtful critique of algorithmic bias and fairness evaluation.").build());
        gradeRecordRepository.save(StudentGradeRecord.builder().id("gr-5").studentProfile(profile).course(courseDFL).assessmentName("CA-1 Simulation").marksObtained(BigDecimal.valueOf(91.0)).maxMarks(BigDecimal.valueOf(100)).letterGrade("A").gradePoints(BigDecimal.valueOf(9.0)).semesterNumber(5).teacherRemarks("Solid implementation of FedAvg algorithm simulation in Python.").build());
        gradeRecordRepository.save(StudentGradeRecord.builder().id("gr-6").studentProfile(profile).course(courseInfoSec).assessmentName("Lab Assessment").marksObtained(BigDecimal.valueOf(88.0)).maxMarks(BigDecimal.valueOf(100)).letterGrade("B+").gradePoints(BigDecimal.valueOf(8.0)).semesterNumber(5).teacherRemarks("Good performance in cryptographic algorithms and packet inspection.").build());

        // Live Classes
        liveClassRepository.save(LiveClass.builder().id("lc-1").course(courseDL).title("Deep Learning: Unit I Fundamentals & Optimization Dynamics").teacherName("Dr. Elena Rostova").startTime(OffsetDateTime.now().plusHours(1)).endTime(OffsetDateTime.now().plusHours(2).plusMinutes(30)).meetingUrl("https://meet.jit.si/Shreenil-VIT-CI3001-AuditoriumA").jitsiRoomName("Shreenil-VIT-CI3001-AuditoriumA").status("SCHEDULED").build());
        liveClassRepository.save(LiveClass.builder().id("lc-2").course(courseOS).title("Operating System: Process Scheduling & Linux Kernel PCB").teacherName("Prof. Marcus Vance").startTime(OffsetDateTime.now().plusHours(4)).endTime(OffsetDateTime.now().plusHours(5).plusMinutes(30)).meetingUrl("https://meet.jit.si/Shreenil-VIT-CI3202-Room204").jitsiRoomName("Shreenil-VIT-CI3202-Room204").status("SCHEDULED").build());

        // Recorded Lectures
        recordedLectureRepository.save(RecordedLecture.builder().id("rec-1").course(courseDL).title("Lecture 1.1: Introduction to AI, ML & Deep Learning Foundations").summaryNotes("## Key Takeaways\n- Deep Learning eliminates handcrafted feature engineering.\n- GPU tensor parallelism enables massive scalability.").videoUrl("https://www.youtube.com/embed/aircAruvnKk").durationMinutes(45).recordedDate(LocalDate.now().minusDays(10)).instructorName("Dr. Elena Rostova").build());
        recordedLectureRepository.save(RecordedLecture.builder().id("rec-2").course(courseDL).title("Lecture 2.1: Perceptron Architecture, Weights, Biases & Activations").summaryNotes("## Key Takeaways\n- Single layer perceptrons cannot solve XOR.\n- Non-linear activations are mandatory for deep representations.").videoUrl("https://www.youtube.com/embed/aircAruvnKk").durationMinutes(50).recordedDate(LocalDate.now().minusDays(8)).instructorName("Dr. Elena Rostova").build());

        // Library Items
        libraryItemRepository.save(LibraryItem.builder().id("lib-1").title("Fundamentals of Deep Learning").author("N. Buduma, N. Buduma, and J. Papa").itemType("BOOK").category("Deep Learning").coverImageUrl("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=550&fit=crop").resourceUrl("https://www.oreilly.com/library/view/fundamentals-of-deep/9781492082200/").description("Comprehensive 2nd edition covering neural architecture fundamentals and deep representation learning.").isAvailable(true).publishedYear(2022).build());
        libraryItemRepository.save(LibraryItem.builder().id("lib-2").title("Neural Networks and Deep Learning").author("Charu C. Aggarwal").itemType("BOOK").category("Neural Networks").coverImageUrl("https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=400&h=550&fit=crop").resourceUrl("https://link.springer.com/book/10.1007/978-3-319-94463-0").description("In-depth textbook on theoretical and algorithmic foundations of neural networks.").isAvailable(true).publishedYear(2018).build());
        libraryItemRepository.save(LibraryItem.builder().id("lib-3").title("Deep Learning with Python").author("François Chollet").itemType("BOOK").category("Deep Learning").coverImageUrl("https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=550&fit=crop").resourceUrl("https://www.manning.com/books/deep-learning-with-python").description("Practical guide to deep learning with Keras by the creator of Keras.").isAvailable(true).publishedYear(2018).build());
        libraryItemRepository.save(LibraryItem.builder().id("lib-4").title("Operating System Principles").author("A. Silberschatz, P. B. Galvin, G. Gagne").itemType("BOOK").category("Operating Systems").coverImageUrl("https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=550&fit=crop").resourceUrl("https://www.wiley.com").description("Classic operating systems principles, memory management, and process control.").isAvailable(true).publishedYear(2008).build());
        libraryItemRepository.save(LibraryItem.builder().id("lib-5").title("Introducing MLOps").author("M. Treveil and A. Shukla").itemType("BOOK").category("MLOps").coverImageUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=550&fit=crop").resourceUrl("https://www.oreilly.com").description("How to scale machine learning projects with continuous delivery, monitoring, and governance.").isAvailable(true).publishedYear(2020).build());
        libraryItemRepository.save(LibraryItem.builder().id("lib-6").title("IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)").author("IEEE Computer Society").itemType("JOURNAL").category("Computer Vision & AI").coverImageUrl("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=550&fit=crop").resourceUrl("https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=34").description("Premier peer-reviewed journal on machine intelligence and computer vision breakthroughs.").isAvailable(true).publishedYear(2026).build());

        log.info("Shreenil database seeded successfully with 6 courses, full units, timetable, homework, attendance, gradebook, live classes, and library items!");
    }
}
