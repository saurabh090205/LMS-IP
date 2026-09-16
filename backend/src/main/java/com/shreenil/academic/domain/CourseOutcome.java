package com.shreenil.academic.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
@Entity
@Table(name = "course_outcomes")
public class CourseOutcome extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "co_number", nullable = false)
    private Integer coNumber;

    @Column(name = "co_code", nullable = false, length = 20)
    private String coCode;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "blooms_level", length = 50)
    private String bloomsLevel;

    public CourseOutcome() {}

    public CourseOutcome(String id, Course course, Integer coNumber, String coCode, String description, String bloomsLevel) {
        this.id = id;
        this.course = course;
        this.coNumber = coNumber;
        this.coCode = coCode;
        this.description = description;
        this.bloomsLevel = bloomsLevel;
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

    public Integer getCoNumber() {
        return this.coNumber;
    }

    public void setCoNumber(Integer coNumber) {
        this.coNumber = coNumber;
    }

    public String getCoCode() {
        return this.coCode;
    }

    public void setCoCode(String coCode) {
        this.coCode = coCode;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBloomsLevel() {
        return this.bloomsLevel;
    }

    public void setBloomsLevel(String bloomsLevel) {
        this.bloomsLevel = bloomsLevel;
    }

    public static CourseOutcomeBuilder builder() {
        return new CourseOutcomeBuilder();
    }

    public static class CourseOutcomeBuilder {
        private String id;
        private Course course;
        private Integer coNumber;
        private String coCode;
        private String description;
        private String bloomsLevel;

        public CourseOutcomeBuilder() {}

        public CourseOutcomeBuilder id(String id) {
            this.id = id;
            return this;
        }

        public CourseOutcomeBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public CourseOutcomeBuilder coNumber(Integer coNumber) {
            this.coNumber = coNumber;
            return this;
        }

        public CourseOutcomeBuilder coCode(String coCode) {
            this.coCode = coCode;
            return this;
        }

        public CourseOutcomeBuilder description(String description) {
            this.description = description;
            return this;
        }

        public CourseOutcomeBuilder bloomsLevel(String bloomsLevel) {
            this.bloomsLevel = bloomsLevel;
            return this;
        }

        public CourseOutcome build() {
            CourseOutcome instance = new CourseOutcome();
            instance.id = this.id;
            instance.course = this.course;
            instance.coNumber = this.coNumber;
            instance.coCode = this.coCode;
            instance.description = this.description;
            instance.bloomsLevel = this.bloomsLevel;
            return instance;
        }
    }
}
