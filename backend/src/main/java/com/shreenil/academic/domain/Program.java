package com.shreenil.academic.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
@Entity
@Table(name = "programs")
public class Program extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", nullable = false)
    private Institution institution;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 50)
    private String code;

    @Column(nullable = false, length = 50)
    private String degree;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(nullable = false)
    private Integer durationYears;

    public Program() {}

    public Program(String id, Institution institution, String name, String code, String degree, String department, Integer durationYears) {
        this.id = id;
        this.institution = institution;
        this.name = name;
        this.code = code;
        this.degree = degree;
        this.department = department;
        this.durationYears = durationYears;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Institution getInstitution() {
        return this.institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDegree() {
        return this.degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getDurationYears() {
        return this.durationYears;
    }

    public void setDurationYears(Integer durationYears) {
        this.durationYears = durationYears;
    }

    public static ProgramBuilder builder() {
        return new ProgramBuilder();
    }

    public static class ProgramBuilder {
        private String id;
        private Institution institution;
        private String name;
        private String code;
        private String degree;
        private String department;
        private Integer durationYears;

        public ProgramBuilder() {}

        public ProgramBuilder id(String id) {
            this.id = id;
            return this;
        }

        public ProgramBuilder institution(Institution institution) {
            this.institution = institution;
            return this;
        }

        public ProgramBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProgramBuilder code(String code) {
            this.code = code;
            return this;
        }

        public ProgramBuilder degree(String degree) {
            this.degree = degree;
            return this;
        }

        public ProgramBuilder department(String department) {
            this.department = department;
            return this;
        }

        public ProgramBuilder durationYears(Integer durationYears) {
            this.durationYears = durationYears;
            return this;
        }

        public Program build() {
            Program instance = new Program();
            instance.id = this.id;
            instance.institution = this.institution;
            instance.name = this.name;
            instance.code = this.code;
            instance.degree = this.degree;
            instance.department = this.department;
            instance.durationYears = this.durationYears;
            return instance;
        }
    }
}
