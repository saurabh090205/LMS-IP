package com.shreenil.profile.dto;

import com.shreenil.academic.dto.CourseSummaryResponse;
import com.shreenil.classroom.dto.LiveClassResponse;
import com.shreenil.exams.dto.GradeRecordResponse;
import com.shreenil.homework.dto.AssignmentResponse;
import java.math.BigDecimal;
import java.util.List;

public class DashboardResponse {
    private String studentId;
    private String studentName;
    private String enrollmentNumber;
    private String programName;
    private String programCode;
    private String institutionName;
    private Integer currentSemester;
    private String currentAcademicYear;
    private String section;
    private BigDecimal cumulativeGpa;
    private BigDecimal attendancePercentage;
    private Integer studyStreak;
    private String aiInsight;
    private List<LiveClassResponse> todayClasses;
    private List<AssignmentResponse> pendingHomework;
    private List<GradeRecordResponse> latestGrades;
    private List<WeeklyActivityResponse> weeklyActivity;
    private List<SkillProgressResponse> skillProgress;
    private List<String> interestData;
    private List<CourseSummaryResponse> enrolledCourses;
    private List<AchievementResponse> achievements;

    public DashboardResponse() {}

    public DashboardResponse(String studentId, String studentName, String enrollmentNumber, String programName, String programCode, String institutionName, Integer currentSemester, String currentAcademicYear, String section, BigDecimal cumulativeGpa, BigDecimal attendancePercentage, Integer studyStreak, String aiInsight, List<LiveClassResponse> todayClasses, List<AssignmentResponse> pendingHomework, List<GradeRecordResponse> latestGrades, List<WeeklyActivityResponse> weeklyActivity, List<SkillProgressResponse> skillProgress, List<String> interestData, List<CourseSummaryResponse> enrolledCourses, List<AchievementResponse> achievements) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.enrollmentNumber = enrollmentNumber;
        this.programName = programName;
        this.programCode = programCode;
        this.institutionName = institutionName;
        this.currentSemester = currentSemester;
        this.currentAcademicYear = currentAcademicYear;
        this.section = section;
        this.cumulativeGpa = cumulativeGpa;
        this.attendancePercentage = attendancePercentage;
        this.studyStreak = studyStreak;
        this.aiInsight = aiInsight;
        this.todayClasses = todayClasses;
        this.pendingHomework = pendingHomework;
        this.latestGrades = latestGrades;
        this.weeklyActivity = weeklyActivity;
        this.skillProgress = skillProgress;
        this.interestData = interestData;
        this.enrolledCourses = enrolledCourses;
        this.achievements = achievements;
    }

    public String getStudentId() {
        return this.studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return this.studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getEnrollmentNumber() {
        return this.enrollmentNumber;
    }

    public void setEnrollmentNumber(String enrollmentNumber) {
        this.enrollmentNumber = enrollmentNumber;
    }

    public String getProgramName() {
        return this.programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public String getProgramCode() {
        return this.programCode;
    }

    public void setProgramCode(String programCode) {
        this.programCode = programCode;
    }

    public String getInstitutionName() {
        return this.institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
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

    public Integer getStudyStreak() {
        return this.studyStreak;
    }

    public void setStudyStreak(Integer studyStreak) {
        this.studyStreak = studyStreak;
    }

    public String getAiInsight() {
        return this.aiInsight;
    }

    public void setAiInsight(String aiInsight) {
        this.aiInsight = aiInsight;
    }

    public List<LiveClassResponse> getTodayClasses() {
        return this.todayClasses;
    }

    public void setTodayClasses(List<LiveClassResponse> todayClasses) {
        this.todayClasses = todayClasses;
    }

    public List<AssignmentResponse> getPendingHomework() {
        return this.pendingHomework;
    }

    public void setPendingHomework(List<AssignmentResponse> pendingHomework) {
        this.pendingHomework = pendingHomework;
    }

    public List<GradeRecordResponse> getLatestGrades() {
        return this.latestGrades;
    }

    public void setLatestGrades(List<GradeRecordResponse> latestGrades) {
        this.latestGrades = latestGrades;
    }

    public List<WeeklyActivityResponse> getWeeklyActivity() {
        return this.weeklyActivity;
    }

    public void setWeeklyActivity(List<WeeklyActivityResponse> weeklyActivity) {
        this.weeklyActivity = weeklyActivity;
    }

    public List<SkillProgressResponse> getSkillProgress() {
        return this.skillProgress;
    }

    public void setSkillProgress(List<SkillProgressResponse> skillProgress) {
        this.skillProgress = skillProgress;
    }

    public List<String> getInterestData() {
        return this.interestData;
    }

    public void setInterestData(List<String> interestData) {
        this.interestData = interestData;
    }

    public List<CourseSummaryResponse> getEnrolledCourses() {
        return this.enrolledCourses;
    }

    public void setEnrolledCourses(List<CourseSummaryResponse> enrolledCourses) {
        this.enrolledCourses = enrolledCourses;
    }

    public List<AchievementResponse> getAchievements() {
        return this.achievements;
    }

    public void setAchievements(List<AchievementResponse> achievements) {
        this.achievements = achievements;
    }

    public static DashboardResponseBuilder builder() {
        return new DashboardResponseBuilder();
    }

    public static class DashboardResponseBuilder {
        private String studentId;
        private String studentName;
        private String enrollmentNumber;
        private String programName;
        private String programCode;
        private String institutionName;
        private Integer currentSemester;
        private String currentAcademicYear;
        private String section;
        private BigDecimal cumulativeGpa;
        private BigDecimal attendancePercentage;
        private Integer studyStreak;
        private String aiInsight;
        private List<LiveClassResponse> todayClasses;
        private List<AssignmentResponse> pendingHomework;
        private List<GradeRecordResponse> latestGrades;
        private List<WeeklyActivityResponse> weeklyActivity;
        private List<SkillProgressResponse> skillProgress;
        private List<String> interestData;
        private List<CourseSummaryResponse> enrolledCourses;
        private List<AchievementResponse> achievements;

        public DashboardResponseBuilder() {}

        public DashboardResponseBuilder studentId(String studentId) {
            this.studentId = studentId;
            return this;
        }

        public DashboardResponseBuilder studentName(String studentName) {
            this.studentName = studentName;
            return this;
        }

        public DashboardResponseBuilder enrollmentNumber(String enrollmentNumber) {
            this.enrollmentNumber = enrollmentNumber;
            return this;
        }

        public DashboardResponseBuilder programName(String programName) {
            this.programName = programName;
            return this;
        }

        public DashboardResponseBuilder programCode(String programCode) {
            this.programCode = programCode;
            return this;
        }

        public DashboardResponseBuilder institutionName(String institutionName) {
            this.institutionName = institutionName;
            return this;
        }

        public DashboardResponseBuilder currentSemester(Integer currentSemester) {
            this.currentSemester = currentSemester;
            return this;
        }

        public DashboardResponseBuilder currentAcademicYear(String currentAcademicYear) {
            this.currentAcademicYear = currentAcademicYear;
            return this;
        }

        public DashboardResponseBuilder section(String section) {
            this.section = section;
            return this;
        }

        public DashboardResponseBuilder cumulativeGpa(BigDecimal cumulativeGpa) {
            this.cumulativeGpa = cumulativeGpa;
            return this;
        }

        public DashboardResponseBuilder attendancePercentage(BigDecimal attendancePercentage) {
            this.attendancePercentage = attendancePercentage;
            return this;
        }

        public DashboardResponseBuilder studyStreak(Integer studyStreak) {
            this.studyStreak = studyStreak;
            return this;
        }

        public DashboardResponseBuilder aiInsight(String aiInsight) {
            this.aiInsight = aiInsight;
            return this;
        }

        public DashboardResponseBuilder todayClasses(List<LiveClassResponse> todayClasses) {
            this.todayClasses = todayClasses;
            return this;
        }

        public DashboardResponseBuilder pendingHomework(List<AssignmentResponse> pendingHomework) {
            this.pendingHomework = pendingHomework;
            return this;
        }

        public DashboardResponseBuilder latestGrades(List<GradeRecordResponse> latestGrades) {
            this.latestGrades = latestGrades;
            return this;
        }

        public DashboardResponseBuilder weeklyActivity(List<WeeklyActivityResponse> weeklyActivity) {
            this.weeklyActivity = weeklyActivity;
            return this;
        }

        public DashboardResponseBuilder skillProgress(List<SkillProgressResponse> skillProgress) {
            this.skillProgress = skillProgress;
            return this;
        }

        public DashboardResponseBuilder interestData(List<String> interestData) {
            this.interestData = interestData;
            return this;
        }

        public DashboardResponseBuilder enrolledCourses(List<CourseSummaryResponse> enrolledCourses) {
            this.enrolledCourses = enrolledCourses;
            return this;
        }

        public DashboardResponseBuilder achievements(List<AchievementResponse> achievements) {
            this.achievements = achievements;
            return this;
        }

        public DashboardResponse build() {
            DashboardResponse instance = new DashboardResponse();
            instance.studentId = this.studentId;
            instance.studentName = this.studentName;
            instance.enrollmentNumber = this.enrollmentNumber;
            instance.programName = this.programName;
            instance.programCode = this.programCode;
            instance.institutionName = this.institutionName;
            instance.currentSemester = this.currentSemester;
            instance.currentAcademicYear = this.currentAcademicYear;
            instance.section = this.section;
            instance.cumulativeGpa = this.cumulativeGpa;
            instance.attendancePercentage = this.attendancePercentage;
            instance.studyStreak = this.studyStreak;
            instance.aiInsight = this.aiInsight;
            instance.todayClasses = this.todayClasses;
            instance.pendingHomework = this.pendingHomework;
            instance.latestGrades = this.latestGrades;
            instance.weeklyActivity = this.weeklyActivity;
            instance.skillProgress = this.skillProgress;
            instance.interestData = this.interestData;
            instance.enrolledCourses = this.enrolledCourses;
            instance.achievements = this.achievements;
            return instance;
        }
    }
}
