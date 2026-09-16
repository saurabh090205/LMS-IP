package com.shreenil.academic.dto;

import java.util.List;

public class LearningResourceResponse {
    private String id;
    private String title;
    private String resourceType;
    private String resourceUrl;
    private String contentText;
    private Integer durationMinutes;
    private Boolean isOfficialSyllabus;
    private String attributionLabel;

    public LearningResourceResponse() {}

    public LearningResourceResponse(String id, String title, String resourceType, String resourceUrl, String contentText, Integer durationMinutes, Boolean isOfficialSyllabus, String attributionLabel) {
        this.id = id;
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

    public void setIsOfficialSyllabus(Boolean isOfficialSyllabus) {
        this.isOfficialSyllabus = isOfficialSyllabus;
    }

    public String getAttributionLabel() {
        return this.attributionLabel;
    }

    public void setAttributionLabel(String attributionLabel) {
        this.attributionLabel = attributionLabel;
    }

    public static LearningResourceResponseBuilder builder() {
        return new LearningResourceResponseBuilder();
    }

    public static class LearningResourceResponseBuilder {
        private String id;
        private String title;
        private String resourceType;
        private String resourceUrl;
        private String contentText;
        private Integer durationMinutes;
        private Boolean isOfficialSyllabus;
        private String attributionLabel;

        public LearningResourceResponseBuilder() {}

        public LearningResourceResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public LearningResourceResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public LearningResourceResponseBuilder resourceType(String resourceType) {
            this.resourceType = resourceType;
            return this;
        }

        public LearningResourceResponseBuilder resourceUrl(String resourceUrl) {
            this.resourceUrl = resourceUrl;
            return this;
        }

        public LearningResourceResponseBuilder contentText(String contentText) {
            this.contentText = contentText;
            return this;
        }

        public LearningResourceResponseBuilder durationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
            return this;
        }

        public LearningResourceResponseBuilder isOfficialSyllabus(Boolean isOfficialSyllabus) {
            this.isOfficialSyllabus = isOfficialSyllabus;
            return this;
        }

        public LearningResourceResponseBuilder attributionLabel(String attributionLabel) {
            this.attributionLabel = attributionLabel;
            return this;
        }

        public LearningResourceResponse build() {
            LearningResourceResponse instance = new LearningResourceResponse();
            instance.id = this.id;
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
