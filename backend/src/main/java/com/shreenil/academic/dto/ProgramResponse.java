package com.shreenil.academic.dto;

import java.math.BigDecimal;
import java.util.List;

public class ProgramResponse {
    private String id;
    private String institutionName;
    private String institutionCode;
    private String name;
    private String code;
    private String degree;
    private String department;
    private Integer durationYears;

    public ProgramResponse() {}

    public ProgramResponse(String id, String institutionName, String institutionCode, String name, String code, String degree, String department, Integer durationYears) {
        this.id = id;
        this.institutionName = institutionName;
        this.institutionCode = institutionCode;
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

    public String getInstitutionName() {
        return this.institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public String getInstitutionCode() {
        return this.institutionCode;
    }

    public void setInstitutionCode(String institutionCode) {
        this.institutionCode = institutionCode;
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

    public static ProgramResponseBuilder builder() {
        return new ProgramResponseBuilder();
    }

    public static class ProgramResponseBuilder {
        private String id;
        private String institutionName;
        private String institutionCode;
        private String name;
        private String code;
        private String degree;
        private String department;
        private Integer durationYears;

        public ProgramResponseBuilder() {}

        public ProgramResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public ProgramResponseBuilder institutionName(String institutionName) {
            this.institutionName = institutionName;
            return this;
        }

        public ProgramResponseBuilder institutionCode(String institutionCode) {
            this.institutionCode = institutionCode;
            return this;
        }

        public ProgramResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProgramResponseBuilder code(String code) {
            this.code = code;
            return this;
        }

        public ProgramResponseBuilder degree(String degree) {
            this.degree = degree;
            return this;
        }

        public ProgramResponseBuilder department(String department) {
            this.department = department;
            return this;
        }

        public ProgramResponseBuilder durationYears(Integer durationYears) {
            this.durationYears = durationYears;
            return this;
        }

        public ProgramResponse build() {
            ProgramResponse instance = new ProgramResponse();
            instance.id = this.id;
            instance.institutionName = this.institutionName;
            instance.institutionCode = this.institutionCode;
            instance.name = this.name;
            instance.code = this.code;
            instance.degree = this.degree;
            instance.department = this.department;
            instance.durationYears = this.durationYears;
            return instance;
        }
    }
}
