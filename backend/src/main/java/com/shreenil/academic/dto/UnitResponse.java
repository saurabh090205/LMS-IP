package com.shreenil.academic.dto;

import java.util.List;

public class UnitResponse {
    private String id;
    private String courseId;
    private Integer unitNumber;
    private String title;
    private Integer theoryHours;
    private String coMapping;
    private Integer topicsCount;
    private List<TopicResponse> topics;

    public UnitResponse() {}

    public UnitResponse(String id, String courseId, Integer unitNumber, String title, Integer theoryHours, String coMapping, Integer topicsCount, List<TopicResponse> topics) {
        this.id = id;
        this.courseId = courseId;
        this.unitNumber = unitNumber;
        this.title = title;
        this.theoryHours = theoryHours;
        this.coMapping = coMapping;
        this.topicsCount = topicsCount;
        this.topics = topics;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseId() {
        return this.courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
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

    public Integer getTopicsCount() {
        return this.topicsCount;
    }

    public void setTopicsCount(Integer topicsCount) {
        this.topicsCount = topicsCount;
    }

    public List<TopicResponse> getTopics() {
        return this.topics;
    }

    public void setTopics(List<TopicResponse> topics) {
        this.topics = topics;
    }

    public static UnitResponseBuilder builder() {
        return new UnitResponseBuilder();
    }

    public static class UnitResponseBuilder {
        private String id;
        private String courseId;
        private Integer unitNumber;
        private String title;
        private Integer theoryHours;
        private String coMapping;
        private Integer topicsCount;
        private List<TopicResponse> topics;

        public UnitResponseBuilder() {}

        public UnitResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public UnitResponseBuilder courseId(String courseId) {
            this.courseId = courseId;
            return this;
        }

        public UnitResponseBuilder unitNumber(Integer unitNumber) {
            this.unitNumber = unitNumber;
            return this;
        }

        public UnitResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public UnitResponseBuilder theoryHours(Integer theoryHours) {
            this.theoryHours = theoryHours;
            return this;
        }

        public UnitResponseBuilder coMapping(String coMapping) {
            this.coMapping = coMapping;
            return this;
        }

        public UnitResponseBuilder topicsCount(Integer topicsCount) {
            this.topicsCount = topicsCount;
            return this;
        }

        public UnitResponseBuilder topics(List<TopicResponse> topics) {
            this.topics = topics;
            return this;
        }

        public UnitResponse build() {
            UnitResponse instance = new UnitResponse();
            instance.id = this.id;
            instance.courseId = this.courseId;
            instance.unitNumber = this.unitNumber;
            instance.title = this.title;
            instance.theoryHours = this.theoryHours;
            instance.coMapping = this.coMapping;
            instance.topicsCount = this.topicsCount;
            instance.topics = this.topics;
            return instance;
        }
    }
}
