package com.shreenil.academic.api;

import com.shreenil.academic.dto.*;
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

    @PostMapping("/courses")
    @Operation(summary = "Create a new course (Faculty)")
    public ResponseEntity<ApiResponse<CourseDetailResponse>> createCourse(
            @RequestBody CourseCreateRequest request) {
        CourseDetailResponse course = academicService.createCourse(request);
        return ResponseEntity.ok(
                ApiResponse.<CourseDetailResponse>builder()
                        .success(true)
                        .message("Course created successfully")
                        .data(course)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @PutMapping("/courses/{id}")
    @Operation(summary = "Update an existing course (Faculty)")
    public ResponseEntity<ApiResponse<CourseDetailResponse>> updateCourse(
            @PathVariable String id,
            @RequestBody CourseCreateRequest request) {
        CourseDetailResponse course = academicService.updateCourse(id, request);
        return ResponseEntity.ok(
                ApiResponse.<CourseDetailResponse>builder()
                        .success(true)
                        .message("Course updated successfully")
                        .data(course)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @PostMapping("/courses/{id}/units")
    @Operation(summary = "Add a unit to a course (Faculty)")
    public ResponseEntity<ApiResponse<UnitResponse>> createUnit(
            @PathVariable String id,
            @RequestBody UnitCreateRequest request) {
        UnitResponse unit = academicService.createUnit(id, request);
        return ResponseEntity.ok(
                ApiResponse.<UnitResponse>builder()
                        .success(true)
                        .message("Unit created successfully")
                        .data(unit)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @PostMapping("/units/{id}/topics")
    @Operation(summary = "Add a topic to a unit (Faculty)")
    public ResponseEntity<ApiResponse<TopicResponse>> createTopic(
            @PathVariable String id,
            @RequestBody TopicCreateRequest request) {
        TopicResponse topic = academicService.createTopic(id, request);
        return ResponseEntity.ok(
                ApiResponse.<TopicResponse>builder()
                        .success(true)
                        .message("Topic created successfully")
                        .data(topic)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/courses/{id}/roster")
    @Operation(summary = "Get enrolled student roster for a course (Faculty)")
    public ResponseEntity<ApiResponse<List<RosterStudentResponse>>> getCourseRoster(@PathVariable String id) {
        List<RosterStudentResponse> roster = academicService.getCourseRoster(id);
        return ResponseEntity.ok(
                ApiResponse.<List<RosterStudentResponse>>builder()
                        .success(true)
                        .message("Course roster retrieved successfully")
                        .data(roster)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
