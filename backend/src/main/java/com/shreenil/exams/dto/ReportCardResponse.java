package com.shreenil.exams.dto;

import java.math.BigDecimal;
import java.util.List;

public class ReportCardResponse {
    private String studentId;
    private String studentName;
    private String enrollmentNumber;
    private String programName;
    private Integer semesterNumber;
    private String academicYear;
    private BigDecimal semesterGpa;
    private BigDecimal cumulativeGpa;
    private BigDecimal totalCreditsEarned;
    private List<GradeRecordResponse> courseGrades;
    private List<GradeRecordResponse> detailedAssessments;

    public ReportCardResponse() {}

    public ReportCardResponse(String studentId, String studentName, String enrollmentNumber, String programName, Integer semesterNumber, String academicYear, BigDecimal semesterGpa, BigDecimal cumulativeGpa, BigDecimal totalCreditsEarned, List<GradeRecordResponse> courseGrades, List<GradeRecordResponse> detailedAssessments) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.enrollmentNumber = enrollmentNumber;
        this.programName = programName;
        this.semesterNumber = semesterNumber;
        this.academicYear = academicYear;
        this.semesterGpa = semesterGpa;
        this.cumulativeGpa = cumulativeGpa;
        this.totalCreditsEarned = totalCreditsEarned;
        this.courseGrades = courseGrades;
        this.detailedAssessments = detailedAssessments;
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

    public Integer getSemesterNumber() {
        return this.semesterNumber;
    }

    public void setSemesterNumber(Integer semesterNumber) {
        this.semesterNumber = semesterNumber;
    }

    public String getAcademicYear() {
        return this.academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public BigDecimal getSemesterGpa() {
        return this.semesterGpa;
    }

    public void setSemesterGpa(BigDecimal semesterGpa) {
        this.semesterGpa = semesterGpa;
    }

    public BigDecimal getCumulativeGpa() {
        return this.cumulativeGpa;
    }

    public void setCumulativeGpa(BigDecimal cumulativeGpa) {
        this.cumulativeGpa = cumulativeGpa;
    }

    public BigDecimal getTotalCreditsEarned() {
        return this.totalCreditsEarned;
    }

    public void setTotalCreditsEarned(BigDecimal totalCreditsEarned) {
        this.totalCreditsEarned = totalCreditsEarned;
    }

    public List<GradeRecordResponse> getCourseGrades() {
        return this.courseGrades;
    }

    public void setCourseGrades(List<GradeRecordResponse> courseGrades) {
        this.courseGrades = courseGrades;
    }

    public List<GradeRecordResponse> getDetailedAssessments() {
        return this.detailedAssessments;
    }

    public void setDetailedAssessments(List<GradeRecordResponse> detailedAssessments) {
        this.detailedAssessments = detailedAssessments;
    }

    public static ReportCardResponseBuilder builder() {
        return new ReportCardResponseBuilder();
    }

    public static class ReportCardResponseBuilder {
        private String studentId;
        private String studentName;
        private String enrollmentNumber;
        private String programName;
        private Integer semesterNumber;
        private String academicYear;
        private BigDecimal semesterGpa;
        private BigDecimal cumulativeGpa;
        private BigDecimal totalCreditsEarned;
        private List<GradeRecordResponse> courseGrades;
        private List<GradeRecordResponse> detailedAssessments;

        public ReportCardResponseBuilder() {}

        public ReportCardResponseBuilder studentId(String studentId) {
            this.studentId = studentId;
            return this;
        }

        public ReportCardResponseBuilder studentName(String studentName) {
            this.studentName = studentName;
            return this;
        }

        public ReportCardResponseBuilder enrollmentNumber(String enrollmentNumber) {
            this.enrollmentNumber = enrollmentNumber;
            return this;
        }

        public ReportCardResponseBuilder programName(String programName) {
            this.programName = programName;
            return this;
        }

        public ReportCardResponseBuilder semesterNumber(Integer semesterNumber) {
            this.semesterNumber = semesterNumber;
            return this;
        }

        public ReportCardResponseBuilder academicYear(String academicYear) {
            this.academicYear = academicYear;
            return this;
        }

        public ReportCardResponseBuilder semesterGpa(BigDecimal semesterGpa) {
            this.semesterGpa = semesterGpa;
            return this;
        }

        public ReportCardResponseBuilder cumulativeGpa(BigDecimal cumulativeGpa) {
            this.cumulativeGpa = cumulativeGpa;
            return this;
        }

        public ReportCardResponseBuilder totalCreditsEarned(BigDecimal totalCreditsEarned) {
            this.totalCreditsEarned = totalCreditsEarned;
            return this;
        }

        public ReportCardResponseBuilder courseGrades(List<GradeRecordResponse> courseGrades) {
            this.courseGrades = courseGrades;
            return this;
        }

        public ReportCardResponseBuilder detailedAssessments(List<GradeRecordResponse> detailedAssessments) {
            this.detailedAssessments = detailedAssessments;
            return this;
        }

        public ReportCardResponse build() {
            ReportCardResponse instance = new ReportCardResponse();
            instance.studentId = this.studentId;
            instance.studentName = this.studentName;
            instance.enrollmentNumber = this.enrollmentNumber;
            instance.programName = this.programName;
            instance.semesterNumber = this.semesterNumber;
            instance.academicYear = this.academicYear;
            instance.semesterGpa = this.semesterGpa;
            instance.cumulativeGpa = this.cumulativeGpa;
            instance.totalCreditsEarned = this.totalCreditsEarned;
            instance.courseGrades = this.courseGrades;
            instance.detailedAssessments = this.detailedAssessments;
            return instance;
        }
    }
}
