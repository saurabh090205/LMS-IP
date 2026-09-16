package com.shreenil.profile.dto;

import java.time.LocalDate;

public class SkillProgressResponse {
    private String id;
    private String skillName;
    private String category;
    private Integer proficiencyScore;
    private String verifiedByCourse;

    public SkillProgressResponse() {}

    public SkillProgressResponse(String id, String skillName, String category, Integer proficiencyScore, String verifiedByCourse) {
        this.id = id;
        this.skillName = skillName;
        this.category = category;
        this.proficiencyScore = proficiencyScore;
        this.verifiedByCourse = verifiedByCourse;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSkillName() {
        return this.skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getProficiencyScore() {
        return this.proficiencyScore;
    }

    public void setProficiencyScore(Integer proficiencyScore) {
        this.proficiencyScore = proficiencyScore;
    }

    public String getVerifiedByCourse() {
        return this.verifiedByCourse;
    }

    public void setVerifiedByCourse(String verifiedByCourse) {
        this.verifiedByCourse = verifiedByCourse;
    }

    public static SkillProgressResponseBuilder builder() {
        return new SkillProgressResponseBuilder();
    }

    public static class SkillProgressResponseBuilder {
        private String id;
        private String skillName;
        private String category;
        private Integer proficiencyScore;
        private String verifiedByCourse;

        public SkillProgressResponseBuilder() {}

        public SkillProgressResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public SkillProgressResponseBuilder skillName(String skillName) {
            this.skillName = skillName;
            return this;
        }

        public SkillProgressResponseBuilder category(String category) {
            this.category = category;
            return this;
        }

        public SkillProgressResponseBuilder proficiencyScore(Integer proficiencyScore) {
            this.proficiencyScore = proficiencyScore;
            return this;
        }

        public SkillProgressResponseBuilder verifiedByCourse(String verifiedByCourse) {
            this.verifiedByCourse = verifiedByCourse;
            return this;
        }

        public SkillProgressResponse build() {
            SkillProgressResponse instance = new SkillProgressResponse();
            instance.id = this.id;
            instance.skillName = this.skillName;
            instance.category = this.category;
            instance.proficiencyScore = this.proficiencyScore;
            instance.verifiedByCourse = this.verifiedByCourse;
            return instance;
        }
    }
}
