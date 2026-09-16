package com.shreenil.profile.dto;

import com.shreenil.academic.dto.CourseSummaryResponse;
import java.math.BigDecimal;
import java.util.List;

public class StudentProgressResponse {
    private String studentId;
    private BigDecimal cumulativeGpa;
    private BigDecimal attendancePercentage;
    private Integer learningStreakDays;
    private Integer totalEnrolledCourses;
    private Integer completedCourses;
    private Integer totalAssignmentsSubmitted;
    private Integer pendingAssignments;
    private List<CourseSummaryResponse> enrolledCourses;
    private List<SkillProgressResponse> skillProficiencies;

    public StudentProgressResponse() {}

    public StudentProgressResponse(String studentId, BigDecimal cumulativeGpa, BigDecimal attendancePercentage, Integer learningStreakDays, Integer totalEnrolledCourses, Integer completedCourses, Integer totalAssignmentsSubmitted, Integer pendingAssignments, List<CourseSummaryResponse> enrolledCourses, List<SkillProgressResponse> skillProficiencies) {
        this.studentId = studentId;
        this.cumulativeGpa = cumulativeGpa;
        this.attendancePercentage = attendancePercentage;
        this.learningStreakDays = learningStreakDays;
        this.totalEnrolledCourses = totalEnrolledCourses;
        this.completedCourses = completedCourses;
        this.totalAssignmentsSubmitted = totalAssignmentsSubmitted;
        this.pendingAssignments = pendingAssignments;
        this.enrolledCourses = enrolledCourses;
        this.skillProficiencies = skillProficiencies;
    }

    public String getStudentId() {
        return this.studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
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

    public Integer getTotalEnrolledCourses() {
        return this.totalEnrolledCourses;
    }

    public void setTotalEnrolledCourses(Integer totalEnrolledCourses) {
        this.totalEnrolledCourses = totalEnrolledCourses;
    }

    public Integer getCompletedCourses() {
        return this.completedCourses;
    }

    public void setCompletedCourses(Integer completedCourses) {
        this.completedCourses = completedCourses;
    }

    public Integer getTotalAssignmentsSubmitted() {
        return this.totalAssignmentsSubmitted;
    }

    public void setTotalAssignmentsSubmitted(Integer totalAssignmentsSubmitted) {
        this.totalAssignmentsSubmitted = totalAssignmentsSubmitted;
    }

    public Integer getPendingAssignments() {
        return this.pendingAssignments;
    }

    public void setPendingAssignments(Integer pendingAssignments) {
        this.pendingAssignments = pendingAssignments;
    }

    public List<CourseSummaryResponse> getEnrolledCourses() {
        return this.enrolledCourses;
    }

    public void setEnrolledCourses(List<CourseSummaryResponse> enrolledCourses) {
        this.enrolledCourses = enrolledCourses;
    }

    public List<SkillProgressResponse> getSkillProficiencies() {
        return this.skillProficiencies;
    }

    public void setSkillProficiencies(List<SkillProgressResponse> skillProficiencies) {
        this.skillProficiencies = skillProficiencies;
    }

    public static StudentProgressResponseBuilder builder() {
        return new StudentProgressResponseBuilder();
    }

    public static class StudentProgressResponseBuilder {
        private String studentId;
        private BigDecimal cumulativeGpa;
        private BigDecimal attendancePercentage;
        private Integer learningStreakDays;
        private Integer totalEnrolledCourses;
        private Integer completedCourses;
        private Integer totalAssignmentsSubmitted;
        private Integer pendingAssignments;
        private List<CourseSummaryResponse> enrolledCourses;
        private List<SkillProgressResponse> skillProficiencies;

        public StudentProgressResponseBuilder() {}

        public StudentProgressResponseBuilder studentId(String studentId) {
            this.studentId = studentId;
            return this;
        }

        public StudentProgressResponseBuilder cumulativeGpa(BigDecimal cumulativeGpa) {
            this.cumulativeGpa = cumulativeGpa;
            return this;
        }

        public StudentProgressResponseBuilder attendancePercentage(BigDecimal attendancePercentage) {
            this.attendancePercentage = attendancePercentage;
            return this;
        }

        public StudentProgressResponseBuilder learningStreakDays(Integer learningStreakDays) {
            this.learningStreakDays = learningStreakDays;
            return this;
        }

        public StudentProgressResponseBuilder totalEnrolledCourses(Integer totalEnrolledCourses) {
            this.totalEnrolledCourses = totalEnrolledCourses;
            return this;
        }

        public StudentProgressResponseBuilder completedCourses(Integer completedCourses) {
            this.completedCourses = completedCourses;
            return this;
        }

        public StudentProgressResponseBuilder totalAssignmentsSubmitted(Integer totalAssignmentsSubmitted) {
            this.totalAssignmentsSubmitted = totalAssignmentsSubmitted;
            return this;
        }

        public StudentProgressResponseBuilder pendingAssignments(Integer pendingAssignments) {
            this.pendingAssignments = pendingAssignments;
            return this;
        }

        public StudentProgressResponseBuilder enrolledCourses(List<CourseSummaryResponse> enrolledCourses) {
            this.enrolledCourses = enrolledCourses;
            return this;
        }

        public StudentProgressResponseBuilder skillProficiencies(List<SkillProgressResponse> skillProficiencies) {
            this.skillProficiencies = skillProficiencies;
            return this;
        }

        public StudentProgressResponse build() {
            StudentProgressResponse instance = new StudentProgressResponse();
            instance.studentId = this.studentId;
            instance.cumulativeGpa = this.cumulativeGpa;
            instance.attendancePercentage = this.attendancePercentage;
            instance.learningStreakDays = this.learningStreakDays;
            instance.totalEnrolledCourses = this.totalEnrolledCourses;
            instance.completedCourses = this.completedCourses;
            instance.totalAssignmentsSubmitted = this.totalAssignmentsSubmitted;
            instance.pendingAssignments = this.pendingAssignments;
            instance.enrolledCourses = this.enrolledCourses;
            instance.skillProficiencies = this.skillProficiencies;
            return instance;
        }
    }
}
