package com.shreenil.attendance.api;

import com.shreenil.attendance.dto.AttendanceRecordResponse;
import com.shreenil.attendance.dto.AttendanceSummaryResponse;
import com.shreenil.attendance.dto.BatchAttendanceRequest;
import com.shreenil.attendance.service.AttendanceService;
import com.shreenil.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Attendance", description = "Attendance management and records endpoints")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping("/students/me/attendance")
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

    @PostMapping("/attendance/batch")
    @Operation(summary = "Mark or update attendance for students in batch")
    public ResponseEntity<ApiResponse<List<AttendanceRecordResponse>>> markAttendanceBatch(
            @Valid @RequestBody BatchAttendanceRequest request) {
        List<AttendanceRecordResponse> records = attendanceService.markAttendanceBatch(request);
        return ResponseEntity.ok(
                ApiResponse.<List<AttendanceRecordResponse>>builder()
                        .success(true)
                        .message("Batch attendance saved successfully")
                        .data(records)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/attendance/courses/{courseId}")
    @Operation(summary = "Get attendance records for a specific course")
    public ResponseEntity<ApiResponse<List<AttendanceRecordResponse>>> getCourseAttendance(
            @PathVariable String courseId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<AttendanceRecordResponse> records = attendanceService.getCourseAttendance(courseId, date);
        return ResponseEntity.ok(
                ApiResponse.<List<AttendanceRecordResponse>>builder()
                        .success(true)
                        .message("Course attendance retrieved successfully")
                        .data(records)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
