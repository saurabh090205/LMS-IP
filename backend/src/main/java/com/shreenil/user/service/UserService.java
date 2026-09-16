package com.shreenil.user.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.shreenil.auth.SecurityUtils;
import com.shreenil.common.ResourceNotFoundException;
import com.shreenil.user.domain.Role;
import com.shreenil.user.domain.User;
import com.shreenil.user.dto.NavigationItemResponse;
import com.shreenil.user.dto.UserResponse;
import com.shreenil.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);


    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Transactional(readOnly = true)
    public User getCurrentUserEntity() {
        String keycloakOrUserId = SecurityUtils.getCurrentUserId();
        return userRepository.findByKeycloakId(keycloakOrUserId)
                .or(() -> userRepository.findById(keycloakOrUserId))
                .or(() -> userRepository.findByEmail(SecurityUtils.getCurrentUsername()))
                .or(() -> userRepository.findById("usr-student-aarav")) // Dev fallback
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", keycloakOrUserId));
    }

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser() {
        User user = getCurrentUserEntity();
        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());

        String primaryRole = roleNames.contains("ROLE_STUDENT") ? "STUDENT" :
                (roleNames.isEmpty() ? "STUDENT" : roleNames.iterator().next().replace("ROLE_", ""));

        return UserResponse.builder()
                .id(user.getId())
                .tenantId(user.getTenantId())
                .keycloakId(user.getKeycloakId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .fullName(user.getFirstName() + " " + user.getLastName())
                .phoneNumber(user.getPhoneNumber())
                .avatarUrl(user.getAvatarUrl())
                .status(user.getStatus())
                .roles(roleNames)
                .currentRole(primaryRole)
                .build();
    }

    public List<NavigationItemResponse> getStudentNavigation() {
        return List.of(
                NavigationItemResponse.builder()
                        .id("dashboard")
                        .label("Dashboard")
                        .path("/student/dashboard")
                        .icon("LayoutDashboard")
                        .section("main")
                        .isComingSoon(false)
                        .build(),
                NavigationItemResponse.builder()
                        .id("academics")
                        .label("Academics")
                        .path("/academics")
                        .icon("BookOpen")
                        .section("academic")
                        .isComingSoon(false)
                        .children(List.of(
                                NavigationItemResponse.builder().id("subjects").label("Subjects").path("/academics").icon("Book").build(),
                                NavigationItemResponse.builder().id("timetable").label("Timetable").path("/timetable").icon("Calendar").build(),
                                NavigationItemResponse.builder().id("homework").label("Homework").path("/homework").icon("FileCheck").build(),
                                NavigationItemResponse.builder().id("attendance").label("Attendance").path("/attendance").icon("Clock").build(),
                                NavigationItemResponse.builder().id("report-card").label("Report Card").path("/report-card").icon("Award").build()
                        ))
                        .build(),
                NavigationItemResponse.builder()
                        .id("classroom")
                        .label("Virtual Classroom")
                        .path("/classroom")
                        .icon("Video")
                        .section("academic")
                        .isComingSoon(false)
                        .build(),
                NavigationItemResponse.builder()
                        .id("library")
                        .label("Library")
                        .path("/library")
                        .icon("Library")
                        .section("academic")
                        .isComingSoon(false)
                        .build(),
                NavigationItemResponse.builder()
                        .id("ai-mentor")
                        .label("AI Mentor")
                        .path("/ai-mentor")
                        .icon("Sparkles")
                        .section("academic")
                        .isComingSoon(false)
                        .build(),
                NavigationItemResponse.builder()
                        .id("sports")
                        .label("Sports & Fitness")
                        .path("/sports")
                        .icon("Trophy")
                        .section("university-life")
                        .isComingSoon(true)
                        .build(),
                NavigationItemResponse.builder()
                        .id("spiritual")
                        .label("Spiritual Growth")
                        .path("/spiritual")
                        .icon("Heart")
                        .section("university-life")
                        .isComingSoon(true)
                        .build(),
                NavigationItemResponse.builder()
                        .id("innovation")
                        .label("Innovation & Patents")
                        .path("/innovation")
                        .icon("Lightbulb")
                        .section("university-life")
                        .isComingSoon(true)
                        .build(),
                NavigationItemResponse.builder()
                        .id("career")
                        .label("Career & Placement")
                        .path("/career")
                        .icon("Briefcase")
                        .section("university-life")
                        .isComingSoon(true)
                        .build(),
                NavigationItemResponse.builder()
                        .id("xr-labs")
                        .label("XR Labs")
                        .path("/xr-labs")
                        .icon("Boxes")
                        .section("university-life")
                        .isComingSoon(true)
                        .build(),
                NavigationItemResponse.builder()
                        .id("profile")
                        .label("Digital Twin / Profile")
                        .path("/profile")
                        .icon("User")
                        .section("bottom")
                        .isComingSoon(false)
                        .build(),
                NavigationItemResponse.builder()
                        .id("settings")
                        .label("Settings")
                        .path("/settings")
                        .icon("Settings")
                        .section("bottom")
                        .isComingSoon(false)
                        .build()
        );
    }
}
