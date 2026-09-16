package com.shreenil.user.domain;

import com.shreenil.common.BaseEntity;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @Id
    @Column(nullable = false, length = 64)
    private String id;

    @Column(name = "tenant_id", nullable = false, length = 64)
    private String tenantId;

    @Column(name = "keycloak_id", nullable = false, unique = true, length = 128)
    private String keycloakId;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(name = "phone_number", length = 30)
    private String phoneNumber;

    @Column(name = "avatar_url", length = 512)
    private String avatarUrl;

    @Column(nullable = false, length = 30)
    private String status;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    public User() {}

    public User(String id, String tenantId, String keycloakId, String email, String firstName, String lastName, String phoneNumber, String avatarUrl, String status, Set<Role> roles) {
        this.id = id;
        this.tenantId = tenantId;
        this.keycloakId = keycloakId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.avatarUrl = avatarUrl;
        this.status = status;
        this.roles = roles;
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

    public Set<Role> getRoles() {
        return this.roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private String id;
        private String tenantId;
        private String keycloakId;
        private String email;
        private String firstName;
        private String lastName;
        private String phoneNumber;
        private String avatarUrl;
        private String status;
        private Set<Role> roles = new HashSet<>();

        public UserBuilder() {}

        public UserBuilder id(String id) {
            this.id = id;
            return this;
        }

        public UserBuilder tenantId(String tenantId) {
            this.tenantId = tenantId;
            return this;
        }

        public UserBuilder keycloakId(String keycloakId) {
            this.keycloakId = keycloakId;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public UserBuilder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public UserBuilder phoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public UserBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public UserBuilder status(String status) {
            this.status = status;
            return this;
        }

        public UserBuilder roles(Set<Role> roles) {
            this.roles = roles;
            return this;
        }

        public User build() {
            User instance = new User();
            instance.id = this.id;
            instance.tenantId = this.tenantId;
            instance.keycloakId = this.keycloakId;
            instance.email = this.email;
            instance.firstName = this.firstName;
            instance.lastName = this.lastName;
            instance.phoneNumber = this.phoneNumber;
            instance.avatarUrl = this.avatarUrl;
            instance.status = this.status;
            instance.roles = this.roles;
            return instance;
        }
    }
}
