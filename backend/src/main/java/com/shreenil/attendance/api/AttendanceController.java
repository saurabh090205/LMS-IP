package com.shreenil.attendance.api;

import com.shreenil.attendance.dto.AttendanceSummaryResponse;
import com.shreenil.attendance.service.AttendanceService;
import com.shreenil.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;

@RestController
@RequestMapping("/api/v1/students")
@Tag(name = "Attendance", description = "Student attendance summary and records endpoints")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }


    @GetMapping("/me/attendance")
    @Operation(summary = "Get current student attendance summary and log")
    public ResponseEntity<ApiResponse<AttendanceSummaryResponse>> getMyAttendance() {
        AttendanceSummaryResponse response = attendanceService.getStudentAttendance();
        return ResponseEntity.ok(
                ApiResponse.<AttendanceSummaryResponse>builder()
                        .success(true)
                        .message("Student attendance retrieved successfully")
                        .data(response)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
