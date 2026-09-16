package com.shreenil.user.dto;

import java.util.Set;

public class UserResponse {
    private String id;
    private String tenantId;
    private String keycloakId;
    private String email;
    private String firstName;
    private String lastName;
    private String fullName;
    private String phoneNumber;
    private String avatarUrl;
    private String status;
    private Set<String> roles;
    private String currentRole;

    public UserResponse() {}

    public UserResponse(String id, String tenantId, String keycloakId, String email, String firstName, String lastName, String fullName, String phoneNumber, String avatarUrl, String status, Set<String> roles, String currentRole) {
        this.id = id;
        this.tenantId = tenantId;
        this.keycloakId = keycloakId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.avatarUrl = avatarUrl;
        this.status = status;
        this.roles = roles;
        this.currentRole = currentRole;
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

    public String getKeycloakId() {
        return this.keycloakId;
    }

    public void setKeycloakId(String keycloakId) {
        this.keycloakId = keycloakId;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAvatarUrl() {
        return this.avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<String> getRoles() {
        return this.roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public String getCurrentRole() {
        return this.currentRole;
    }

    public void setCurrentRole(String currentRole) {
        this.currentRole = currentRole;
    }

    public static UserResponseBuilder builder() {
        return new UserResponseBuilder();
    }

    public static class UserResponseBuilder {
        private String id;
        private String tenantId;
        private String keycloakId;
        private String email;
        private String firstName;
        private String lastName;
        private String fullName;
        private String phoneNumber;
        private String avatarUrl;
        private String status;
        private Set<String> roles;
        private String currentRole;

        public UserResponseBuilder() {}

        public UserResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public UserResponseBuilder tenantId(String tenantId) {
            this.tenantId = tenantId;
            return this;
        }

        public UserResponseBuilder keycloakId(String keycloakId) {
            this.keycloakId = keycloakId;
            return this;
        }

        public UserResponseBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserResponseBuilder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public UserResponseBuilder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public UserResponseBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public UserResponseBuilder phoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public UserResponseBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public UserResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public UserResponseBuilder roles(Set<String> roles) {
            this.roles = roles;
            return this;
        }

        public UserResponseBuilder currentRole(String currentRole) {
            this.currentRole = currentRole;
            return this;
        }

        public UserResponse build() {
            UserResponse instance = new UserResponse();
            instance.id = this.id;
            instance.tenantId = this.tenantId;
            instance.keycloakId = this.keycloakId;
            instance.email = this.email;
            instance.firstName = this.firstName;
            instance.lastName = this.lastName;
            instance.fullName = this.fullName;
            instance.phoneNumber = this.phoneNumber;
            instance.avatarUrl = this.avatarUrl;
            instance.status = this.status;
            instance.roles = this.roles;
            instance.currentRole = this.currentRole;
            return instance;
        }
    }
}
