package com.shreenil.academic.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
@Entity
@Table(name = "learning_resources")
public class LearningResource extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "resource_type", nullable = false, length = 50)
    private String resourceType; // VIDEO, READING, DEMO_RESOURCE, NOTES

    @Column(name = "resource_url", length = 512)
    private String resourceUrl;

    @Column(name = "content_text", columnDefinition = "TEXT")
    private String contentText;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "is_official_syllabus", nullable = false)
    private Boolean isOfficialSyllabus;

    @Column(name = "attribution_label", length = 100)
    private String attributionLabel;

    public LearningResource() {}

    public LearningResource(String id, Topic topic, String title, String resourceType, String resourceUrl, String contentText, Integer durationMinutes, Boolean isOfficialSyllabus, String attributionLabel) {
        this.id = id;
        this.topic = topic;
        this.title = title;
        this.resourceType = resourceType;
        this.resourceUrl = resourceUrl;
        this.contentText = contentText;
        this.durationMinutes = durationMinutes;
        this.isOfficialSyllabus = isOfficialSyllabus;
        this.attributionLabel = attributionLabel;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Topic getTopic() {
        return this.topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getResourceType() {
        return this.resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public String getResourceUrl() {
        return this.resourceUrl;
    }

    public void setResourceUrl(String resourceUrl) {
        this.resourceUrl = resourceUrl;
    }

    public String getContentText() {
        return this.contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public Integer getDurationMinutes() {
        return this.durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Boolean isOfficialSyllabus() {
        return this.isOfficialSyllabus;
    }

    public Boolean getIsOfficialSyllabus() {
        return this.isOfficialSyllabus;
    }

    public void setIsOfficialSyllabus(Boolean isOfficialSyllabus) {
        this.isOfficialSyllabus = isOfficialSyllabus;
    }

    public String getAttributionLabel() {
        return this.attributionLabel;
    }

    public void setAttributionLabel(String attributionLabel) {
        this.attributionLabel = attributionLabel;
    }

    public static LearningResourceBuilder builder() {
        return new LearningResourceBuilder();
    }

    public static class LearningResourceBuilder {
        private String id;
        private Topic topic;
        private String title;
        private String resourceType;
        private String resourceUrl;
        private String contentText;
        private Integer durationMinutes;
        private Boolean isOfficialSyllabus;
        private String attributionLabel;

        public LearningResourceBuilder() {}

        public LearningResourceBuilder id(String id) {
            this.id = id;
            return this;
        }

        public LearningResourceBuilder topic(Topic topic) {
            this.topic = topic;
            return this;
        }

        public LearningResourceBuilder title(String title) {
            this.title = title;
            return this;
        }

        public LearningResourceBuilder resourceType(String resourceType) {
            this.resourceType = resourceType;
            return this;
        }

        public LearningResourceBuilder resourceUrl(String resourceUrl) {
            this.resourceUrl = resourceUrl;
            return this;
        }

        public LearningResourceBuilder contentText(String contentText) {
            this.contentText = contentText;
            return this;
        }

        public LearningResourceBuilder durationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
            return this;
        }

        public LearningResourceBuilder isOfficialSyllabus(Boolean isOfficialSyllabus) {
            this.isOfficialSyllabus = isOfficialSyllabus;
            return this;
        }

        public LearningResourceBuilder attributionLabel(String attributionLabel) {
            this.attributionLabel = attributionLabel;
            return this;
        }

        public LearningResource build() {
            LearningResource instance = new LearningResource();
            instance.id = this.id;
            instance.topic = this.topic;
            instance.title = this.title;
            instance.resourceType = this.resourceType;
            instance.resourceUrl = this.resourceUrl;
            instance.contentText = this.contentText;
            instance.durationMinutes = this.durationMinutes;
            instance.isOfficialSyllabus = this.isOfficialSyllabus;
            instance.attributionLabel = this.attributionLabel;
            return instance;
        }
    }
}
