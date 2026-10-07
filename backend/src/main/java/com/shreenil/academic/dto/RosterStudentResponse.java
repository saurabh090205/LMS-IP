package com.shreenil.academic.dto;

import java.math.BigDecimal;

public class RosterStudentResponse {
    private String id;
    private String studentProfileId;
    private String studentName;
    private String email;
    private String enrollmentNumber;
    private String section;
    private BigDecimal attendancePercentage;
    private Integer progressPercentage;
    private String finalGrade;
    private String status;

    public RosterStudentResponse() {}

    public RosterStudentResponse(String id, String studentProfileId, String studentName, String email,
                                 String enrollmentNumber, String section, BigDecimal attendancePercentage,
                                 Integer progressPercentage, String finalGrade, String status) {
        this.id = id;
        this.studentProfileId = studentProfileId;
        this.studentName = studentName;
        this.email = email;
        this.enrollmentNumber = enrollmentNumber;
        this.section = section;
        this.attendancePercentage = attendancePercentage;
        this.progressPercentage = progressPercentage;
        this.finalGrade = finalGrade;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStudentProfileId() { return studentProfileId; }
    public void setStudentProfileId(String studentProfileId) { this.studentProfileId = studentProfileId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getEnrollmentNumber() { return enrollmentNumber; }
    public void setEnrollmentNumber(String enrollmentNumber) { this.enrollmentNumber = enrollmentNumber; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public BigDecimal getAttendancePercentage() { return attendancePercentage; }
    public void setAttendancePercentage(BigDecimal attendancePercentage) { this.attendancePercentage = attendancePercentage; }

    public Integer getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Integer progressPercentage) { this.progressPercentage = progressPercentage; }

    public String getFinalGrade() { return finalGrade; }
    public void setFinalGrade(String finalGrade) { this.finalGrade = finalGrade; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public static RosterStudentResponseBuilder builder() {
        return new RosterStudentResponseBuilder();
    }

    public static class RosterStudentResponseBuilder {
        private String id;
        private String studentProfileId;
        private String studentName;
        private String email;
        private String enrollmentNumber;
        private String section;
        private BigDecimal attendancePercentage;
        private Integer progressPercentage;
        private String finalGrade;
        private String status;

        public RosterStudentResponseBuilder id(String id) { this.id = id; return this; }
        public RosterStudentResponseBuilder studentProfileId(String studentProfileId) { this.studentProfileId = studentProfileId; return this; }
        public RosterStudentResponseBuilder studentName(String studentName) { this.studentName = studentName; return this; }
        public RosterStudentResponseBuilder email(String email) { this.email = email; return this; }
        public RosterStudentResponseBuilder enrollmentNumber(String enrollmentNumber) { this.enrollmentNumber = enrollmentNumber; return this; }
        public RosterStudentResponseBuilder section(String section) { this.section = section; return this; }
        public RosterStudentResponseBuilder attendancePercentage(BigDecimal attendancePercentage) { this.attendancePercentage = attendancePercentage; return this; }
        public RosterStudentResponseBuilder progressPercentage(Integer progressPercentage) { this.progressPercentage = progressPercentage; return this; }
        public RosterStudentResponseBuilder finalGrade(String finalGrade) { this.finalGrade = finalGrade; return this; }
        public RosterStudentResponseBuilder status(String status) { this.status = status; return this; }

        public RosterStudentResponse build() {
            return new RosterStudentResponse(id, studentProfileId, studentName, email, enrollmentNumber,
                    section, attendancePercentage, progressPercentage, finalGrade, status);
        }
    }
}
