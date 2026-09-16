package com.shreenil.profile.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class WeeklyActivityResponse {
    private String day;
    private Double hoursSpent;
    private Integer lessonsCompleted;

    public WeeklyActivityResponse() {}

    public WeeklyActivityResponse(String day, Double hoursSpent, Integer lessonsCompleted) {
        this.day = day;
        this.hoursSpent = hoursSpent;
        this.lessonsCompleted = lessonsCompleted;
    }

    public String getDay() {
        return this.day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public Double getHoursSpent() {
        return this.hoursSpent;
    }

    public void setHoursSpent(Double hoursSpent) {
        this.hoursSpent = hoursSpent;
    }

    public Integer getLessonsCompleted() {
        return this.lessonsCompleted;
    }

    public void setLessonsCompleted(Integer lessonsCompleted) {
        this.lessonsCompleted = lessonsCompleted;
    }

    public static WeeklyActivityResponseBuilder builder() {
        return new WeeklyActivityResponseBuilder();
    }

    public static class WeeklyActivityResponseBuilder {
        private String day;
        private Double hoursSpent;
        private Integer lessonsCompleted;

        public WeeklyActivityResponseBuilder() {}

        public WeeklyActivityResponseBuilder day(String day) {
            this.day = day;
            return this;
        }

        public WeeklyActivityResponseBuilder hoursSpent(Double hoursSpent) {
            this.hoursSpent = hoursSpent;
            return this;
        }

        public WeeklyActivityResponseBuilder lessonsCompleted(Integer lessonsCompleted) {
            this.lessonsCompleted = lessonsCompleted;
            return this;
        }

        public WeeklyActivityResponse build() {
            WeeklyActivityResponse instance = new WeeklyActivityResponse();
            instance.day = this.day;
            instance.hoursSpent = this.hoursSpent;
            instance.lessonsCompleted = this.lessonsCompleted;
            return instance;
        }
    }
}
