package com.shreenil.attendance.dto;

import java.time.LocalDate;

public class AttendanceRecordResponse {
    private String id;
    private String courseId;
    private String courseCode;
    private String courseTitle;
    private String studentProfileId;
    private String studentName;
    private String enrollmentNumber;
    private LocalDate date;
    private String status; // PRESENT, ABSENT, LATE, EXCUSED
    private String remarks;

    public AttendanceRecordResponse() {}

    public AttendanceRecordResponse(String id, String courseId, String courseCode, String courseTitle, LocalDate date, String status, String remarks) {
        this.id = id;
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.date = date;
        this.status = status;
        this.remarks = remarks;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseId() {
        return this.courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseCode() {
        return this.courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseTitle() {
        return this.courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemarks() {
        return this.remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getStudentProfileId() { return studentProfileId; }
    public void setStudentProfileId(String studentProfileId) { this.studentProfileId = studentProfileId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getEnrollmentNumber() { return enrollmentNumber; }
    public void setEnrollmentNumber(String enrollmentNumber) { this.enrollmentNumber = enrollmentNumber; }

    public static AttendanceRecordResponseBuilder builder() {
        return new AttendanceRecordResponseBuilder();
    }

    public static class AttendanceRecordResponseBuilder {
        private String id;
        private String courseId;
        private String courseCode;
        private String courseTitle;
        private String studentProfileId;
        private String studentName;
        private String enrollmentNumber;
        private LocalDate date;
        private String status;
        private String remarks;

        public AttendanceRecordResponseBuilder() {}

        public AttendanceRecordResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public AttendanceRecordResponseBuilder courseId(String courseId) {
            this.courseId = courseId;
            return this;
        }

        public AttendanceRecordResponseBuilder courseCode(String courseCode) {
            this.courseCode = courseCode;
            return this;
        }

        public AttendanceRecordResponseBuilder courseTitle(String courseTitle) {
            this.courseTitle = courseTitle;
            return this;
        }

        public AttendanceRecordResponseBuilder studentProfileId(String studentProfileId) {
            this.studentProfileId = studentProfileId;
            return this;
        }

        public AttendanceRecordResponseBuilder studentName(String studentName) {
            this.studentName = studentName;
            return this;
        }

        public AttendanceRecordResponseBuilder enrollmentNumber(String enrollmentNumber) {
            this.enrollmentNumber = enrollmentNumber;
            return this;
        }

        public AttendanceRecordResponseBuilder date(LocalDate date) {
            this.date = date;
            return this;
        }

        public AttendanceRecordResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public AttendanceRecordResponseBuilder remarks(String remarks) {
            this.remarks = remarks;
            return this;
        }

        public AttendanceRecordResponse build() {
            AttendanceRecordResponse instance = new AttendanceRecordResponse();
            instance.id = this.id;
            instance.courseId = this.courseId;
            instance.courseCode = this.courseCode;
            instance.courseTitle = this.courseTitle;
            instance.studentProfileId = this.studentProfileId;
            instance.studentName = this.studentName;
            instance.enrollmentNumber = this.enrollmentNumber;
            instance.date = this.date;
            instance.status = this.status;
            instance.remarks = this.remarks;
            return instance;
        }
    }
}
