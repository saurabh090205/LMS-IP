package com.shreenil.auth;

import java.util.Set;

public class UserPrincipal {
    private String keycloakId;
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private String tenantId;
    private Set<String> roles;

    public boolean hasRole(String role) {
        if (roles == null) return false;
        String normalized = role.startsWith("ROLE_") ? role : "ROLE_" + role;
        return roles.contains(normalized) || roles.contains(role);
    }

    public UserPrincipal() {}

    public UserPrincipal(String keycloakId, String email, String username, String firstName, String lastName, String tenantId, Set<String> roles) {
        this.keycloakId = keycloakId;
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.tenantId = tenantId;
        this.roles = roles;
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

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getTenantId() {
        return this.tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public Set<String> getRoles() {
        return this.roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public static UserPrincipalBuilder builder() {
        return new UserPrincipalBuilder();
    }

    public static class UserPrincipalBuilder {
        private String keycloakId;
        private String email;
        private String username;
        private String firstName;
        private String lastName;
        private String tenantId;
        private Set<String> roles;

        public UserPrincipalBuilder() {}

        public UserPrincipalBuilder keycloakId(String keycloakId) {
            this.keycloakId = keycloakId;
            return this;
        }

        public UserPrincipalBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserPrincipalBuilder username(String username) {
            this.username = username;
            return this;
        }

        public UserPrincipalBuilder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public UserPrincipalBuilder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public UserPrincipalBuilder tenantId(String tenantId) {
            this.tenantId = tenantId;
            return this;
        }

        public UserPrincipalBuilder roles(Set<String> roles) {
            this.roles = roles;
            return this;
        }

        public UserPrincipal build() {
            UserPrincipal instance = new UserPrincipal();
            instance.keycloakId = this.keycloakId;
            instance.email = this.email;
            instance.username = this.username;
            instance.firstName = this.firstName;
            instance.lastName = this.lastName;
            instance.tenantId = this.tenantId;
            instance.roles = this.roles;
            return instance;
        }
    }
}
