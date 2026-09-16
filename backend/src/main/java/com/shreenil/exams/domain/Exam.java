package com.shreenil.exams.domain;

import com.shreenil.academic.domain.Course;
import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "exams")
public class Exam extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(name = "exam_type", nullable = false, length = 50)
    private String examType; // IN_SEMESTER_1, IN_SEMESTER_2, END_SEMESTER, LAB_EXAM, SEMINAR

    @Column(name = "max_marks", nullable = false, precision = 5, scale = 2)
    private BigDecimal maxMarks;

    @Column(name = "exam_date", nullable = false)
    private LocalDate examDate;

    public Exam() {}

    public Exam(String id, Course course, String title, String examType, BigDecimal maxMarks, LocalDate examDate) {
        this.id = id;
        this.course = course;
        this.title = title;
        this.examType = examType;
        this.maxMarks = maxMarks;
        this.examDate = examDate;
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

    public String getExamType() {
        return this.examType;
    }

    public void setExamType(String examType) {
        this.examType = examType;
    }

    public BigDecimal getMaxMarks() {
        return this.maxMarks;
    }

    public void setMaxMarks(BigDecimal maxMarks) {
        this.maxMarks = maxMarks;
    }

    public LocalDate getExamDate() {
        return this.examDate;
    }

    public void setExamDate(LocalDate examDate) {
        this.examDate = examDate;
    }

    public static ExamBuilder builder() {
        return new ExamBuilder();
    }

    public static class ExamBuilder {
        private String id;
        private Course course;
        private String title;
        private String examType;
        private BigDecimal maxMarks;
        private LocalDate examDate;

        public ExamBuilder() {}

        public ExamBuilder id(String id) {
            this.id = id;
            return this;
        }

        public ExamBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public ExamBuilder title(String title) {
            this.title = title;
            return this;
        }

        public ExamBuilder examType(String examType) {
            this.examType = examType;
            return this;
        }

        public ExamBuilder maxMarks(BigDecimal maxMarks) {
            this.maxMarks = maxMarks;
            return this;
        }

        public ExamBuilder examDate(LocalDate examDate) {
            this.examDate = examDate;
            return this;
        }

        public Exam build() {
            Exam instance = new Exam();
            instance.id = this.id;
            instance.course = this.course;
            instance.title = this.title;
            instance.examType = this.examType;
            instance.maxMarks = this.maxMarks;
            instance.examDate = this.examDate;
            return instance;
        }
    }
}
