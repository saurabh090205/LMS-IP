package com.shreenil.homework.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public class FacultySubmissionResponse {
    private String id;
    private String assignmentId;
    private String assignmentTitle;
    private String courseId;
    private String courseCode;
    private String courseTitle;
    private String studentProfileId;
    private String studentName;
    private String studentEmail;
    private OffsetDateTime submissionDate;
    private String status;
    private String contentText;
    private String fileName;
    private String fileUrl;
    private BigDecimal marksAwarded;
    private BigDecimal maxMarks;
    private String feedback;
    private OffsetDateTime gradedAt;
    private String gradedBy;

    public FacultySubmissionResponse() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAssignmentId() { return assignmentId; }
    public void setAssignmentId(String assignmentId) { this.assignmentId = assignmentId; }

    public String getAssignmentTitle() { return assignmentTitle; }
    public void setAssignmentTitle(String assignmentTitle) { this.assignmentTitle = assignmentTitle; }

    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public String getStudentProfileId() { return studentProfileId; }
    public void setStudentProfileId(String studentProfileId) { this.studentProfileId = studentProfileId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public OffsetDateTime getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(OffsetDateTime submissionDate) { this.submissionDate = submissionDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getContentText() { return contentText; }
    public void setContentText(String contentText) { this.contentText = contentText; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public BigDecimal getMarksAwarded() { return marksAwarded; }
    public void setMarksAwarded(BigDecimal marksAwarded) { this.marksAwarded = marksAwarded; }

    public BigDecimal getMaxMarks() { return maxMarks; }
    public void setMaxMarks(BigDecimal maxMarks) { this.maxMarks = maxMarks; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public OffsetDateTime getGradedAt() { return gradedAt; }
    public void setGradedAt(OffsetDateTime gradedAt) { this.gradedAt = gradedAt; }

    public String getGradedBy() { return gradedBy; }
    public void setGradedBy(String gradedBy) { this.gradedBy = gradedBy; }

    public static FacultySubmissionResponseBuilder builder() {
        return new FacultySubmissionResponseBuilder();
    }

    public static class FacultySubmissionResponseBuilder {
        private String id;
        private String assignmentId;
        private String assignmentTitle;
        private String courseId;
        private String courseCode;
        private String courseTitle;
        private String studentProfileId;
        private String studentName;
        private String studentEmail;
        private OffsetDateTime submissionDate;
        private String status;
        private String contentText;
        private String fileName;
        private String fileUrl;
        private BigDecimal marksAwarded;
        private BigDecimal maxMarks;
        private String feedback;
        private OffsetDateTime gradedAt;
        private String gradedBy;

        public FacultySubmissionResponseBuilder id(String id) { this.id = id; return this; }
        public FacultySubmissionResponseBuilder assignmentId(String assignmentId) { this.assignmentId = assignmentId; return this; }
        public FacultySubmissionResponseBuilder assignmentTitle(String assignmentTitle) { this.assignmentTitle = assignmentTitle; return this; }
        public FacultySubmissionResponseBuilder courseId(String courseId) { this.courseId = courseId; return this; }
        public FacultySubmissionResponseBuilder courseCode(String courseCode) { this.courseCode = courseCode; return this; }
        public FacultySubmissionResponseBuilder courseTitle(String courseTitle) { this.courseTitle = courseTitle; return this; }
        public FacultySubmissionResponseBuilder studentProfileId(String studentProfileId) { this.studentProfileId = studentProfileId; return this; }
        public FacultySubmissionResponseBuilder studentName(String studentName) { this.studentName = studentName; return this; }
        public FacultySubmissionResponseBuilder email(String studentEmail) { this.studentEmail = studentEmail; return this; }
        public FacultySubmissionResponseBuilder studentEmail(String studentEmail) { this.studentEmail = studentEmail; return this; }
        public FacultySubmissionResponseBuilder submissionDate(OffsetDateTime submissionDate) { this.submissionDate = submissionDate; return this; }
        public FacultySubmissionResponseBuilder status(String status) { this.status = status; return this; }
        public FacultySubmissionResponseBuilder contentText(String contentText) { this.contentText = contentText; return this; }
        public FacultySubmissionResponseBuilder fileName(String fileName) { this.fileName = fileName; return this; }
        public FacultySubmissionResponseBuilder fileUrl(String fileUrl) { this.fileUrl = fileUrl; return this; }
        public FacultySubmissionResponseBuilder marksAwarded(BigDecimal marksAwarded) { this.marksAwarded = marksAwarded; return this; }
        public FacultySubmissionResponseBuilder maxMarks(BigDecimal maxMarks) { this.maxMarks = maxMarks; return this; }
        public FacultySubmissionResponseBuilder feedback(String feedback) { this.feedback = feedback; return this; }
        public FacultySubmissionResponseBuilder gradedAt(OffsetDateTime gradedAt) { this.gradedAt = gradedAt; return this; }
        public FacultySubmissionResponseBuilder gradedBy(String gradedBy) { this.gradedBy = gradedBy; return this; }

        public FacultySubmissionResponse build() {
            FacultySubmissionResponse res = new FacultySubmissionResponse();
            res.id = this.id;
            res.assignmentId = this.assignmentId;
            res.assignmentTitle = this.assignmentTitle;
            res.courseId = this.courseId;
            res.courseCode = this.courseCode;
            res.courseTitle = this.courseTitle;
            res.studentProfileId = this.studentProfileId;
            res.studentName = this.studentName;
            res.studentEmail = this.studentEmail;
            res.submissionDate = this.submissionDate;
            res.status = this.status;
            res.contentText = this.contentText;
            res.fileName = this.fileName;
            res.fileUrl = this.fileUrl;
            res.marksAwarded = this.marksAwarded;
            res.maxMarks = this.maxMarks;
            res.feedback = this.feedback;
            res.gradedAt = this.gradedAt;
            res.gradedBy = this.gradedBy;
            return res;
        }
    }
}
