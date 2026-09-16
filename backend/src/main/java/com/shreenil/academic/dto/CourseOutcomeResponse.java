package com.shreenil.academic.dto;

public class CourseOutcomeResponse {
    private String id;
    private Integer coNumber;
    private String coCode;
    private String description;
    private String bloomsLevel;

    public CourseOutcomeResponse() {}

    public CourseOutcomeResponse(String id, Integer coNumber, String coCode, String description, String bloomsLevel) {
        this.id = id;
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

    public static CourseOutcomeResponseBuilder builder() {
        return new CourseOutcomeResponseBuilder();
    }

    public static class CourseOutcomeResponseBuilder {
        private String id;
        private Integer coNumber;
        private String coCode;
        private String description;
        private String bloomsLevel;

        public CourseOutcomeResponseBuilder() {}

        public CourseOutcomeResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public CourseOutcomeResponseBuilder coNumber(Integer coNumber) {
            this.coNumber = coNumber;
            return this;
        }

        public CourseOutcomeResponseBuilder coCode(String coCode) {
            this.coCode = coCode;
            return this;
        }

        public CourseOutcomeResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public CourseOutcomeResponseBuilder bloomsLevel(String bloomsLevel) {
            this.bloomsLevel = bloomsLevel;
            return this;
        }

        public CourseOutcomeResponse build() {
            CourseOutcomeResponse instance = new CourseOutcomeResponse();
            instance.id = this.id;
            instance.coNumber = this.coNumber;
            instance.coCode = this.coCode;
            instance.description = this.description;
            instance.bloomsLevel = this.bloomsLevel;
            return instance;
        }
    }
}
