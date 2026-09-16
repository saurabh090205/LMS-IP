package com.shreenil.academic.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
@Entity
@Table(name = "academic_years")
public class AcademicYear extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id", nullable = false)
    private Program program;

    @Column(nullable = false, length = 50)
    private String yearCode;

    @Column(nullable = false)
    private Integer yearNumber;

    @Column(nullable = false)
    private Boolean isCurrent;

    public AcademicYear() {}

    public AcademicYear(String id, Program program, String yearCode, Integer yearNumber, Boolean isCurrent) {
        this.id = id;
        this.program = program;
        this.yearCode = yearCode;
        this.yearNumber = yearNumber;
        this.isCurrent = isCurrent;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Program getProgram() {
        return this.program;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public String getYearCode() {
        return this.yearCode;
    }

    public void setYearCode(String yearCode) {
        this.yearCode = yearCode;
    }

    public Integer getYearNumber() {
        return this.yearNumber;
    }

    public void setYearNumber(Integer yearNumber) {
        this.yearNumber = yearNumber;
    }

    public Boolean isCurrent() {
        return this.isCurrent;
    }

    public void setIsCurrent(Boolean isCurrent) {
        this.isCurrent = isCurrent;
    }

    public static AcademicYearBuilder builder() {
        return new AcademicYearBuilder();
    }

    public static class AcademicYearBuilder {
        private String id;
        private Program program;
        private String yearCode;
        private Integer yearNumber;
        private Boolean isCurrent;

        public AcademicYearBuilder() {}

        public AcademicYearBuilder id(String id) {
            this.id = id;
            return this;
        }

        public AcademicYearBuilder program(Program program) {
            this.program = program;
            return this;
        }

        public AcademicYearBuilder yearCode(String yearCode) {
            this.yearCode = yearCode;
            return this;
        }

        public AcademicYearBuilder yearNumber(Integer yearNumber) {
            this.yearNumber = yearNumber;
            return this;
        }

        public AcademicYearBuilder isCurrent(Boolean isCurrent) {
            this.isCurrent = isCurrent;
            return this;
        }

        public AcademicYear build() {
            AcademicYear instance = new AcademicYear();
            instance.id = this.id;
            instance.program = this.program;
            instance.yearCode = this.yearCode;
            instance.yearNumber = this.yearNumber;
            instance.isCurrent = this.isCurrent;
            return instance;
        }
    }
}
