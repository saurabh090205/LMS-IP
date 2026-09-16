package com.shreenil.homework.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public class AssignmentResponse {
    private String id;
    private String courseId;
    private String courseCode;
    private String courseTitle;
    private String title;
    private String description;
    private OffsetDateTime dueDate;
    private BigDecimal maxMarks;
    private String submissionType;
    private String status; // PENDING, SUBMITTED, GRADED, OVERDUE
    private SubmissionResponse mySubmission;

    public AssignmentResponse() {}

    public AssignmentResponse(String id, String courseId, String courseCode, String courseTitle, String title, String description, OffsetDateTime dueDate, BigDecimal maxMarks, String submissionType, String status, SubmissionResponse mySubmission) {
        this.id = id;
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.maxMarks = maxMarks;
        this.submissionType = submissionType;
        this.status = status;
        this.mySubmission = mySubmission;
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

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OffsetDateTime getDueDate() {
        return this.dueDate;
    }

    public void setDueDate(OffsetDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public BigDecimal getMaxMarks() {
        return this.maxMarks;
    }

    public void setMaxMarks(BigDecimal maxMarks) {
        this.maxMarks = maxMarks;
    }

    public String getSubmissionType() {
        return this.submissionType;
    }

    public void setSubmissionType(String submissionType) {
        this.submissionType = submissionType;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public SubmissionResponse getMySubmission() {
        return this.mySubmission;
    }

    public void setMySubmission(SubmissionResponse mySubmission) {
        this.mySubmission = mySubmission;
    }

    public static AssignmentResponseBuilder builder() {
        return new AssignmentResponseBuilder();
    }

    public static class AssignmentResponseBuilder {
        private String id;
        private String courseId;
        private String courseCode;
        private String courseTitle;
        private String title;
        private String description;
        private OffsetDateTime dueDate;
        private BigDecimal maxMarks;
        private String submissionType;
        private String status;
        private SubmissionResponse mySubmission;

        public AssignmentResponseBuilder() {}

        public AssignmentResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public AssignmentResponseBuilder courseId(String courseId) {
            this.courseId = courseId;
            return this;
        }

        public AssignmentResponseBuilder courseCode(String courseCode) {
            this.courseCode = courseCode;
            return this;
        }

        public AssignmentResponseBuilder courseTitle(String courseTitle) {
            this.courseTitle = courseTitle;
            return this;
        }

        public AssignmentResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public AssignmentResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public AssignmentResponseBuilder dueDate(OffsetDateTime dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public AssignmentResponseBuilder maxMarks(BigDecimal maxMarks) {
            this.maxMarks = maxMarks;
            return this;
        }

        public AssignmentResponseBuilder submissionType(String submissionType) {
            this.submissionType = submissionType;
            return this;
        }

        public AssignmentResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public AssignmentResponseBuilder mySubmission(SubmissionResponse mySubmission) {
            this.mySubmission = mySubmission;
            return this;
        }

        public AssignmentResponse build() {
            AssignmentResponse instance = new AssignmentResponse();
            instance.id = this.id;
            instance.courseId = this.courseId;
            instance.courseCode = this.courseCode;
            instance.courseTitle = this.courseTitle;
            instance.title = this.title;
            instance.description = this.description;
            instance.dueDate = this.dueDate;
            instance.maxMarks = this.maxMarks;
            instance.submissionType = this.submissionType;
            instance.status = this.status;
            instance.mySubmission = this.mySubmission;
            return instance;
        }
    }
}
