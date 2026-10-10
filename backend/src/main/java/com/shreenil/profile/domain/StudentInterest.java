package com.shreenil.profile.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "student_interests")
public class StudentInterest extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @Column(name = "interest_name", nullable = false, length = 128)
    private String name;

    @Column(name = "domain", nullable = false, length = 64)
    private String category;

    public StudentInterest() {}

    public StudentInterest(String id, StudentProfile studentProfile, String name, String category) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.name = name;
        this.category = category;
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

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public static StudentInterestBuilder builder() {
        return new StudentInterestBuilder();
    }

    public static class StudentInterestBuilder {
        private String id;
        private StudentProfile studentProfile;
        private String name;
        private String category;

        public StudentInterestBuilder() {}

        public StudentInterestBuilder id(String id) {
            this.id = id;
            return this;
        }

        public StudentInterestBuilder studentProfile(StudentProfile studentProfile) {
            this.studentProfile = studentProfile;
            return this;
        }

        public StudentInterestBuilder name(String name) {
            this.name = name;
            return this;
        }

        public StudentInterestBuilder category(String category) {
            this.category = category;
            return this;
        }

        public StudentInterest build() {
            StudentInterest instance = new StudentInterest();
            instance.id = this.id;
            instance.studentProfile = this.studentProfile;
            instance.name = this.name;
            instance.category = this.category;
            return instance;
        }
    }
}
