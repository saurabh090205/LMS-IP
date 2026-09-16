package com.shreenil.homework.domain;

import com.shreenil.academic.domain.Course;
import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "assignments")
public class Assignment extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "due_date", nullable = false)
    private OffsetDateTime dueDate;

    @Column(name = "max_marks", nullable = false, precision = 5, scale = 2)
    private BigDecimal maxMarks;

    @Column(name = "submission_type", nullable = false, length = 50)
    private String submissionType; // TEXT_AND_FILE, CODE_NOTEBOOK, REPORT

    @Column(nullable = false, length = 30)
    private String status; // PUBLISHED, DRAFT, CLOSED

    @OneToMany(mappedBy = "assignment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Submission> submissions = new ArrayList<>();

    public Assignment() {}

    public Assignment(String id, Course course, String title, String description, OffsetDateTime dueDate, BigDecimal maxMarks, String submissionType, String status, List<Submission> submissions) {
        this.id = id;
        this.course = course;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.maxMarks = maxMarks;
        this.submissionType = submissionType;
        this.status = status;
        this.submissions = submissions;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
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

    public List<Submission> getSubmissions() {
        return this.submissions;
    }

    public void setSubmissions(List<Submission> submissions) {
        this.submissions = submissions;
    }

    public static AssignmentBuilder builder() {
        return new AssignmentBuilder();
    }

    public static class AssignmentBuilder {
        private String id;
        private Course course;
        private String title;
        private String description;
        private OffsetDateTime dueDate;
        private BigDecimal maxMarks;
        private String submissionType;
        private String status;
        private List<Submission> submissions = new ArrayList<>();

        public AssignmentBuilder() {}

        public AssignmentBuilder id(String id) {
            this.id = id;
            return this;
        }

        public AssignmentBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public AssignmentBuilder title(String title) {
            this.title = title;
            return this;
        }

        public AssignmentBuilder description(String description) {
            this.description = description;
            return this;
        }

        public AssignmentBuilder dueDate(OffsetDateTime dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public AssignmentBuilder maxMarks(BigDecimal maxMarks) {
            this.maxMarks = maxMarks;
            return this;
        }

        public AssignmentBuilder submissionType(String submissionType) {
            this.submissionType = submissionType;
            return this;
        }

        public AssignmentBuilder status(String status) {
            this.status = status;
            return this;
        }

        public AssignmentBuilder submissions(List<Submission> submissions) {
            this.submissions = submissions;
            return this;
        }

        public Assignment build() {
            Assignment instance = new Assignment();
            instance.id = this.id;
            instance.course = this.course;
            instance.title = this.title;
            instance.description = this.description;
            instance.dueDate = this.dueDate;
            instance.maxMarks = this.maxMarks;
            instance.submissionType = this.submissionType;
            instance.status = this.status;
            instance.submissions = this.submissions;
            return instance;
        }
    }
}
