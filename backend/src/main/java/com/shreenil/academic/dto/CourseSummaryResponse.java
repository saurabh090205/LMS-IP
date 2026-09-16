package com.shreenil.academic.dto;

import java.math.BigDecimal;

public class CourseSummaryResponse {
    private String id;
    private String courseCode;
    private String courseStructureCode;
    private String syllabusCode;
    private String title;
    private BigDecimal credits;
    private Integer theoryHours;
    private Integer labHours;
    private Integer tutorialHours;
    private String department;
    private String badgeColor;
    private Integer totalUnits;
    private Integer totalTopics;
    private Integer studentProgressPercent;
    private String semester;
    private String moduleCode;

    public CourseSummaryResponse() {}

    public CourseSummaryResponse(String id, String courseCode, String courseStructureCode, String syllabusCode, String title, BigDecimal credits, Integer theoryHours, Integer labHours, Integer tutorialHours, String department, String badgeColor, Integer totalUnits, Integer totalTopics, Integer studentProgressPercent, String semester, String moduleCode) {
        this.id = id;
        this.courseCode = courseCode;
        this.courseStructureCode = courseStructureCode;
        this.syllabusCode = syllabusCode;
        this.title = title;
        this.credits = credits;
        this.theoryHours = theoryHours;
        this.labHours = labHours;
        this.tutorialHours = tutorialHours;
        this.department = department;
        this.badgeColor = badgeColor;
        this.totalUnits = totalUnits;
        this.totalTopics = totalTopics;
        this.studentProgressPercent = studentProgressPercent;
        this.semester = semester;
        this.moduleCode = moduleCode;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseCode() {
        return this.courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseStructureCode() {
        return this.courseStructureCode;
    }

    public void setCourseStructureCode(String courseStructureCode) {
        this.courseStructureCode = courseStructureCode;
    }

    public String getSyllabusCode() {
        return this.syllabusCode;
    }

    public void setSyllabusCode(String syllabusCode) {
        this.syllabusCode = syllabusCode;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BigDecimal getCredits() {
        return this.credits;
    }

    public void setCredits(BigDecimal credits) {
        this.credits = credits;
    }

    public Integer getTheoryHours() {
        return this.theoryHours;
    }

    public void setTheoryHours(Integer theoryHours) {
        this.theoryHours = theoryHours;
    }

    public Integer getLabHours() {
        return this.labHours;
    }

    public void setLabHours(Integer labHours) {
        this.labHours = labHours;
    }

    public Integer getTutorialHours() {
        return this.tutorialHours;
    }

    public void setTutorialHours(Integer tutorialHours) {
        this.tutorialHours = tutorialHours;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getBadgeColor() {
        return this.badgeColor;
    }

    public void setBadgeColor(String badgeColor) {
        this.badgeColor = badgeColor;
    }

    public Integer getTotalUnits() {
        return this.totalUnits;
    }

    public void setTotalUnits(Integer totalUnits) {
        this.totalUnits = totalUnits;
    }

    public Integer getTotalTopics() {
        return this.totalTopics;
    }

    public void setTotalTopics(Integer totalTopics) {
        this.totalTopics = totalTopics;
    }

    public Integer getStudentProgressPercent() {
        return this.studentProgressPercent;
    }

    public void setStudentProgressPercent(Integer studentProgressPercent) {
        this.studentProgressPercent = studentProgressPercent;
    }

    public String getSemester() {
        return this.semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getModuleCode() {
        return this.moduleCode;
    }

    public void setModuleCode(String moduleCode) {
        this.moduleCode = moduleCode;
    }

    public static CourseSummaryResponseBuilder builder() {
        return new CourseSummaryResponseBuilder();
    }

    public static class CourseSummaryResponseBuilder {
        private String id;
        private String courseCode;
        private String courseStructureCode;
        private String syllabusCode;
        private String title;
        private BigDecimal credits;
        private Integer theoryHours;
        private Integer labHours;
        private Integer tutorialHours;
        private String department;
        private String badgeColor;
        private Integer totalUnits;
        private Integer totalTopics;
        private Integer studentProgressPercent;
        private String semester;
        private String moduleCode;

        public CourseSummaryResponseBuilder() {}

        public CourseSummaryResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public CourseSummaryResponseBuilder courseCode(String courseCode) {
            this.courseCode = courseCode;
            return this;
        }

        public CourseSummaryResponseBuilder courseStructureCode(String courseStructureCode) {
            this.courseStructureCode = courseStructureCode;
            return this;
        }

        public CourseSummaryResponseBuilder syllabusCode(String syllabusCode) {
            this.syllabusCode = syllabusCode;
            return this;
        }

        public CourseSummaryResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public CourseSummaryResponseBuilder credits(BigDecimal credits) {
            this.credits = credits;
            return this;
        }

        public CourseSummaryResponseBuilder theoryHours(Integer theoryHours) {
            this.theoryHours = theoryHours;
            return this;
        }

        public CourseSummaryResponseBuilder labHours(Integer labHours) {
            this.labHours = labHours;
            return this;
        }

        public CourseSummaryResponseBuilder tutorialHours(Integer tutorialHours) {
            this.tutorialHours = tutorialHours;
            return this;
        }

        public CourseSummaryResponseBuilder department(String department) {
            this.department = department;
            return this;
        }

        public CourseSummaryResponseBuilder badgeColor(String badgeColor) {
            this.badgeColor = badgeColor;
            return this;
        }

        public CourseSummaryResponseBuilder totalUnits(Integer totalUnits) {
            this.totalUnits = totalUnits;
            return this;
        }

        public CourseSummaryResponseBuilder totalTopics(Integer totalTopics) {
            this.totalTopics = totalTopics;
            return this;
        }

        public CourseSummaryResponseBuilder studentProgressPercent(Integer studentProgressPercent) {
            this.studentProgressPercent = studentProgressPercent;
            return this;
        }

        public CourseSummaryResponseBuilder semester(String semester) {
            this.semester = semester;
            return this;
        }

        public CourseSummaryResponseBuilder moduleCode(String moduleCode) {
            this.moduleCode = moduleCode;
            return this;
        }

        public CourseSummaryResponse build() {
            CourseSummaryResponse instance = new CourseSummaryResponse();
            instance.id = this.id;
            instance.courseCode = this.courseCode;
            instance.courseStructureCode = this.courseStructureCode;
            instance.syllabusCode = this.syllabusCode;
            instance.title = this.title;
            instance.credits = this.credits;
            instance.theoryHours = this.theoryHours;
            instance.labHours = this.labHours;
            instance.tutorialHours = this.tutorialHours;
            instance.department = this.department;
            instance.badgeColor = this.badgeColor;
            instance.totalUnits = this.totalUnits;
            instance.totalTopics = this.totalTopics;
            instance.studentProgressPercent = this.studentProgressPercent;
            instance.semester = this.semester;
            instance.moduleCode = this.moduleCode;
            return instance;
        }
    }
}
