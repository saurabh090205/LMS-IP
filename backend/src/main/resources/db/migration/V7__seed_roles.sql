-- V7__seed_roles.sql: Seed Base Roles and Default Tenant
INSERT INTO tenants (id, name, subdomain, status)
VALUES ('tenant-default', 'Vishwakarma Institute of Technology', 'vit', 'ACTIVE');

INSERT INTO roles (id, role_name, description) VALUES
('role-student', 'ROLE_STUDENT', 'Enrolled student/scholar learner'),
('role-teacher', 'ROLE_TEACHER', 'Faculty instructor and mentor'),
('role-parent', 'ROLE_PARENT', 'Guardian and parent observer'),
('role-admin', 'ROLE_ADMIN', 'Institutional administrator'),
('role-super-admin', 'ROLE_SUPER_ADMIN', 'Platform ecosystem administrator');
