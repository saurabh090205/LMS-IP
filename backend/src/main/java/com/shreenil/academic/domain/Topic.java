package com.shreenil.academic.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "topics")
public class Topic extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @Column(name = "topic_number", nullable = false)
    private Integer topicNumber;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "estimated_minutes", nullable = false)
    private Integer estimatedMinutes;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LearningResource> resources = new ArrayList<>();

    public Topic() {}

    public Topic(String id, Unit unit, Integer topicNumber, String title, String description, Integer estimatedMinutes, List<LearningResource> resources) {
        this.id = id;
        this.unit = unit;
        this.topicNumber = topicNumber;
        this.title = title;
        this.description = description;
        this.estimatedMinutes = estimatedMinutes;
        this.resources = resources;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Unit getUnit() {
        return this.unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public Integer getTopicNumber() {
        return this.topicNumber;
    }

    public void setTopicNumber(Integer topicNumber) {
        this.topicNumber = topicNumber;
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

    public Integer getEstimatedMinutes() {
        return this.estimatedMinutes;
    }

    public void setEstimatedMinutes(Integer estimatedMinutes) {
        this.estimatedMinutes = estimatedMinutes;
    }

    public List<LearningResource> getResources() {
        return this.resources;
    }

    public void setResources(List<LearningResource> resources) {
        this.resources = resources;
    }

    public static TopicBuilder builder() {
        return new TopicBuilder();
    }

    public static class TopicBuilder {
        private String id;
        private Unit unit;
        private Integer topicNumber;
        private String title;
        private String description;
        private Integer estimatedMinutes;
        private List<LearningResource> resources = new ArrayList<>();

        public TopicBuilder() {}

        public TopicBuilder id(String id) {
            this.id = id;
            return this;
        }

        public TopicBuilder unit(Unit unit) {
            this.unit = unit;
            return this;
        }

        public TopicBuilder topicNumber(Integer topicNumber) {
            this.topicNumber = topicNumber;
            return this;
        }

        public TopicBuilder title(String title) {
            this.title = title;
            return this;
        }

        public TopicBuilder description(String description) {
            this.description = description;
            return this;
        }

        public TopicBuilder estimatedMinutes(Integer estimatedMinutes) {
            this.estimatedMinutes = estimatedMinutes;
            return this;
        }

        public TopicBuilder resources(List<LearningResource> resources) {
            this.resources = resources;
            return this;
        }

        public Topic build() {
            Topic instance = new Topic();
            instance.id = this.id;
            instance.unit = this.unit;
            instance.topicNumber = this.topicNumber;
            instance.title = this.title;
            instance.description = this.description;
            instance.estimatedMinutes = this.estimatedMinutes;
            instance.resources = this.resources;
            return instance;
        }
    }
}
