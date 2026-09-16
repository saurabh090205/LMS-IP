package com.shreenil.profile.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class StudentProfileResponse {
    private String id;
    private String userId;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String enrollmentNumber;
    private String programName;
    private String programCode;
    private String institutionName;
    private Integer currentSemester;
    private String currentAcademicYear;
    private String section;
    private BigDecimal cumulativeGpa;
    private BigDecimal attendancePercentage;
    private Integer learningStreakDays;
    private String avatarUrl;
    private String bioSummary;
    private List<SkillProgressResponse> skills;
    private List<String> interests;
    private List<AchievementResponse> achievements;

    public StudentProfileResponse() {}

    public StudentProfileResponse(String id, String userId, String firstName, String lastName, String fullName, String email, String phoneNumber, String enrollmentNumber, String programName, String programCode, String institutionName, Integer currentSemester, String currentAcademicYear, String section, BigDecimal cumulativeGpa, BigDecimal attendancePercentage, Integer learningStreakDays, String avatarUrl, String bioSummary, List<SkillProgressResponse> skills, List<String> interests, List<AchievementResponse> achievements) {
        this.id = id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.enrollmentNumber = enrollmentNumber;
        this.programName = programName;
        this.programCode = programCode;
        this.institutionName = institutionName;
        this.currentSemester = currentSemester;
        this.currentAcademicYear = currentAcademicYear;
        this.section = section;
        this.cumulativeGpa = cumulativeGpa;
        this.attendancePercentage = attendancePercentage;
        this.learningStreakDays = learningStreakDays;
        this.avatarUrl = avatarUrl;
        this.bioSummary = bioSummary;
        this.skills = skills;
        this.interests = interests;
        this.achievements = achievements;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEnrollmentNumber() {
        return this.enrollmentNumber;
    }

    public void setEnrollmentNumber(String enrollmentNumber) {
        this.enrollmentNumber = enrollmentNumber;
    }

    public String getProgramName() {
        return this.programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public String getProgramCode() {
        return this.programCode;
    }

    public void setProgramCode(String programCode) {
        this.programCode = programCode;
    }

    public String getInstitutionName() {
        return this.institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public Integer getCurrentSemester() {
        return this.currentSemester;
    }

    public void setCurrentSemester(Integer currentSemester) {
        this.currentSemester = currentSemester;
    }

    public String getCurrentAcademicYear() {
        return this.currentAcademicYear;
    }

    public void setCurrentAcademicYear(String currentAcademicYear) {
        this.currentAcademicYear = currentAcademicYear;
    }

    public String getSection() {
        return this.section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public BigDecimal getCumulativeGpa() {
        return this.cumulativeGpa;
    }

    public void setCumulativeGpa(BigDecimal cumulativeGpa) {
        this.cumulativeGpa = cumulativeGpa;
    }

    public BigDecimal getAttendancePercentage() {
        return this.attendancePercentage;
    }

    public void setAttendancePercentage(BigDecimal attendancePercentage) {
        this.attendancePercentage = attendancePercentage;
    }

    public Integer getLearningStreakDays() {
        return this.learningStreakDays;
    }

    public void setLearningStreakDays(Integer learningStreakDays) {
        this.learningStreakDays = learningStreakDays;
    }

    public String getAvatarUrl() {
        return this.avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getBioSummary() {
        return this.bioSummary;
    }

    public void setBioSummary(String bioSummary) {
        this.bioSummary = bioSummary;
    }

    public List<SkillProgressResponse> getSkills() {
        return this.skills;
    }

    public void setSkills(List<SkillProgressResponse> skills) {
        this.skills = skills;
    }

    public List<String> getInterests() {
        return this.interests;
    }

    public void setInterests(List<String> interests) {
        this.interests = interests;
    }

    public List<AchievementResponse> getAchievements() {
        return this.achievements;
    }

    public void setAchievements(List<AchievementResponse> achievements) {
        this.achievements = achievements;
    }

    public static StudentProfileResponseBuilder builder() {
        return new StudentProfileResponseBuilder();
    }

    public static class StudentProfileResponseBuilder {
        private String id;
        private String userId;
        private String firstName;
        private String lastName;
        private String fullName;
        private String email;
        private String phoneNumber;
        private String enrollmentNumber;
        private String programName;
        private String programCode;
        private String institutionName;
        private Integer currentSemester;
        private String currentAcademicYear;
        private String section;
        private BigDecimal cumulativeGpa;
        private BigDecimal attendancePercentage;
        private Integer learningStreakDays;
        private String avatarUrl;
        private String bioSummary;
        private List<SkillProgressResponse> skills;
        private List<String> interests;
        private List<AchievementResponse> achievements;

        public StudentProfileResponseBuilder() {}

        public StudentProfileResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public StudentProfileResponseBuilder userId(String userId) {
            this.userId = userId;
            return this;
        }

        public StudentProfileResponseBuilder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public StudentProfileResponseBuilder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public StudentProfileResponseBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public StudentProfileResponseBuilder email(String email) {
            this.email = email;
            return this;
        }

        public StudentProfileResponseBuilder phoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public StudentProfileResponseBuilder enrollmentNumber(String enrollmentNumber) {
            this.enrollmentNumber = enrollmentNumber;
            return this;
        }

        public StudentProfileResponseBuilder programName(String programName) {
            this.programName = programName;
            return this;
        }

        public StudentProfileResponseBuilder programCode(String programCode) {
            this.programCode = programCode;
            return this;
        }

        public StudentProfileResponseBuilder institutionName(String institutionName) {
            this.institutionName = institutionName;
            return this;
        }

        public StudentProfileResponseBuilder currentSemester(Integer currentSemester) {
            this.currentSemester = currentSemester;
            return this;
        }

        public StudentProfileResponseBuilder currentAcademicYear(String currentAcademicYear) {
            this.currentAcademicYear = currentAcademicYear;
            return this;
        }

        public StudentProfileResponseBuilder section(String section) {
            this.section = section;
            return this;
        }

        public StudentProfileResponseBuilder cumulativeGpa(BigDecimal cumulativeGpa) {
            this.cumulativeGpa = cumulativeGpa;
            return this;
        }

        public StudentProfileResponseBuilder attendancePercentage(BigDecimal attendancePercentage) {
            this.attendancePercentage = attendancePercentage;
            return this;
        }

        public StudentProfileResponseBuilder learningStreakDays(Integer learningStreakDays) {
            this.learningStreakDays = learningStreakDays;
            return this;
        }

        public StudentProfileResponseBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public StudentProfileResponseBuilder bioSummary(String bioSummary) {
            this.bioSummary = bioSummary;
            return this;
        }

        public StudentProfileResponseBuilder skills(List<SkillProgressResponse> skills) {
            this.skills = skills;
            return this;
        }

        public StudentProfileResponseBuilder interests(List<String> interests) {
            this.interests = interests;
            return this;
        }

        public StudentProfileResponseBuilder achievements(List<AchievementResponse> achievements) {
            this.achievements = achievements;
            return this;
        }

        public StudentProfileResponse build() {
            StudentProfileResponse instance = new StudentProfileResponse();
            instance.id = this.id;
            instance.userId = this.userId;
            instance.firstName = this.firstName;
            instance.lastName = this.lastName;
            instance.fullName = this.fullName;
            instance.email = this.email;
            instance.phoneNumber = this.phoneNumber;
            instance.enrollmentNumber = this.enrollmentNumber;
            instance.programName = this.programName;
            instance.programCode = this.programCode;
            instance.institutionName = this.institutionName;
            instance.currentSemester = this.currentSemester;
            instance.currentAcademicYear = this.currentAcademicYear;
            instance.section = this.section;
            instance.cumulativeGpa = this.cumulativeGpa;
            instance.attendancePercentage = this.attendancePercentage;
            instance.learningStreakDays = this.learningStreakDays;
            instance.avatarUrl = this.avatarUrl;
            instance.bioSummary = this.bioSummary;
            instance.skills = this.skills;
            instance.interests = this.interests;
            instance.achievements = this.achievements;
            return instance;
        }
    }
}
