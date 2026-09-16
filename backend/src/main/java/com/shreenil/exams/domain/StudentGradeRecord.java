package com.shreenil.exams.domain;

import com.shreenil.academic.domain.Course;
import com.shreenil.common.BaseEntity;
import com.shreenil.profile.domain.StudentProfile;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "student_grade_records")
public class StudentGradeRecord extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @Column(name = "assessment_name", nullable = false, length = 100)
    private String assessmentName;

    @Column(name = "marks_obtained", nullable = false, precision = 5, scale = 2)
    private BigDecimal marksObtained;

    @Column(name = "max_marks", nullable = false, precision = 5, scale = 2)
    private BigDecimal maxMarks;

    @Column(name = "letter_grade", length = 5)
    private String letterGrade;

    @Column(name = "grade_points", precision = 3, scale = 1)
    private BigDecimal gradePoints;

    @Column(name = "semester_number", nullable = false)
    private Integer semesterNumber;

    @Column(name = "teacher_remarks", columnDefinition = "TEXT")
    private String teacherRemarks;

    public StudentGradeRecord() {}

    public StudentGradeRecord(String id, StudentProfile studentProfile, Course course, Exam exam, String assessmentName, BigDecimal marksObtained, BigDecimal maxMarks, String letterGrade, BigDecimal gradePoints, Integer semesterNumber, String teacherRemarks) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.course = course;
        this.exam = exam;
        this.assessmentName = assessmentName;
        this.marksObtained = marksObtained;
        this.maxMarks = maxMarks;
        this.letterGrade = letterGrade;
        this.gradePoints = gradePoints;
        this.semesterNumber = semesterNumber;
        this.teacherRemarks = teacherRemarks;
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

    public Exam getExam() {
        return this.exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public String getAssessmentName() {
        return this.assessmentName;
    }

    public void setAssessmentName(String assessmentName) {
        this.assessmentName = assessmentName;
    }

    public BigDecimal getMarksObtained() {
        return this.marksObtained;
    }

    public void setMarksObtained(BigDecimal marksObtained) {
        this.marksObtained = marksObtained;
    }

    public BigDecimal getMaxMarks() {
        return this.maxMarks;
    }

    public void setMaxMarks(BigDecimal maxMarks) {
        this.maxMarks = maxMarks;
    }

    public String getLetterGrade() {
        return this.letterGrade;
    }

    public void setLetterGrade(String letterGrade) {
        this.letterGrade = letterGrade;
    }

    public BigDecimal getGradePoints() {
        return this.gradePoints;
    }

    public void setGradePoints(BigDecimal gradePoints) {
        this.gradePoints = gradePoints;
    }

    public Integer getSemesterNumber() {
        return this.semesterNumber;
    }

    public void setSemesterNumber(Integer semesterNumber) {
        this.semesterNumber = semesterNumber;
    }

    public String getTeacherRemarks() {
        return this.teacherRemarks;
    }

    public void setTeacherRemarks(String teacherRemarks) {
        this.teacherRemarks = teacherRemarks;
    }

    public static StudentGradeRecordBuilder builder() {
        return new StudentGradeRecordBuilder();
    }

    public static class StudentGradeRecordBuilder {
        private String id;
        private StudentProfile studentProfile;
        private Course course;
        private Exam exam;
        private String assessmentName;
        private BigDecimal marksObtained;
        private BigDecimal maxMarks;
        private String letterGrade;
        private BigDecimal gradePoints;
        private Integer semesterNumber;
        private String teacherRemarks;

        public StudentGradeRecordBuilder() {}

        public StudentGradeRecordBuilder id(String id) {
            this.id = id;
            return this;
        }

        public StudentGradeRecordBuilder studentProfile(StudentProfile studentProfile) {
            this.studentProfile = studentProfile;
            return this;
        }

        public StudentGradeRecordBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public StudentGradeRecordBuilder exam(Exam exam) {
            this.exam = exam;
            return this;
        }

        public StudentGradeRecordBuilder assessmentName(String assessmentName) {
            this.assessmentName = assessmentName;
            return this;
        }

        public StudentGradeRecordBuilder marksObtained(BigDecimal marksObtained) {
            this.marksObtained = marksObtained;
            return this;
        }

        public StudentGradeRecordBuilder maxMarks(BigDecimal maxMarks) {
            this.maxMarks = maxMarks;
            return this;
        }

        public StudentGradeRecordBuilder letterGrade(String letterGrade) {
            this.letterGrade = letterGrade;
            return this;
        }

        public StudentGradeRecordBuilder gradePoints(BigDecimal gradePoints) {
            this.gradePoints = gradePoints;
            return this;
        }

        public StudentGradeRecordBuilder semesterNumber(Integer semesterNumber) {
            this.semesterNumber = semesterNumber;
            return this;
        }

        public StudentGradeRecordBuilder teacherRemarks(String teacherRemarks) {
            this.teacherRemarks = teacherRemarks;
            return this;
        }

        public StudentGradeRecord build() {
            StudentGradeRecord instance = new StudentGradeRecord();
            instance.id = this.id;
            instance.studentProfile = this.studentProfile;
            instance.course = this.course;
            instance.exam = this.exam;
            instance.assessmentName = this.assessmentName;
            instance.marksObtained = this.marksObtained;
            instance.maxMarks = this.maxMarks;
            instance.letterGrade = this.letterGrade;
            instance.gradePoints = this.gradePoints;
            instance.semesterNumber = this.semesterNumber;
            instance.teacherRemarks = this.teacherRemarks;
            return instance;
        }
    }
}
