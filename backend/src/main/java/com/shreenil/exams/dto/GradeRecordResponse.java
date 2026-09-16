package com.shreenil.exams.dto;

import java.math.BigDecimal;

public class GradeRecordResponse {
    private String id;
    private String courseId;
    private String courseCode;
    private String courseTitle;
    private String assessmentName;
    private BigDecimal marksObtained;
    private BigDecimal maxMarks;
    private BigDecimal percentage;
    private String letterGrade;
    private BigDecimal gradePoints;
    private Integer semesterNumber;
    private String teacherRemarks;

    public GradeRecordResponse() {}

    public GradeRecordResponse(String id, String courseId, String courseCode, String courseTitle, String assessmentName, BigDecimal marksObtained, BigDecimal maxMarks, BigDecimal percentage, String letterGrade, BigDecimal gradePoints, Integer semesterNumber, String teacherRemarks) {
        this.id = id;
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.assessmentName = assessmentName;
        this.marksObtained = marksObtained;
        this.maxMarks = maxMarks;
        this.percentage = percentage;
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

    public BigDecimal getPercentage() {
        return this.percentage;
    }

    public void setPercentage(BigDecimal percentage) {
        this.percentage = percentage;
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

    public static GradeRecordResponseBuilder builder() {
        return new GradeRecordResponseBuilder();
    }

    public static class GradeRecordResponseBuilder {
        private String id;
        private String courseId;
        private String courseCode;
        private String courseTitle;
        private String assessmentName;
        private BigDecimal marksObtained;
        private BigDecimal maxMarks;
        private BigDecimal percentage;
        private String letterGrade;
        private BigDecimal gradePoints;
        private Integer semesterNumber;
        private String teacherRemarks;

        public GradeRecordResponseBuilder() {}

        public GradeRecordResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public GradeRecordResponseBuilder courseId(String courseId) {
            this.courseId = courseId;
            return this;
        }

        public GradeRecordResponseBuilder courseCode(String courseCode) {
            this.courseCode = courseCode;
            return this;
        }

        public GradeRecordResponseBuilder courseTitle(String courseTitle) {
            this.courseTitle = courseTitle;
            return this;
        }

        public GradeRecordResponseBuilder assessmentName(String assessmentName) {
            this.assessmentName = assessmentName;
            return this;
        }

        public GradeRecordResponseBuilder marksObtained(BigDecimal marksObtained) {
            this.marksObtained = marksObtained;
            return this;
        }

        public GradeRecordResponseBuilder maxMarks(BigDecimal maxMarks) {
            this.maxMarks = maxMarks;
            return this;
        }

        public GradeRecordResponseBuilder percentage(BigDecimal percentage) {
            this.percentage = percentage;
            return this;
        }

        public GradeRecordResponseBuilder letterGrade(String letterGrade) {
            this.letterGrade = letterGrade;
            return this;
        }

        public GradeRecordResponseBuilder gradePoints(BigDecimal gradePoints) {
            this.gradePoints = gradePoints;
            return this;
        }

        public GradeRecordResponseBuilder semesterNumber(Integer semesterNumber) {
            this.semesterNumber = semesterNumber;
            return this;
        }

        public GradeRecordResponseBuilder teacherRemarks(String teacherRemarks) {
            this.teacherRemarks = teacherRemarks;
            return this;
        }

        public GradeRecordResponse build() {
            GradeRecordResponse instance = new GradeRecordResponse();
            instance.id = this.id;
            instance.courseId = this.courseId;
            instance.courseCode = this.courseCode;
            instance.courseTitle = this.courseTitle;
            instance.assessmentName = this.assessmentName;
            instance.marksObtained = this.marksObtained;
            instance.maxMarks = this.maxMarks;
            instance.percentage = this.percentage;
            instance.letterGrade = this.letterGrade;
            instance.gradePoints = this.gradePoints;
            instance.semesterNumber = this.semesterNumber;
            instance.teacherRemarks = this.teacherRemarks;
            return instance;
        }
    }
}
