package com.shreenil.academic.dto;

import java.math.BigDecimal;

public class CourseCreateRequest {
    private String courseCode;
    private String title;
    private BigDecimal credits;
    private String department;
    private Integer theoryHours;
    private Integer labHours;
    private Integer tutorialHours;
    private String prerequisites;
    private String objectives;
    private String courseRelevance;
    private String badgeColor;
    private String academicModuleId;

    public CourseCreateRequest() {}

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public BigDecimal getCredits() { return credits; }
    public void setCredits(BigDecimal credits) { this.credits = credits; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public Integer getTheoryHours() { return theoryHours; }
    public void setTheoryHours(Integer theoryHours) { this.theoryHours = theoryHours; }

    public Integer getLabHours() { return labHours; }
    public void setLabHours(Integer labHours) { this.labHours = labHours; }

    public Integer getTutorialHours() { return tutorialHours; }
    public void setTutorialHours(Integer tutorialHours) { this.tutorialHours = tutorialHours; }

    public String getPrerequisites() { return prerequisites; }
    public void setPrerequisites(String prerequisites) { this.prerequisites = prerequisites; }

    public String getObjectives() { return objectives; }
    public void setObjectives(String objectives) { this.objectives = objectives; }

    public String getCourseRelevance() { return courseRelevance; }
    public void setCourseRelevance(String courseRelevance) { this.courseRelevance = courseRelevance; }

    public String getBadgeColor() { return badgeColor; }
    public void setBadgeColor(String badgeColor) { this.badgeColor = badgeColor; }

    public String getAcademicModuleId() { return academicModuleId; }
    public void setAcademicModuleId(String academicModuleId) { this.academicModuleId = academicModuleId; }
}
