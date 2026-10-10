package com.shreenil.profile.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "achievements")
public class Achievement extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "badge_type", nullable = false, length = 64)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "awarded_date", nullable = false)
    private LocalDate dateEarned;

    @Transient
    private String badge;

    public Achievement() {}

    public Achievement(String id, StudentProfile studentProfile, String title, String category, String description, LocalDate dateEarned, String badge) {
        this.id = id;
        this.studentProfile = studentProfile;
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

    public StudentProfile getStudentProfile() {
        return this.studentProfile;
    }

    public void setStudentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
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
        return this.badge != null ? this.badge : this.category;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public static AchievementBuilder builder() {
        return new AchievementBuilder();
    }

    public static class AchievementBuilder {
        private String id;
        private StudentProfile studentProfile;
        private String title;
        private String category;
        private String description;
        private LocalDate dateEarned;
        private String badge;

        public AchievementBuilder() {}

        public AchievementBuilder id(String id) {
            this.id = id;
            return this;
        }

        public AchievementBuilder studentProfile(StudentProfile studentProfile) {
            this.studentProfile = studentProfile;
            return this;
        }

        public AchievementBuilder title(String title) {
            this.title = title;
            return this;
        }

        public AchievementBuilder category(String category) {
            this.category = category;
            return this;
        }

        public AchievementBuilder description(String description) {
            this.description = description;
            return this;
        }

        public AchievementBuilder dateEarned(LocalDate dateEarned) {
            this.dateEarned = dateEarned;
            return this;
        }

        public AchievementBuilder badge(String badge) {
            this.badge = badge;
            return this;
        }

        public Achievement build() {
            Achievement instance = new Achievement();
            instance.id = this.id;
            instance.studentProfile = this.studentProfile;
            instance.title = this.title;
            instance.category = this.category;
            instance.description = this.description;
            instance.dateEarned = this.dateEarned;
            instance.badge = this.badge;
            return instance;
        }
    }
}
