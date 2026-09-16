package com.shreenil.user.api;

import com.shreenil.common.ApiResponse;
import com.shreenil.user.dto.NavigationItemResponse;
import com.shreenil.user.dto.UserResponse;
import com.shreenil.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "User", description = "Current authenticated user and navigation endpoints")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user identity and profile")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser() {
        UserResponse response = userService.getCurrentUser();
        return ResponseEntity.ok(
                ApiResponse.<UserResponse>builder()
                        .success(true)
                        .message("Current user profile retrieved successfully")
                        .data(response)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/me/navigation")
    @Operation(summary = "Get dynamic role-aware navigation configuration for current user")
    public ResponseEntity<ApiResponse<List<NavigationItemResponse>>> getNavigation() {
        List<NavigationItemResponse> navigation = userService.getStudentNavigation();
        return ResponseEntity.ok(
                ApiResponse.<List<NavigationItemResponse>>builder()
                        .success(true)
                        .message("Navigation configuration retrieved successfully")
                        .data(navigation)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
