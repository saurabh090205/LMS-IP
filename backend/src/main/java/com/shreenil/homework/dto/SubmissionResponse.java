package com.shreenil.homework.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public class SubmissionResponse {
    private String id;
    private String assignmentId;
    private String studentProfileId;
    private OffsetDateTime submissionDate;
    private String contentText;
    private String fileUrl;
    private String fileName;
    private String status; // SUBMITTED, GRADED, LATE
    private BigDecimal marksObtained;
    private String feedbackComments;
    private OffsetDateTime gradedAt;

    public SubmissionResponse() {}

    public SubmissionResponse(String id, String assignmentId, String studentProfileId, OffsetDateTime submissionDate, String contentText, String fileUrl, String fileName, String status, BigDecimal marksObtained, String feedbackComments, OffsetDateTime gradedAt) {
        this.id = id;
        this.assignmentId = assignmentId;
        this.studentProfileId = studentProfileId;
        this.submissionDate = submissionDate;
        this.contentText = contentText;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.status = status;
        this.marksObtained = marksObtained;
        this.feedbackComments = feedbackComments;
        this.gradedAt = gradedAt;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAssignmentId() {
        return this.assignmentId;
    }

    public void setAssignmentId(String assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getStudentProfileId() {
        return this.studentProfileId;
    }

    public void setStudentProfileId(String studentProfileId) {
        this.studentProfileId = studentProfileId;
    }

    public OffsetDateTime getSubmissionDate() {
        return this.submissionDate;
    }

    public void setSubmissionDate(OffsetDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getContentText() {
        return this.contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public String getFileUrl() {
        return this.fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileName() {
        return this.fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getMarksObtained() {
        return this.marksObtained;
    }

    public void setMarksObtained(BigDecimal marksObtained) {
        this.marksObtained = marksObtained;
    }

    public String getFeedbackComments() {
        return this.feedbackComments;
    }

    public void setFeedbackComments(String feedbackComments) {
        this.feedbackComments = feedbackComments;
    }

    public OffsetDateTime getGradedAt() {
        return this.gradedAt;
    }

    public void setGradedAt(OffsetDateTime gradedAt) {
        this.gradedAt = gradedAt;
    }

    public static SubmissionResponseBuilder builder() {
        return new SubmissionResponseBuilder();
    }

    public static class SubmissionResponseBuilder {
        private String id;
        private String assignmentId;
        private String studentProfileId;
        private OffsetDateTime submissionDate;
        private String contentText;
        private String fileUrl;
        private String fileName;
        private String status;
        private BigDecimal marksObtained;
        private String feedbackComments;
        private OffsetDateTime gradedAt;

        public SubmissionResponseBuilder() {}

        public SubmissionResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public SubmissionResponseBuilder assignmentId(String assignmentId) {
            this.assignmentId = assignmentId;
            return this;
        }

        public SubmissionResponseBuilder studentProfileId(String studentProfileId) {
            this.studentProfileId = studentProfileId;
            return this;
        }

        public SubmissionResponseBuilder submissionDate(OffsetDateTime submissionDate) {
            this.submissionDate = submissionDate;
            return this;
        }

        public SubmissionResponseBuilder contentText(String contentText) {
            this.contentText = contentText;
            return this;
        }

        public SubmissionResponseBuilder fileUrl(String fileUrl) {
            this.fileUrl = fileUrl;
            return this;
        }

        public SubmissionResponseBuilder fileName(String fileName) {
            this.fileName = fileName;
            return this;
        }

        public SubmissionResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public SubmissionResponseBuilder marksObtained(BigDecimal marksObtained) {
            this.marksObtained = marksObtained;
            return this;
        }

        public SubmissionResponseBuilder feedbackComments(String feedbackComments) {
            this.feedbackComments = feedbackComments;
            return this;
        }

        public SubmissionResponseBuilder gradedAt(OffsetDateTime gradedAt) {
            this.gradedAt = gradedAt;
            return this;
        }

        public SubmissionResponse build() {
            SubmissionResponse instance = new SubmissionResponse();
            instance.id = this.id;
            instance.assignmentId = this.assignmentId;
            instance.studentProfileId = this.studentProfileId;
            instance.submissionDate = this.submissionDate;
            instance.contentText = this.contentText;
            instance.fileUrl = this.fileUrl;
            instance.fileName = this.fileName;
            instance.status = this.status;
            instance.marksObtained = this.marksObtained;
            instance.feedbackComments = this.feedbackComments;
            instance.gradedAt = this.gradedAt;
            return instance;
        }
    }
}
