package com.shreenil.academic.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
@Entity
@Table(name = "institutions")
public class Institution extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @Column(name = "tenant_id", nullable = false, length = 64)
    private String tenantId;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 50)
    private String code;

    @Column(length = 100)
    private String location;

    public Institution() {}

    public Institution(String id, String tenantId, String name, String code, String location) {
        this.id = id;
        this.tenantId = tenantId;
        this.name = name;
        this.code = code;
        this.location = location;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTenantId() {
        return this.tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
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

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public static InstitutionBuilder builder() {
        return new InstitutionBuilder();
    }

    public static class InstitutionBuilder {
        private String id;
        private String tenantId;
        private String name;
        private String code;
        private String location;

        public InstitutionBuilder() {}

        public InstitutionBuilder id(String id) {
            this.id = id;
            return this;
        }

        public InstitutionBuilder tenantId(String tenantId) {
            this.tenantId = tenantId;
            return this;
        }

        public InstitutionBuilder name(String name) {
            this.name = name;
            return this;
        }

        public InstitutionBuilder code(String code) {
            this.code = code;
            return this;
        }

        public InstitutionBuilder location(String location) {
            this.location = location;
            return this;
        }

        public Institution build() {
            Institution instance = new Institution();
            instance.id = this.id;
            instance.tenantId = this.tenantId;
            instance.name = this.name;
            instance.code = this.code;
            instance.location = this.location;
            return instance;
        }
    }
}
