package com.shreenil.profile.api;

import com.shreenil.common.ApiResponse;
import com.shreenil.profile.dto.DashboardResponse;
import com.shreenil.profile.dto.StudentProfileResponse;
import com.shreenil.profile.dto.StudentProgressResponse;
import com.shreenil.profile.service.StudentProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;

@RestController
@RequestMapping("/api/v1/students")
@Tag(name = "Student Portal", description = "Student profile, digital twin, progress, and aggregated dashboard endpoints")
public class StudentController {

    private final StudentProfileService studentProfileService;

    public StudentController(StudentProfileService studentProfileService) {
        this.studentProfileService = studentProfileService;
    }


    @GetMapping("/me")
    @Operation(summary = "Get current student profile and Digital Twin Lite")
    public ResponseEntity<ApiResponse<StudentProfileResponse>> getMyProfile() {
        StudentProfileResponse response = studentProfileService.getProfile();
        return ResponseEntity.ok(
                ApiResponse.<StudentProfileResponse>builder()
                        .success(true)
                        .message("Student profile retrieved successfully")
                        .data(response)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/me/progress")
    @Operation(summary = "Get current student academic progress analytics")
    public ResponseEntity<ApiResponse<StudentProgressResponse>> getMyProgress() {
        StudentProgressResponse response = studentProfileService.getProgress();
        return ResponseEntity.ok(
                ApiResponse.<StudentProgressResponse>builder()
                        .success(true)
                        .message("Student progress analytics retrieved successfully")
                        .data(response)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/me/dashboard")
    @Operation(summary = "Get aggregated student dashboard data for single-trip fast loading")
    public ResponseEntity<ApiResponse<DashboardResponse>> getMyDashboard() {
        DashboardResponse response = studentProfileService.getDashboard();
        return ResponseEntity.ok(
                ApiResponse.<DashboardResponse>builder()
                        .success(true)
                        .message("Student dashboard retrieved successfully")
                        .data(response)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
