package com.shreenil.academic.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "units")
public class Unit extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "unit_number", nullable = false)
    private Integer unitNumber;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "theory_hours", nullable = false)
    private Integer theoryHours;

    @Column(name = "co_mapping", length = 50)
    private String coMapping;

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("topicNumber ASC")
    private List<Topic> topics = new ArrayList<>();

    public Unit() {}

    public Unit(String id, Course course, Integer unitNumber, String title, Integer theoryHours, String coMapping, List<Topic> topics) {
        this.id = id;
        this.course = course;
        this.unitNumber = unitNumber;
        this.title = title;
        this.theoryHours = theoryHours;
        this.coMapping = coMapping;
        this.topics = topics;
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

    public Integer getUnitNumber() {
        return this.unitNumber;
    }

    public void setUnitNumber(Integer unitNumber) {
        this.unitNumber = unitNumber;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getTheoryHours() {
        return this.theoryHours;
    }

    public void setTheoryHours(Integer theoryHours) {
        this.theoryHours = theoryHours;
    }

    public String getCoMapping() {
        return this.coMapping;
    }

    public void setCoMapping(String coMapping) {
        this.coMapping = coMapping;
    }

    public List<Topic> getTopics() {
        return this.topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }

    public static UnitBuilder builder() {
        return new UnitBuilder();
    }

    public static class UnitBuilder {
        private String id;
        private Course course;
        private Integer unitNumber;
        private String title;
        private Integer theoryHours;
        private String coMapping;
        private List<Topic> topics = new ArrayList<>();

        public UnitBuilder() {}

        public UnitBuilder id(String id) {
            this.id = id;
            return this;
        }

        public UnitBuilder course(Course course) {
            this.course = course;
            return this;
        }

        public UnitBuilder unitNumber(Integer unitNumber) {
            this.unitNumber = unitNumber;
            return this;
        }

        public UnitBuilder title(String title) {
            this.title = title;
            return this;
        }

        public UnitBuilder theoryHours(Integer theoryHours) {
            this.theoryHours = theoryHours;
            return this;
        }

        public UnitBuilder coMapping(String coMapping) {
            this.coMapping = coMapping;
            return this;
        }

        public UnitBuilder topics(List<Topic> topics) {
            this.topics = topics;
            return this;
        }

        public Unit build() {
            Unit instance = new Unit();
            instance.id = this.id;
            instance.course = this.course;
            instance.unitNumber = this.unitNumber;
            instance.title = this.title;
            instance.theoryHours = this.theoryHours;
            instance.coMapping = this.coMapping;
            instance.topics = this.topics;
            return instance;
        }
    }
}
