package com.shreenil.homework.domain;

import com.shreenil.common.BaseEntity;
import com.shreenil.profile.domain.StudentProfile;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "submissions")
public class Submission extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id", nullable = false)
    private Assignment assignment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @Column(name = "submission_date", nullable = false)
    private OffsetDateTime submissionDate;

    @Column(name = "content_text", columnDefinition = "TEXT")
    private String contentText;

    @Column(name = "file_url", length = 512)
    private String fileUrl;

    @Column(name = "file_name", length = 255)
    private String fileName;

    @Column(nullable = false, length = 30)
    private String status; // SUBMITTED, GRADED, LATE, RESUBMITTED

    @Column(name = "marks_obtained", precision = 5, scale = 2)
    private BigDecimal marksObtained;

    @Column(name = "feedback_comments", columnDefinition = "TEXT")
    private String feedbackComments;

    @Column(name = "graded_at")
    private OffsetDateTime gradedAt;

    public Submission() {}

    public Submission(String id, Assignment assignment, StudentProfile studentProfile, OffsetDateTime submissionDate, String contentText, String fileUrl, String fileName, String status, BigDecimal marksObtained, String feedbackComments, OffsetDateTime gradedAt) {
        this.id = id;
        this.assignment = assignment;
        this.studentProfile = studentProfile;
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

    public Assignment getAssignment() {
        return this.assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public StudentProfile getStudentProfile() {
        return this.studentProfile;
    }

    public void setStudentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
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

    public static SubmissionBuilder builder() {
        return new SubmissionBuilder();
    }

    public static class SubmissionBuilder {
        private String id;
        private Assignment assignment;
        private StudentProfile studentProfile;
        private OffsetDateTime submissionDate;
        private String contentText;
        private String fileUrl;
        private String fileName;
        private String status;
        private BigDecimal marksObtained;
        private String feedbackComments;
        private OffsetDateTime gradedAt;

        public SubmissionBuilder() {}

        public SubmissionBuilder id(String id) {
            this.id = id;
            return this;
        }

        public SubmissionBuilder assignment(Assignment assignment) {
            this.assignment = assignment;
            return this;
        }

        public SubmissionBuilder studentProfile(StudentProfile studentProfile) {
            this.studentProfile = studentProfile;
            return this;
        }

        public SubmissionBuilder submissionDate(OffsetDateTime submissionDate) {
            this.submissionDate = submissionDate;
            return this;
        }

        public SubmissionBuilder contentText(String contentText) {
            this.contentText = contentText;
            return this;
        }

        public SubmissionBuilder fileUrl(String fileUrl) {
            this.fileUrl = fileUrl;
            return this;
        }

        public SubmissionBuilder fileName(String fileName) {
            this.fileName = fileName;
            return this;
        }

        public SubmissionBuilder status(String status) {
            this.status = status;
            return this;
        }

        public SubmissionBuilder marksObtained(BigDecimal marksObtained) {
            this.marksObtained = marksObtained;
            return this;
        }

        public SubmissionBuilder feedbackComments(String feedbackComments) {
            this.feedbackComments = feedbackComments;
            return this;
        }

        public SubmissionBuilder gradedAt(OffsetDateTime gradedAt) {
            this.gradedAt = gradedAt;
            return this;
        }

        public Submission build() {
            Submission instance = new Submission();
            instance.id = this.id;
            instance.assignment = this.assignment;
            instance.studentProfile = this.studentProfile;
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
