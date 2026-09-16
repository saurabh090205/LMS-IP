package com.shreenil.academic.dto;

import java.util.List;

public class TopicResponse {
    private String id;
    private String unitId;
    private Integer topicNumber;
    private String title;
    private String description;
    private Integer estimatedMinutes;
    private List<LearningResourceResponse> resources;
    private Boolean hasResources;
    private String status; // COMPLETED, IN_PROGRESS, NOT_STARTED

    public TopicResponse() {}

    public TopicResponse(String id, String unitId, Integer topicNumber, String title, String description, Integer estimatedMinutes, List<LearningResourceResponse> resources, Boolean hasResources, String status) {
        this.id = id;
        this.unitId = unitId;
        this.topicNumber = topicNumber;
        this.title = title;
        this.description = description;
        this.estimatedMinutes = estimatedMinutes;
        this.resources = resources;
        this.hasResources = hasResources;
        this.status = status;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUnitId() {
        return this.unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
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

    public List<LearningResourceResponse> getResources() {
        return this.resources;
    }

    public void setResources(List<LearningResourceResponse> resources) {
        this.resources = resources;
    }

    public Boolean isHasResources() {
        return this.hasResources;
    }

    public void setHasResources(Boolean hasResources) {
        this.hasResources = hasResources;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static TopicResponseBuilder builder() {
        return new TopicResponseBuilder();
    }

    public static class TopicResponseBuilder {
        private String id;
        private String unitId;
        private Integer topicNumber;
        private String title;
        private String description;
        private Integer estimatedMinutes;
        private List<LearningResourceResponse> resources;
        private Boolean hasResources;
        private String status;

        public TopicResponseBuilder() {}

        public TopicResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public TopicResponseBuilder unitId(String unitId) {
            this.unitId = unitId;
            return this;
        }

        public TopicResponseBuilder topicNumber(Integer topicNumber) {
            this.topicNumber = topicNumber;
            return this;
        }

        public TopicResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public TopicResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public TopicResponseBuilder estimatedMinutes(Integer estimatedMinutes) {
            this.estimatedMinutes = estimatedMinutes;
            return this;
        }

        public TopicResponseBuilder resources(List<LearningResourceResponse> resources) {
            this.resources = resources;
            return this;
        }

        public TopicResponseBuilder hasResources(Boolean hasResources) {
            this.hasResources = hasResources;
            return this;
        }

        public TopicResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public TopicResponse build() {
            TopicResponse instance = new TopicResponse();
            instance.id = this.id;
            instance.unitId = this.unitId;
            instance.topicNumber = this.topicNumber;
            instance.title = this.title;
            instance.description = this.description;
            instance.estimatedMinutes = this.estimatedMinutes;
            instance.resources = this.resources;
            instance.hasResources = this.hasResources;
            instance.status = this.status;
            return instance;
        }
    }
}
