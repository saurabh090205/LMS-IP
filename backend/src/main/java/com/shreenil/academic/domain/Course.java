package com.shreenil.academic.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "academic_module_id", nullable = false)
    private AcademicModule academicModule;

    @Column(name = "course_code", nullable = false, length = 50)
    private String courseCode;

    @Column(name = "course_structure_code", length = 50)
    private String courseStructureCode;

    @Column(name = "syllabus_code", length = 50)
    private String syllabusCode;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, precision = 4, scale = 1)
    private BigDecimal credits;

    @Column(name = "theory_hours", nullable = false)
    private Integer theoryHours;

    @Column(name = "lab_hours", nullable = false)
    private Integer labHours;

    @Column(name = "tutorial_hours", nullable = false)
    private Integer tutorialHours;

    @Column(columnDefinition = "TEXT")
    private String prerequisites;

    @Column(columnDefinition = "TEXT")
    private String objectives;

    @Column(name = "course_relevance", columnDefinition = "TEXT")
    private String courseRelevance;

    @Column(name = "assessment_scheme", columnDefinition = "TEXT")
    private String assessmentScheme;

    @Column(columnDefinition = "TEXT")
    private String textbooks;

    @Column(name = "reference_books", columnDefinition = "TEXT")
    private String referenceBooks;

    @Column(name = "moocs_resources", columnDefinition = "TEXT")
    private String moocsResources;

    @Column(nullable = false, length = 50)
    private String department;

    @Column(length = 20)
    private String badgeColor;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("unitNumber ASC")
    private List<Unit> units = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("experimentNumber ASC")
    private List<Practical> practicals = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("coNumber ASC")
    private List<CourseOutcome> courseOutcomes = new ArrayList<>();

    public Course() {}

    public Course(String id, AcademicModule academicModule, String courseCode, String courseStructureCode, String syllabusCode, String title, BigDecimal credits, Integer theoryHours, Integer labHours, Integer tutorialHours, String prerequisites, String objectives, String courseRelevance, String assessmentScheme, String textbooks, String referenceBooks, String moocsResources, String department, String badgeColor, List<Unit> units, List<Practical> practicals, List<CourseOutcome> courseOutcomes) {
        this.id = id;
        this.academicModule = academicModule;
        this.courseCode = courseCode;
        this.courseStructureCode = courseStructureCode;
        this.syllabusCode = syllabusCode;
        this.title = title;
        this.credits = credits;
        this.theoryHours = theoryHours;
        this.labHours = labHours;
        this.tutorialHours = tutorialHours;
        this.prerequisites = prerequisites;
        this.objectives = objectives;
        this.courseRelevance = courseRelevance;
        this.assessmentScheme = assessmentScheme;
        this.textbooks = textbooks;
        this.referenceBooks = referenceBooks;
        this.moocsResources = moocsResources;
        this.department = department;
        this.badgeColor = badgeColor;
        this.units = units;
        this.practicals = practicals;
        this.courseOutcomes = courseOutcomes;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public AcademicModule getAcademicModule() {
        return this.academicModule;
    }

    public void setAcademicModule(AcademicModule academicModule) {
        this.academicModule = academicModule;
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

    public String getPrerequisites() {
        return this.prerequisites;
    }

    public void setPrerequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public String getObjectives() {
        return this.objectives;
    }

    public void setObjectives(String objectives) {
        this.objectives = objectives;
    }

    public String getCourseRelevance() {
        return this.courseRelevance;
    }

    public void setCourseRelevance(String courseRelevance) {
        this.courseRelevance = courseRelevance;
    }

    public String getAssessmentScheme() {
        return this.assessmentScheme;
    }

    public void setAssessmentScheme(String assessmentScheme) {
        this.assessmentScheme = assessmentScheme;
    }

    public String getTextbooks() {
        return this.textbooks;
    }

    public void setTextbooks(String textbooks) {
        this.textbooks = textbooks;
    }

    public String getReferenceBooks() {
        return this.referenceBooks;
    }

    public void setReferenceBooks(String referenceBooks) {
        this.referenceBooks = referenceBooks;
    }

    public String getMoocsResources() {
        return this.moocsResources;
    }

    public void setMoocsResources(String moocsResources) {
        this.moocsResources = moocsResources;
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

    public List<Unit> getUnits() {
        return this.units;
    }

    public void setUnits(List<Unit> units) {
        this.units = units;
    }

    public List<Practical> getPracticals() {
        return this.practicals;
    }

    public void setPracticals(List<Practical> practicals) {
        this.practicals = practicals;
    }

    public List<CourseOutcome> getCourseOutcomes() {
        return this.courseOutcomes;
    }

    public void setCourseOutcomes(List<CourseOutcome> courseOutcomes) {
        this.courseOutcomes = courseOutcomes;
    }

    public static CourseBuilder builder() {
        return new CourseBuilder();
    }

    public static class CourseBuilder {
        private String id;
        private AcademicModule academicModule;
        private String courseCode;
        private String courseStructureCode;
        private String syllabusCode;
        private String title;
        private BigDecimal credits;
        private Integer theoryHours;
        private Integer labHours;
        private Integer tutorialHours;
        private String prerequisites;
        private String objectives;
        private String courseRelevance;
        private String assessmentScheme;
        private String textbooks;
        private String referenceBooks;
        private String moocsResources;
        private String department;
        private String badgeColor;
        private List<Unit> units = new ArrayList<>();
        private List<Practical> practicals = new ArrayList<>();
        private List<CourseOutcome> courseOutcomes = new ArrayList<>();

        public CourseBuilder() {}

        public CourseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public CourseBuilder academicModule(AcademicModule academicModule) {
            this.academicModule = academicModule;
            return this;
        }

        public CourseBuilder courseCode(String courseCode) {
            this.courseCode = courseCode;
            return this;
        }

        public CourseBuilder courseStructureCode(String courseStructureCode) {
            this.courseStructureCode = courseStructureCode;
            return this;
        }

        public CourseBuilder syllabusCode(String syllabusCode) {
            this.syllabusCode = syllabusCode;
            return this;
        }

        public CourseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public CourseBuilder credits(BigDecimal credits) {
            this.credits = credits;
            return this;
        }

        public CourseBuilder theoryHours(Integer theoryHours) {
            this.theoryHours = theoryHours;
            return this;
        }

        public CourseBuilder labHours(Integer labHours) {
            this.labHours = labHours;
            return this;
        }

        public CourseBuilder tutorialHours(Integer tutorialHours) {
            this.tutorialHours = tutorialHours;
            return this;
        }

        public CourseBuilder prerequisites(String prerequisites) {
            this.prerequisites = prerequisites;
            return this;
        }

        public CourseBuilder objectives(String objectives) {
            this.objectives = objectives;
            return this;
        }

        public CourseBuilder courseRelevance(String courseRelevance) {
            this.courseRelevance = courseRelevance;
            return this;
        }

        public CourseBuilder assessmentScheme(String assessmentScheme) {
            this.assessmentScheme = assessmentScheme;
            return this;
        }

        public CourseBuilder textbooks(String textbooks) {
            this.textbooks = textbooks;
            return this;
        }

        public CourseBuilder referenceBooks(String referenceBooks) {
            this.referenceBooks = referenceBooks;
            return this;
        }

        public CourseBuilder moocsResources(String moocsResources) {
            this.moocsResources = moocsResources;
            return this;
        }

        public CourseBuilder department(String department) {
            this.department = department;
            return this;
        }

        public CourseBuilder badgeColor(String badgeColor) {
            this.badgeColor = badgeColor;
            return this;
        }

        public CourseBuilder units(List<Unit> units) {
            this.units = units;
            return this;
        }

        public CourseBuilder practicals(List<Practical> practicals) {
            this.practicals = practicals;
            return this;
        }

        public CourseBuilder courseOutcomes(List<CourseOutcome> courseOutcomes) {
            this.courseOutcomes = courseOutcomes;
            return this;
        }

        public Course build() {
            Course instance = new Course();
            instance.id = this.id;
            instance.academicModule = this.academicModule;
            instance.courseCode = this.courseCode;
            instance.courseStructureCode = this.courseStructureCode;
            instance.syllabusCode = this.syllabusCode;
            instance.title = this.title;
            instance.credits = this.credits;
            instance.theoryHours = this.theoryHours;
            instance.labHours = this.labHours;
            instance.tutorialHours = this.tutorialHours;
            instance.prerequisites = this.prerequisites;
            instance.objectives = this.objectives;
            instance.courseRelevance = this.courseRelevance;
            instance.assessmentScheme = this.assessmentScheme;
            instance.textbooks = this.textbooks;
            instance.referenceBooks = this.referenceBooks;
            instance.moocsResources = this.moocsResources;
            instance.department = this.department;
            instance.badgeColor = this.badgeColor;
            instance.units = this.units;
            instance.practicals = this.practicals;
            instance.courseOutcomes = this.courseOutcomes;
            return instance;
        }
    }
}
