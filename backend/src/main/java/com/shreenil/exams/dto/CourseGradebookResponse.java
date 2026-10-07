package com.shreenil.exams.dto;

import java.math.BigDecimal;
import java.util.List;

public class CourseGradebookResponse {
    private String courseId;
    private String courseCode;
    private String courseTitle;
    private List<StudentGradeEntry> students;

    public CourseGradebookResponse() {}

    public CourseGradebookResponse(String courseId, String courseCode, String courseTitle, List<StudentGradeEntry> students) {
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.students = students;
    }

    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public List<StudentGradeEntry> getStudents() { return students; }
    public void setStudents(List<StudentGradeEntry> students) { this.students = students; }

    public static class StudentGradeEntry {
        private String studentProfileId;
        private String studentName;
        private String enrollmentNumber;
        private String avatarUrl;
        private BigDecimal attendanceRate;
        private List<AssessmentGradeEntry> assessments;
        private BigDecimal totalMarks;
        private BigDecimal averagePercentage;
        private String finalGrade;

        public StudentGradeEntry() {}

        public String getStudentProfileId() { return studentProfileId; }
        public void setStudentProfileId(String studentProfileId) { this.studentProfileId = studentProfileId; }

        public String getStudentName() { return studentName; }
        public void setStudentName(String studentName) { this.studentName = studentName; }

        public String getEnrollmentNumber() { return enrollmentNumber; }
        public void setEnrollmentNumber(String enrollmentNumber) { this.enrollmentNumber = enrollmentNumber; }

        public String getAvatarUrl() { return avatarUrl; }
        public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

        public BigDecimal getAttendanceRate() { return attendanceRate; }
        public void setAttendanceRate(BigDecimal attendanceRate) { this.attendanceRate = attendanceRate; }

        public List<AssessmentGradeEntry> getAssessments() { return assessments; }
        public void setAssessments(List<AssessmentGradeEntry> assessments) { this.assessments = assessments; }

        public BigDecimal getTotalMarks() { return totalMarks; }
        public void setTotalMarks(BigDecimal totalMarks) { this.totalMarks = totalMarks; }

        public BigDecimal getAveragePercentage() { return averagePercentage; }
        public void setAveragePercentage(BigDecimal averagePercentage) { this.averagePercentage = averagePercentage; }

        public String getFinalGrade() { return finalGrade; }
        public void setFinalGrade(String finalGrade) { this.finalGrade = finalGrade; }
    }

    public static class AssessmentGradeEntry {
        private String id;
        private String assessmentName;
        private BigDecimal marksObtained;
        private BigDecimal maxMarks;
        private String letterGrade;

        public AssessmentGradeEntry() {}

        public AssessmentGradeEntry(String id, String assessmentName, BigDecimal marksObtained, BigDecimal maxMarks, String letterGrade) {
            this.id = id;
            this.assessmentName = assessmentName;
            this.marksObtained = marksObtained;
            this.maxMarks = maxMarks;
            this.letterGrade = letterGrade;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getAssessmentName() { return assessmentName; }
        public void setAssessmentName(String assessmentName) { this.assessmentName = assessmentName; }

        public BigDecimal getMarksObtained() { return marksObtained; }
        public void setMarksObtained(BigDecimal marksObtained) { this.marksObtained = marksObtained; }

        public BigDecimal getMaxMarks() { return maxMarks; }
        public void setMaxMarks(BigDecimal maxMarks) { this.maxMarks = maxMarks; }

        public String getLetterGrade() { return letterGrade; }
        public void setLetterGrade(String letterGrade) { this.letterGrade = letterGrade; }
    }
}
