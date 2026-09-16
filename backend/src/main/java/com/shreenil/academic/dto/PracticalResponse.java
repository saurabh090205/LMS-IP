package com.shreenil.academic.dto;

public class PracticalResponse {
    private String id;
    private Integer experimentNumber;
    private String title;
    private String description;
    private String mappedUnits;

    public PracticalResponse() {}

    public PracticalResponse(String id, Integer experimentNumber, String title, String description, String mappedUnits) {
        this.id = id;
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

    public static PracticalResponseBuilder builder() {
        return new PracticalResponseBuilder();
    }

    public static class PracticalResponseBuilder {
        private String id;
        private Integer experimentNumber;
        private String title;
        private String description;
        private String mappedUnits;

        public PracticalResponseBuilder() {}

        public PracticalResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public PracticalResponseBuilder experimentNumber(Integer experimentNumber) {
            this.experimentNumber = experimentNumber;
            return this;
        }

        public PracticalResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public PracticalResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public PracticalResponseBuilder mappedUnits(String mappedUnits) {
            this.mappedUnits = mappedUnits;
            return this;
        }

        public PracticalResponse build() {
            PracticalResponse instance = new PracticalResponse();
            instance.id = this.id;
            instance.experimentNumber = this.experimentNumber;
            instance.title = this.title;
            instance.description = this.description;
            instance.mappedUnits = this.mappedUnits;
            return instance;
        }
    }
}
