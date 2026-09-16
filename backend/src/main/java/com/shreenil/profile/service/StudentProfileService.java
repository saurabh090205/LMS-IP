package com.shreenil.profile.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.shreenil.academic.dto.CourseSummaryResponse;
import com.shreenil.academic.service.AcademicService;
import com.shreenil.auth.SecurityUtils;
import com.shreenil.classroom.dto.LiveClassResponse;
import com.shreenil.classroom.repository.LiveClassRepository;
import com.shreenil.common.ResourceNotFoundException;
import com.shreenil.exams.domain.StudentGradeRecord;
import com.shreenil.exams.dto.GradeRecordResponse;
import com.shreenil.exams.repository.StudentGradeRecordRepository;
import com.shreenil.homework.domain.Assignment;
import com.shreenil.homework.dto.AssignmentResponse;
import com.shreenil.homework.repository.AssignmentRepository;
import com.shreenil.homework.repository.SubmissionRepository;
import com.shreenil.profile.domain.*;
import com.shreenil.profile.dto.*;
import com.shreenil.profile.repository.*;
import com.shreenil.user.domain.User;
import com.shreenil.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentProfileService {
    private static final Logger log = LoggerFactory.getLogger(StudentProfileService.class);


    private final StudentProfileRepository studentProfileRepository;
    private final StudentSkillRepository skillRepository;
    private final StudentInterestRepository interestRepository;
    private final AchievementRepository achievementRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final AcademicService academicService;
    private final LiveClassRepository liveClassRepository;
    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;
    private final StudentGradeRecordRepository gradeRecordRepository;

    public StudentProfileService(StudentProfileRepository studentProfileRepository,
                             StudentSkillRepository skillRepository,
                             StudentInterestRepository interestRepository,
                             AchievementRepository achievementRepository,
                             EnrollmentRepository enrollmentRepository,
                             UserRepository userRepository,
                             AcademicService academicService,
                             LiveClassRepository liveClassRepository,
                             AssignmentRepository assignmentRepository,
                             SubmissionRepository submissionRepository,
                             StudentGradeRecordRepository gradeRecordRepository) {
        this.studentProfileRepository = studentProfileRepository;
        this.skillRepository = skillRepository;
        this.interestRepository = interestRepository;
        this.achievementRepository = achievementRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.academicService = academicService;
        this.liveClassRepository = liveClassRepository;
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.gradeRecordRepository = gradeRecordRepository;
    }


    @Transactional(readOnly = true)
    public StudentProfile getCurrentStudentProfile() {
        String keycloakOrUserId = SecurityUtils.getCurrentUserId();
        return studentProfileRepository.findByUserId(keycloakOrUserId)
                .or(() -> {
                    User user = userRepository.findByKeycloakId(keycloakOrUserId)
                            .or(() -> userRepository.findByEmail(SecurityUtils.getCurrentUsername()))
                            .orElse(null);
                    return user != null ? studentProfileRepository.findByUserId(user.getId()) : java.util.Optional.empty();
                })
                .or(() -> studentProfileRepository.findById("profile-aarav")) // dev fallback
                .orElseThrow(() -> new ResourceNotFoundException("StudentProfile", "user", keycloakOrUserId));
    }

    @Transactional(readOnly = true)
    public StudentProfileResponse getProfile() {
        StudentProfile student = getCurrentStudentProfile();
        List<StudentSkill> skills = skillRepository.findByStudentProfileId(student.getId());
        List<StudentInterest> interests = interestRepository.findByStudentProfileId(student.getId());
        List<Achievement> achievements = achievementRepository.findByStudentProfileId(student.getId());

        List<SkillProgressResponse> skillResponses = skills.stream()
                .map(s -> SkillProgressResponse.builder()
                        .id(s.getId())
                        .skillName(s.getSkillName())
                        .category(s.getCategory())
                        .proficiencyScore(s.getProficiencyScore())
                        .verifiedByCourse(s.getVerifiedByCourse())
                        .build())
                .collect(Collectors.toList());

        List<AchievementResponse> achievementResponses = achievements.stream()
                .map(a -> AchievementResponse.builder()
                        .id(a.getId())
                        .title(a.getTitle())
                        .category(a.getCategory())
                        .description(a.getDescription())
                        .dateEarned(a.getDateEarned())
                        .badge(a.getBadge())
                        .build())
                .collect(Collectors.toList());

        String programName = student.getProgram() != null ? student.getProgram().getName() : "B.Tech CSE (AI)";
        String programCode = student.getProgram() != null ? student.getProgram().getCode() : "BTECH-CSE-AI";
        String instName = student.getProgram() != null && student.getProgram().getInstitution() != null
                ? student.getProgram().getInstitution().getName() : "Vishwakarma Institute of Technology";

        return StudentProfileResponse.builder()
                .id(student.getId())
                .userId(student.getUser().getId())
                .firstName(student.getUser().getFirstName())
                .lastName(student.getUser().getLastName())
                .fullName(student.getUser().getFirstName() + " " + student.getUser().getLastName())
                .email(student.getUser().getEmail())
                .phoneNumber(student.getUser().getPhoneNumber())
                .enrollmentNumber(student.getEnrollmentNumber())
                .programName(programName)
                .programCode(programCode)
                .institutionName(instName)
                .currentSemester(student.getCurrentSemester())
                .currentAcademicYear(student.getCurrentAcademicYear())
                .section(student.getSection())
                .cumulativeGpa(student.getCumulativeGpa())
                .attendancePercentage(student.getAttendancePercentage())
                .learningStreakDays(student.getLearningStreakDays())
                .avatarUrl(student.getAvatarUrl())
                .bioSummary(student.getBioSummary())
                .skills(skillResponses)
                .interests(interests.stream().map(StudentInterest::getName).collect(Collectors.toList()))
                .achievements(achievementResponses)
                .build();
    }

    @Transactional(readOnly = true)
    public StudentProgressResponse getProgress() {
        StudentProfile student = getCurrentStudentProfile();
        List<Enrollment> enrollments = enrollmentRepository.findByStudentProfileId(student.getId());
        List<CourseSummaryResponse> courses = academicService.getCourses(null);
        List<StudentSkill> skills = skillRepository.findByStudentProfileId(student.getId());

        int totalCourses = enrollments.size();
        int completedCourses = (int) enrollments.stream().filter(e -> "COMPLETED".equalsIgnoreCase(e.getStatus())).count();

        List<SkillProgressResponse> skillResponses = skills.stream()
                .map(s -> SkillProgressResponse.builder()
                        .id(s.getId())
                        .skillName(s.getSkillName())
                        .category(s.getCategory())
                        .proficiencyScore(s.getProficiencyScore())
                        .verifiedByCourse(s.getVerifiedByCourse())
                        .build())
                .collect(Collectors.toList());

        return StudentProgressResponse.builder()
                .studentId(student.getId())
                .cumulativeGpa(student.getCumulativeGpa())
                .attendancePercentage(student.getAttendancePercentage())
                .learningStreakDays(student.getLearningStreakDays())
                .totalEnrolledCourses(totalCourses)
                .completedCourses(completedCourses)
                .totalAssignmentsSubmitted(1)
                .pendingAssignments(1)
                .enrolledCourses(courses)
                .skillProficiencies(skillResponses)
                .build();
    }

    @Transactional(readOnly = true)
    public DashboardResponse getDashboard() {
        StudentProfile student = getCurrentStudentProfile();
        StudentProfileResponse profile = getProfile();
        List<CourseSummaryResponse> courses = academicService.getCourses(null);

        // Fetch Live Classes
        List<LiveClassResponse> liveClasses = liveClassRepository.findAll().stream()
                .map(lc -> LiveClassResponse.builder()
                        .id(lc.getId())
                        .courseId(lc.getCourse() != null ? lc.getCourse().getId() : null)
                        .courseCode(lc.getCourse() != null ? lc.getCourse().getCourseCode() : "CI3001")
                        .courseTitle(lc.getCourse() != null ? lc.getCourse().getTitle() : "Deep Learning")
                        .title(lc.getTitle())
                        .teacherName(lc.getTeacherName())
                        .startTime(lc.getStartTime())
                        .endTime(lc.getEndTime())
                        .meetingUrl(lc.getMeetingUrl())
                        .jitsiRoomName(lc.getJitsiRoomName())
                        .status(lc.getStatus())
                        .build())
                .collect(Collectors.toList());

        // Fetch Homework
        List<Assignment> assignments = assignmentRepository.findAll();
        List<AssignmentResponse> pendingHomework = assignments.stream().map(a -> {
            var sub = submissionRepository.findByAssignmentIdAndStudentProfileId(a.getId(), student.getId());
            String status = sub.map(com.shreenil.homework.domain.Submission::getStatus).orElse("PENDING");
            return AssignmentResponse.builder()
                    .id(a.getId())
                    .courseId(a.getCourse().getId())
                    .courseCode(a.getCourse().getCourseCode())
                    .courseTitle(a.getCourse().getTitle())
                    .title(a.getTitle())
                    .description(a.getDescription())
                    .dueDate(a.getDueDate())
                    .maxMarks(a.getMaxMarks())
                    .submissionType(a.getSubmissionType())
                    .status(status)
                    .build();
        }).collect(Collectors.toList());

        // Fetch Grades
        List<StudentGradeRecord> grades = gradeRecordRepository.findByStudentProfileId(student.getId());
        List<GradeRecordResponse> latestGrades = grades.stream().map(g -> {
            BigDecimal pct = g.getMaxMarks().compareTo(BigDecimal.ZERO) > 0
                    ? g.getMarksObtained().divide(g.getMaxMarks(), 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100)).setScale(1, RoundingMode.HALF_UP)
                    : BigDecimal.ZERO;
            return GradeRecordResponse.builder()
                    .id(g.getId())
                    .courseId(g.getCourse() != null ? g.getCourse().getId() : null)
                    .courseCode(g.getCourse() != null ? g.getCourse().getCourseCode() : "N/A")
                    .courseTitle(g.getCourse() != null ? g.getCourse().getTitle() : "Course")
                    .assessmentName(g.getAssessmentName())
                    .marksObtained(g.getMarksObtained())
                    .maxMarks(g.getMaxMarks())
                    .percentage(pct)
                    .letterGrade(g.getLetterGrade())
                    .gradePoints(g.getGradePoints())
                    .semesterNumber(g.getSemesterNumber())
                    .teacherRemarks(g.getTeacherRemarks())
                    .build();
        }).collect(Collectors.toList());

        // Weekly activity mock distribution
        List<WeeklyActivityResponse> weeklyActivity = List.of(
                WeeklyActivityResponse.builder().day("Mon").hoursSpent(4.5).lessonsCompleted(3).build(),
                WeeklyActivityResponse.builder().day("Tue").hoursSpent(3.2).lessonsCompleted(2).build(),
                WeeklyActivityResponse.builder().day("Wed").hoursSpent(5.0).lessonsCompleted(4).build(),
                WeeklyActivityResponse.builder().day("Thu").hoursSpent(4.0).lessonsCompleted(3).build(),
                WeeklyActivityResponse.builder().day("Fri").hoursSpent(6.2).lessonsCompleted(5).build(),
                WeeklyActivityResponse.builder().day("Sat").hoursSpent(2.5).lessonsCompleted(2).build(),
                WeeklyActivityResponse.builder().day("Sun").hoursSpent(3.0).lessonsCompleted(2).build()
        );

        String aiInsight = "Your Deep Learning (CI3001) Unit II study pace is 15% ahead of your cohort. Consider tackling Practical 3 on ResNet backpropagation before the Friday submission deadline!";

        return DashboardResponse.builder()
                .studentId(student.getId())
                .studentName(profile.getFullName())
                .enrollmentNumber(profile.getEnrollmentNumber())
                .programName(profile.getProgramName())
                .programCode(profile.getProgramCode())
                .institutionName(profile.getInstitutionName())
                .currentSemester(profile.getCurrentSemester())
                .currentAcademicYear(profile.getCurrentAcademicYear())
                .section(profile.getSection())
                .cumulativeGpa(profile.getCumulativeGpa())
                .attendancePercentage(profile.getAttendancePercentage())
                .studyStreak(profile.getLearningStreakDays())
                .aiInsight(aiInsight)
                .todayClasses(liveClasses)
                .pendingHomework(pendingHomework)
                .latestGrades(latestGrades)
                .weeklyActivity(weeklyActivity)
                .skillProgress(profile.getSkills())
                .interestData(profile.getInterests())
                .enrolledCourses(courses)
                .achievements(profile.getAchievements())
                .build();
    }
}
