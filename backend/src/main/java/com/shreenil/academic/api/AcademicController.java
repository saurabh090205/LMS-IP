package com.shreenil.academic.api;

import com.shreenil.academic.dto.CourseDetailResponse;
import com.shreenil.academic.dto.CourseSummaryResponse;
import com.shreenil.academic.dto.ProgramResponse;
import com.shreenil.academic.dto.TopicResponse;
import com.shreenil.academic.dto.UnitResponse;
import com.shreenil.academic.service.AcademicService;
import com.shreenil.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/academic")
@Tag(name = "Academic", description = "Academic curriculum, programs, courses, units, and topics endpoints")
public class AcademicController {

    private final AcademicService academicService;

    public AcademicController(AcademicService academicService) {
        this.academicService = academicService;
    }


    @GetMapping("/programs")
    @Operation(summary = "Get list of all academic programs")
    public ResponseEntity<ApiResponse<List<ProgramResponse>>> getPrograms() {
        List<ProgramResponse> programs = academicService.getPrograms();
        return ResponseEntity.ok(
                ApiResponse.<List<ProgramResponse>>builder()
                        .success(true)
                        .message("Academic programs retrieved successfully")
                        .data(programs)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/courses")
    @Operation(summary = "Get list of academic courses (optionally filtered by programId)")
    public ResponseEntity<ApiResponse<List<CourseSummaryResponse>>> getCourses(
            @RequestParam(required = false) String programId) {
        List<CourseSummaryResponse> courses = academicService.getCourses(programId);
        return ResponseEntity.ok(
                ApiResponse.<List<CourseSummaryResponse>>builder()
                        .success(true)
                        .message("Courses retrieved successfully")
                        .data(courses)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/courses/{id}")
    @Operation(summary = "Get detailed course information by ID or course code")
    public ResponseEntity<ApiResponse<CourseDetailResponse>> getCourseById(@PathVariable String id) {
        CourseDetailResponse course = academicService.getCourseById(id);
        return ResponseEntity.ok(
                ApiResponse.<CourseDetailResponse>builder()
                        .success(true)
                        .message("Course details retrieved successfully")
                        .data(course)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/courses/{id}/units")
    @Operation(summary = "Get units for a specific course")
    public ResponseEntity<ApiResponse<List<UnitResponse>>> getCourseUnits(@PathVariable String id) {
        List<UnitResponse> units = academicService.getCourseUnits(id);
        return ResponseEntity.ok(
                ApiResponse.<List<UnitResponse>>builder()
                        .success(true)
                        .message("Course units retrieved successfully")
                        .data(units)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/units/{id}/topics")
    @Operation(summary = "Get topics for a specific unit")
    public ResponseEntity<ApiResponse<List<TopicResponse>>> getUnitTopics(@PathVariable String id) {
        List<TopicResponse> topics = academicService.getUnitTopics(id);
        return ResponseEntity.ok(
                ApiResponse.<List<TopicResponse>>builder()
                        .success(true)
                        .message("Unit topics retrieved successfully")
                        .data(topics)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
