package com.shreenil.academic.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
@Entity
@Table(name = "academic_modules")
public class AcademicModule extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String moduleCode;

    @Column(nullable = false)
    private Integer semester;

    public AcademicModule() {}

    public AcademicModule(String id, AcademicYear academicYear, String name, String moduleCode, Integer semester) {
        this.id = id;
        this.academicYear = academicYear;
        this.name = name;
        this.moduleCode = moduleCode;
        this.semester = semester;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public AcademicYear getAcademicYear() {
        return this.academicYear;
    }

    public void setAcademicYear(AcademicYear academicYear) {
        this.academicYear = academicYear;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModuleCode() {
        return this.moduleCode;
    }

    public void setModuleCode(String moduleCode) {
        this.moduleCode = moduleCode;
    }

    public Integer getSemester() {
        return this.semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public static AcademicModuleBuilder builder() {
        return new AcademicModuleBuilder();
    }

    public static class AcademicModuleBuilder {
        private String id;
        private AcademicYear academicYear;
        private String name;
        private String moduleCode;
        private Integer semester;

        public AcademicModuleBuilder() {}

        public AcademicModuleBuilder id(String id) {
            this.id = id;
            return this;
        }

        public AcademicModuleBuilder academicYear(AcademicYear academicYear) {
            this.academicYear = academicYear;
            return this;
        }

        public AcademicModuleBuilder name(String name) {
            this.name = name;
            return this;
        }

        public AcademicModuleBuilder moduleCode(String moduleCode) {
            this.moduleCode = moduleCode;
            return this;
        }

        public AcademicModuleBuilder semester(Integer semester) {
            this.semester = semester;
            return this;
        }

        public AcademicModule build() {
            AcademicModule instance = new AcademicModule();
            instance.id = this.id;
            instance.academicYear = this.academicYear;
            instance.name = this.name;
            instance.moduleCode = this.moduleCode;
            instance.semester = this.semester;
            return instance;
        }
    }
}
