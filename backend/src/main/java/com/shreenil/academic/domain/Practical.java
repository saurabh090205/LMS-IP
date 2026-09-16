package com.shreenil.academic.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
@Entity
@Table(name = "practicals")
public class Practical extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "experiment_number", nullable = false)
    private Integer experimentNumber;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "mapped_units", length = 100)
    private String mappedUnits;

    public Practical() {}

    public Practical(String id, Course course, Integer experimentNumber, String title, String description, String mappedUnits) {
        this.id = id;
        this.course = course;
        this.experimentNumber = experimentNumber;
        this.title = title;
        this.description = description;
        this.mappedUnits = mappedUnits;
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

    public Integer getExperimentNumber() {
        return this.experimentNumber;
    }

    public void setExperimentNumber(Integer experimentNumber) {
        this.experimentNumber = experimentNumber;
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

    public String getMappedUnits() {
        return this.mappedUnits;
    }

    public void setMappedUnits(String mappedUnits) {
        this.mappedUnits = mappedUnits;
    }

    public static PracticalBuilder builder() {
        return new PracticalBuilder();
    }

    public static class PracticalBuilder {
        private String id;
        private Course course;
        private Integer experimentNumber;
        private String title;
        private String description;
        private String mappedUnits;

        public PracticalBuilder() {}

        public PracticalBuilder id(String id) {
            this.id = id;
            return this;
        }

        public PracticalBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public PracticalBuilder experimentNumber(Integer experimentNumber) {
            this.experimentNumber = experimentNumber;
            return this;
        }

        public PracticalBuilder title(String title) {
            this.title = title;
            return this;
        }

        public PracticalBuilder description(String description) {
            this.description = description;
            return this;
        }

        public PracticalBuilder mappedUnits(String mappedUnits) {
            this.mappedUnits = mappedUnits;
            return this;
        }

        public Practical build() {
            Practical instance = new Practical();
            instance.id = this.id;
            instance.course = this.course;
            instance.experimentNumber = this.experimentNumber;
            instance.title = this.title;
            instance.description = this.description;
            instance.mappedUnits = this.mappedUnits;
            return instance;
        }
    }
}
