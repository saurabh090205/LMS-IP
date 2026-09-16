package com.shreenil.profile.dto;

import java.time.LocalDate;

public class AchievementResponse {
    private String id;
    private String title;
    private String category;
    private String description;
    private LocalDate dateEarned;
    private String badge;

    public AchievementResponse() {}

    public AchievementResponse(String id, String title, String category, String description, LocalDate dateEarned, String badge) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.dateEarned = dateEarned;
        this.badge = badge;
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

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateEarned() {
        return this.dateEarned;
    }

    public void setDateEarned(LocalDate dateEarned) {
        this.dateEarned = dateEarned;
    }

    public String getBadge() {
        return this.badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public static AchievementResponseBuilder builder() {
        return new AchievementResponseBuilder();
    }

    public static class AchievementResponseBuilder {
        private String id;
        private String title;
        private String category;
        private String description;
        private LocalDate dateEarned;
        private String badge;

        public AchievementResponseBuilder() {}

        public AchievementResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public AchievementResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public AchievementResponseBuilder category(String category) {
            this.category = category;
            return this;
        }

        public AchievementResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public AchievementResponseBuilder dateEarned(LocalDate dateEarned) {
            this.dateEarned = dateEarned;
            return this;
        }

        public AchievementResponseBuilder badge(String badge) {
            this.badge = badge;
            return this;
        }

        public AchievementResponse build() {
            AchievementResponse instance = new AchievementResponse();
            instance.id = this.id;
            instance.title = this.title;
            instance.category = this.category;
            instance.description = this.description;
            instance.dateEarned = this.dateEarned;
            instance.badge = this.badge;
            return instance;
        }
    }
}
