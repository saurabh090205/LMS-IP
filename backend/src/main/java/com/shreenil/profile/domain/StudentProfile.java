package com.shreenil.profile.domain;

import com.shreenil.academic.domain.Program;
import com.shreenil.common.BaseEntity;
import com.shreenil.user.domain.User;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student_profiles")
public class StudentProfile extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id", nullable = false)
    private Program program;

    @Column(name = "enrollment_number", nullable = false, unique = true, length = 64)
    private String enrollmentNumber;

    @Column(name = "current_semester", nullable = false)
    private Integer currentSemester;

    @Column(name = "current_academic_year", nullable = false, length = 20)
    private String currentAcademicYear;

    @Column(length = 20)
    private String section;

    @Column(name = "cumulative_gpa", precision = 3, scale = 2)
    private BigDecimal cumulativeGpa;

    @Column(name = "attendance_percentage", precision = 5, scale = 2)
    private BigDecimal attendancePercentage;

    @Column(name = "learning_streak_days", nullable = false)
    private Integer learningStreakDays;

    @Column(name = "avatar_url", length = 512)
    private String avatarUrl;

    @Column(name = "bio_summary", columnDefinition = "TEXT")
    private String bioSummary;

    @OneToMany(mappedBy = "studentProfile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StudentSkill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "studentProfile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StudentInterest> interests = new ArrayList<>();

    @OneToMany(mappedBy = "studentProfile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Achievement> achievements = new ArrayList<>();

    @OneToMany(mappedBy = "studentProfile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Enrollment> enrollments = new ArrayList<>();

    public StudentProfile() {}

    public StudentProfile(String id, User user, Program program, String enrollmentNumber, Integer currentSemester, String currentAcademicYear, String section, BigDecimal cumulativeGpa, BigDecimal attendancePercentage, Integer learningStreakDays, String avatarUrl, String bioSummary, List<StudentSkill> skills, List<StudentInterest> interests, List<Achievement> achievements, List<Enrollment> enrollments) {
        this.id = id;
        this.user = user;
        this.program = program;
        this.enrollmentNumber = enrollmentNumber;
        this.currentSemester = currentSemester;
        this.currentAcademicYear = currentAcademicYear;
        this.section = section;
        this.cumulativeGpa = cumulativeGpa;
        this.attendancePercentage = attendancePercentage;
        this.learningStreakDays = learningStreakDays;
        this.avatarUrl = avatarUrl;
        this.bioSummary = bioSummary;
        this.skills = skills;
        this.interests = interests;
        this.achievements = achievements;
        this.enrollments = enrollments;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Program getProgram() {
        return this.program;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public String getEnrollmentNumber() {
        return this.enrollmentNumber;
    }

    public void setEnrollmentNumber(String enrollmentNumber) {
        this.enrollmentNumber = enrollmentNumber;
    }

    public Integer getCurrentSemester() {
        return this.currentSemester;
    }

    public void setCurrentSemester(Integer currentSemester) {
        this.currentSemester = currentSemester;
    }

    public String getCurrentAcademicYear() {
        return this.currentAcademicYear;
    }

    public void setCurrentAcademicYear(String currentAcademicYear) {
        this.currentAcademicYear = currentAcademicYear;
    }

    public String getSection() {
        return this.section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public BigDecimal getCumulativeGpa() {
        return this.cumulativeGpa;
    }

    public void setCumulativeGpa(BigDecimal cumulativeGpa) {
        this.cumulativeGpa = cumulativeGpa;
    }

    public BigDecimal getAttendancePercentage() {
        return this.attendancePercentage;
    }

    public void setAttendancePercentage(BigDecimal attendancePercentage) {
        this.attendancePercentage = attendancePercentage;
    }

    public Integer getLearningStreakDays() {
        return this.learningStreakDays;
    }

    public void setLearningStreakDays(Integer learningStreakDays) {
        this.learningStreakDays = learningStreakDays;
    }

    public String getAvatarUrl() {
        return this.avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getBioSummary() {
        return this.bioSummary;
    }

    public void setBioSummary(String bioSummary) {
        this.bioSummary = bioSummary;
    }

    public List<StudentSkill> getSkills() {
        return this.skills;
    }

    public void setSkills(List<StudentSkill> skills) {
        this.skills = skills;
    }

    public List<StudentInterest> getInterests() {
        return this.interests;
    }

    public void setInterests(List<StudentInterest> interests) {
        this.interests = interests;
    }

    public List<Achievement> getAchievements() {
        return this.achievements;
    }

    public void setAchievements(List<Achievement> achievements) {
        this.achievements = achievements;
    }

    public List<Enrollment> getEnrollments() {
        return this.enrollments;
    }

    public void setEnrollments(List<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }

    public static StudentProfileBuilder builder() {
        return new StudentProfileBuilder();
    }

    public static class StudentProfileBuilder {
        private String id;
        private User user;
        private Program program;
        private String enrollmentNumber;
        private Integer currentSemester;
        private String currentAcademicYear;
        private String section;
        private BigDecimal cumulativeGpa;
        private BigDecimal attendancePercentage;
        private Integer learningStreakDays;
        private String avatarUrl;
        private String bioSummary;
        private List<StudentSkill> skills = new ArrayList<>();
        private List<StudentInterest> interests = new ArrayList<>();
        private List<Achievement> achievements = new ArrayList<>();
        private List<Enrollment> enrollments = new ArrayList<>();

        public StudentProfileBuilder() {}

        public StudentProfileBuilder id(String id) {
            this.id = id;
            return this;
        }

        public StudentProfileBuilder user(User user) {
            this.user = user;
            return this;
        }

        public StudentProfileBuilder program(Program program) {
            this.program = program;
            return this;
        }

        public StudentProfileBuilder enrollmentNumber(String enrollmentNumber) {
            this.enrollmentNumber = enrollmentNumber;
            return this;
        }

        public StudentProfileBuilder currentSemester(Integer currentSemester) {
            this.currentSemester = currentSemester;
            return this;
        }

        public StudentProfileBuilder currentAcademicYear(String currentAcademicYear) {
            this.currentAcademicYear = currentAcademicYear;
            return this;
        }

        public StudentProfileBuilder section(String section) {
            this.section = section;
            return this;
        }

        public StudentProfileBuilder cumulativeGpa(BigDecimal cumulativeGpa) {
            this.cumulativeGpa = cumulativeGpa;
            return this;
        }

        public StudentProfileBuilder attendancePercentage(BigDecimal attendancePercentage) {
            this.attendancePercentage = attendancePercentage;
            return this;
        }

        public StudentProfileBuilder learningStreakDays(Integer learningStreakDays) {
            this.learningStreakDays = learningStreakDays;
            return this;
        }

        public StudentProfileBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public StudentProfileBuilder bioSummary(String bioSummary) {
            this.bioSummary = bioSummary;
            return this;
        }

        public StudentProfileBuilder skills(List<StudentSkill> skills) {
            this.skills = skills;
            return this;
        }

        public StudentProfileBuilder interests(List<StudentInterest> interests) {
            this.interests = interests;
            return this;
        }

        public StudentProfileBuilder achievements(List<Achievement> achievements) {
            this.achievements = achievements;
            return this;
        }

        public StudentProfileBuilder enrollments(List<Enrollment> enrollments) {
            this.enrollments = enrollments;
            return this;
        }

        public StudentProfile build() {
            StudentProfile instance = new StudentProfile();
            instance.id = this.id;
            instance.user = this.user;
            instance.program = this.program;
            instance.enrollmentNumber = this.enrollmentNumber;
            instance.currentSemester = this.currentSemester;
            instance.currentAcademicYear = this.currentAcademicYear;
            instance.section = this.section;
            instance.cumulativeGpa = this.cumulativeGpa;
            instance.attendancePercentage = this.attendancePercentage;
            instance.learningStreakDays = this.learningStreakDays;
            instance.avatarUrl = this.avatarUrl;
            instance.bioSummary = this.bioSummary;
            instance.skills = this.skills;
            instance.interests = this.interests;
            instance.achievements = this.achievements;
            instance.enrollments = this.enrollments;
            return instance;
        }
    }
}
