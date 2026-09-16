package com.shreenil.profile.domain;

import com.shreenil.academic.domain.Course;
import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "enrollments")
public class Enrollment extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "enrollment_date", nullable = false)
    private LocalDate enrollmentDate;

    @Column(nullable = false, length = 30)
    private String status;

    @Column(name = "progress_percentage", nullable = false)
    private Integer progressPercentage;

    @Column(name = "final_grade", length = 10)
    private String finalGrade;

    public Enrollment() {}

    public Enrollment(String id, StudentProfile studentProfile, Course course, LocalDate enrollmentDate, String status, Integer progressPercentage, String finalGrade) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.course = course;
        this.enrollmentDate = enrollmentDate;
        this.status = status;
        this.progressPercentage = progressPercentage;
        this.finalGrade = finalGrade;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public StudentProfile getStudentProfile() {
        return this.studentProfile;
    }

    public void setStudentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public LocalDate getEnrollmentDate() {
        return this.enrollmentDate;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getProgressPercentage() {
        return this.progressPercentage;
    }

    public void setProgressPercentage(Integer progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public String getFinalGrade() {
        return this.finalGrade;
    }

    public void setFinalGrade(String finalGrade) {
        this.finalGrade = finalGrade;
    }

    public static EnrollmentBuilder builder() {
        return new EnrollmentBuilder();
    }

    public static class EnrollmentBuilder {
        private String id;
        private StudentProfile studentProfile;
        private Course course;
        private LocalDate enrollmentDate;
        private String status;
        private Integer progressPercentage;
        private String finalGrade;

        public EnrollmentBuilder() {}

        public EnrollmentBuilder id(String id) {
            this.id = id;
            return this;
        }

        public EnrollmentBuilder studentProfile(StudentProfile studentProfile) {
            this.studentProfile = studentProfile;
            return this;
        }

        public EnrollmentBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public EnrollmentBuilder enrollmentDate(LocalDate enrollmentDate) {
            this.enrollmentDate = enrollmentDate;
            return this;
        }

        public EnrollmentBuilder status(String status) {
            this.status = status;
            return this;
        }

        public EnrollmentBuilder progressPercentage(Integer progressPercentage) {
            this.progressPercentage = progressPercentage;
            return this;
        }

        public EnrollmentBuilder finalGrade(String finalGrade) {
            this.finalGrade = finalGrade;
            return this;
        }

        public Enrollment build() {
            Enrollment instance = new Enrollment();
            instance.id = this.id;
            instance.studentProfile = this.studentProfile;
            instance.course = this.course;
            instance.enrollmentDate = this.enrollmentDate;
            instance.status = this.status;
            instance.progressPercentage = this.progressPercentage;
            instance.finalGrade = this.finalGrade;
            return instance;
        }
    }
}
