package com.shreenil.user.domain;

import jakarta.persistence.*;
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @Column(name = "role_name", nullable = false, unique = true, length = 64)
    private String roleName;

    @Column(length = 255)
    private String description;

    public Role() {}

    public Role(String id, String roleName, String description) {
        this.id = id;
        this.roleName = roleName;
        this.description = description;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoleName() {
        return this.roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public static RoleBuilder builder() {
        return new RoleBuilder();
    }

    public static class RoleBuilder {
        private String id;
        private String roleName;
        private String description;

        public RoleBuilder() {}

        public RoleBuilder id(String id) {
            this.id = id;
            return this;
        }

        public RoleBuilder roleName(String roleName) {
            this.roleName = roleName;
            return this;
        }

        public RoleBuilder description(String description) {
            this.description = description;
            return this;
        }

        public Role build() {
            Role instance = new Role();
            instance.id = this.id;
            instance.roleName = this.roleName;
            instance.description = this.description;
            return instance;
        }
    }
}
