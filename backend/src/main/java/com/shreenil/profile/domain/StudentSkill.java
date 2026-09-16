package com.shreenil.profile.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
@Entity
@Table(name = "student_skills")
public class StudentSkill extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @Column(name = "skill_name", nullable = false, length = 100)
    private String skillName;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(name = "proficiency_score", nullable = false)
    private Integer proficiencyScore;

    @Column(name = "verified_by_course", length = 100)
    private String verifiedByCourse;

    public StudentSkill() {}

    public StudentSkill(String id, StudentProfile studentProfile, String skillName, String category, Integer proficiencyScore, String verifiedByCourse) {
        this.id = id;
        this.studentProfile = studentProfile;
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

    public StudentProfile getStudentProfile() {
        return this.studentProfile;
    }

    public void setStudentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
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

    public static StudentSkillBuilder builder() {
        return new StudentSkillBuilder();
    }

    public static class StudentSkillBuilder {
        private String id;
        private StudentProfile studentProfile;
        private String skillName;
        private String category;
        private Integer proficiencyScore;
        private String verifiedByCourse;

        public StudentSkillBuilder() {}

        public StudentSkillBuilder id(String id) {
            this.id = id;
            return this;
        }

        public StudentSkillBuilder studentProfile(StudentProfile studentProfile) {
            this.studentProfile = studentProfile;
            return this;
        }

        public StudentSkillBuilder skillName(String skillName) {
            this.skillName = skillName;
            return this;
        }

        public StudentSkillBuilder category(String category) {
            this.category = category;
            return this;
        }

        public StudentSkillBuilder proficiencyScore(Integer proficiencyScore) {
            this.proficiencyScore = proficiencyScore;
            return this;
        }

        public StudentSkillBuilder verifiedByCourse(String verifiedByCourse) {
            this.verifiedByCourse = verifiedByCourse;
            return this;
        }

        public StudentSkill build() {
            StudentSkill instance = new StudentSkill();
            instance.id = this.id;
            instance.studentProfile = this.studentProfile;
            instance.skillName = this.skillName;
            instance.category = this.category;
            instance.proficiencyScore = this.proficiencyScore;
            instance.verifiedByCourse = this.verifiedByCourse;
            return instance;
        }
    }
}
