package com.shreenil.homework.api;

import com.shreenil.common.ApiResponse;
import com.shreenil.homework.dto.AssignmentCreateRequest;
import com.shreenil.homework.dto.FacultySubmissionResponse;
import com.shreenil.homework.dto.GradeSubmissionRequest;
import com.shreenil.homework.dto.AssignmentResponse;
import com.shreenil.homework.dto.SubmissionRequest;
import com.shreenil.homework.dto.SubmissionResponse;
import com.shreenil.homework.service.HomeworkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Homework", description = "Student homework assignments and submission endpoints")
public class HomeworkController {

    private final HomeworkService homeworkService;

    public HomeworkController(HomeworkService homeworkService) {
        this.homeworkService = homeworkService;
    }


    @GetMapping("/students/me/homework")
    @Operation(summary = "Get list of assignments for current student")
    public ResponseEntity<ApiResponse<List<AssignmentResponse>>> getStudentHomework() {
        List<AssignmentResponse> assignments = homeworkService.getStudentAssignments();
        return ResponseEntity.ok(
                ApiResponse.<List<AssignmentResponse>>builder()
                        .success(true)
                        .message("Homework assignments retrieved successfully")
                        .data(assignments)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/homework/{id}")
    @Operation(summary = "Get assignment details by ID")
    public ResponseEntity<ApiResponse<AssignmentResponse>> getAssignmentById(@PathVariable String id) {
        AssignmentResponse assignment = homeworkService.getAssignmentById(id);
        return ResponseEntity.ok(
                ApiResponse.<AssignmentResponse>builder()
                        .success(true)
                        .message("Assignment retrieved successfully")
                        .data(assignment)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @PostMapping("/homework/{id}/submission")
    @Operation(summary = "Submit or update assignment solution")
    public ResponseEntity<ApiResponse<SubmissionResponse>> submitHomework(
            @PathVariable String id,
            @Valid @RequestBody SubmissionRequest request) {
        SubmissionResponse submission = homeworkService.submitHomework(id, request);
        return ResponseEntity.ok(
                ApiResponse.<SubmissionResponse>builder()
                        .success(true)
                        .message("Assignment submitted successfully")
                        .data(submission)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/homework")
    @Operation(summary = "Get all assignments or by courseId")
    public ResponseEntity<ApiResponse<List<AssignmentResponse>>> getAllAssignments(
            @RequestParam(required = false) String courseId) {
        List<AssignmentResponse> assignments = courseId != null
                ? homeworkService.getAssignmentsByCourse(courseId)
                : homeworkService.getAllAssignments();
        return ResponseEntity.ok(
                ApiResponse.<List<AssignmentResponse>>builder()
                        .success(true)
                        .message("Assignments retrieved successfully")
                        .data(assignments)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @PostMapping("/homework")
    @Operation(summary = "Create a new assignment")
    public ResponseEntity<ApiResponse<AssignmentResponse>> createAssignment(
            @Valid @RequestBody AssignmentCreateRequest request) {
        AssignmentResponse assignment = homeworkService.createAssignment(request);
        return ResponseEntity.ok(
                ApiResponse.<AssignmentResponse>builder()
                        .success(true)
                        .message("Assignment created successfully")
                        .data(assignment)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/homework/{id}/submissions")
    @Operation(summary = "Get all submissions for an assignment")
    public ResponseEntity<ApiResponse<List<FacultySubmissionResponse>>> getAssignmentSubmissions(@PathVariable String id) {
        List<FacultySubmissionResponse> submissions = homeworkService.getAssignmentSubmissions(id);
        return ResponseEntity.ok(
                ApiResponse.<List<FacultySubmissionResponse>>builder()
                        .success(true)
                        .message("Submissions retrieved successfully")
                        .data(submissions)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/homework/submissions/pending")
    @Operation(summary = "Get all pending submissions across assignments")
    public ResponseEntity<ApiResponse<List<FacultySubmissionResponse>>> getPendingSubmissions() {
        List<FacultySubmissionResponse> submissions = homeworkService.getPendingSubmissions();
        return ResponseEntity.ok(
                ApiResponse.<List<FacultySubmissionResponse>>builder()
                        .success(true)
                        .message("Pending submissions retrieved successfully")
                        .data(submissions)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @GetMapping("/homework/submissions")
    @Operation(summary = "Get all submissions across assignments")
    public ResponseEntity<ApiResponse<List<FacultySubmissionResponse>>> getAllSubmissions() {
        List<FacultySubmissionResponse> submissions = homeworkService.getAllSubmissions();
        return ResponseEntity.ok(
                ApiResponse.<List<FacultySubmissionResponse>>builder()
                        .success(true)
                        .message("All submissions retrieved successfully")
                        .data(submissions)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }

    @PostMapping("/homework/submissions/{id}/grade")
    @Operation(summary = "Grade an assignment submission")
    public ResponseEntity<ApiResponse<FacultySubmissionResponse>> gradeSubmission(
            @PathVariable String id,
            @Valid @RequestBody GradeSubmissionRequest request) {
        FacultySubmissionResponse submission = homeworkService.gradeSubmission(id, request);
        return ResponseEntity.ok(
                ApiResponse.<FacultySubmissionResponse>builder()
                        .success(true)
                        .message("Submission graded successfully")
                        .data(submission)
                        .timestamp(OffsetDateTime.now())
                        .build()
        );
    }
}
